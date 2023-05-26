import Head from 'next/head'
import {createRef, useEffect} from 'react';

type MessageType = {
  event: string,
  data?: RTCSessionDescription | RTCIceCandidate,
}

const OFFER: string = 'OFFER';
const ANSWER: string = 'ANSWER';
const CANDIDATE: string = 'CANDIDATE';
const JOINT: string = 'JOIN';

const conn: WebSocket = new WebSocket('ws://localhost:7181/socket');
// const conn: WebSocket = new WebSocket('wss://virtualica-signaling-server.onrender.com/socket');

export default function Tmp() {
  conn.onopen = () => console.log('Connected to the signaling server');

  conn.onmessage = (ev) => {
    const message: MessageType = JSON.parse(ev.data);

    switch (message.event) {
      case JOINT:
        console.log('Start joining');
        handlePeerConnection();
        break;
      case OFFER:
        console.log('Receiving an offer');
        handleOffer(message.data as RTCSessionDescription);
        break;
      case ANSWER:
        console.log('Receiving an answer');
        handleAnswer(message.data as RTCSessionDescription);
        break;
      case CANDIDATE:
        console.log('Receiving an ICE candidate');
        handleIceCandidate(message.data as RTCIceCandidate);
        break;
      default:
        break;
    }
  }

  let peerConnection: RTCPeerConnection;
  let localStream: MediaStream;

  const localVideoContainer = createRef<HTMLDivElement>();
  const remoteVideoContainer = createRef<HTMLDivElement>();
  let localVideo: HTMLVideoElement;
  let remoteVideo: HTMLVideoElement;

  useEffect(() => {
    localVideo = document.createElement('video');
    remoteVideo = document.createElement('video');
  }, []);

  const sendToSignalingServer = (message: MessageType) => {
    conn.send(JSON.stringify(message));
  }

  const startVideoCall = () => {
    console.log('Start video call');
    peerConnection = new RTCPeerConnection({
      iceServers: [
        {'urls': 'stun:stun.stunprotocol.org:3478'},
        {'urls': 'stun:stun.l.google.com:19302'},
      ],
    });

    if (peerConnection) {
      peerConnection.ontrack = (ev) => {
        console.log('Set stream to remote video element');
        remoteVideo.srcObject = ev.streams[0];
        remoteVideo.addEventListener('loadedmetadata', () => remoteVideo.play());
        if (remoteVideoContainer.current && remoteVideoContainer.current.childElementCount === 0) {
          remoteVideoContainer.current.append(remoteVideo);
        }
      }
    }

    sendToSignalingServer({ event: 'JOIN', });
  }

  const handlePeerConnection = () => {
    peerConnection = new RTCPeerConnection({
      iceServers: [
        {'urls': 'stun:stun.stunprotocol.org:3478'},
        {'urls': 'stun:stun.l.google.com:19302'},
      ],
    });

    if (peerConnection) {
      peerConnection.onicecandidate = (ev) => {
        if (ev.candidate) {
          sendToSignalingServer({ event: CANDIDATE, data: ev.candidate, });
          console.log('Send ICE candidate to signaling server');
        }
      }

      peerConnection.ontrack = (ev) => {
        console.log('Set stream to remote video element');
        remoteVideo.srcObject = ev.streams[0];
        remoteVideo.addEventListener('loadedmetadata', () => remoteVideo.play());
        if (remoteVideoContainer.current && remoteVideoContainer.current.childElementCount === 0) {
          remoteVideoContainer.current.append(remoteVideo);
        }
      }

      navigator.mediaDevices.getUserMedia({ audio: true, video: true, })
        .then((mediaStream) => {
          localVideo.srcObject = mediaStream;
          localVideo.addEventListener('loadedmetadata', () => localVideo.play());
          if (localVideoContainer.current && localVideoContainer.current.childElementCount === 0) {
            localVideoContainer.current.append(localVideo);
          }

          localStream = mediaStream;
          localStream.getTracks().forEach((mediaStreamTrack) => {
            peerConnection.addTrack(mediaStreamTrack, localStream);
          });
        });

      peerConnection.onnegotiationneeded = (() => {
        peerConnection.createOffer()
          .then((offer) => peerConnection.setLocalDescription(offer))
          .then(() => sendToSignalingServer({ event: OFFER, data: peerConnection.localDescription as RTCSessionDescription, }))
          .then(() => console.log('Set local description and send an OFFER to signaling server'));
      });
    }
  }

  const handleIceCandidate = (candidate: RTCIceCandidate) => {
    if (peerConnection) {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
        .then(() => console.log('Add received ICE candidate'));
    }
  }

  const handleOffer = (offer: RTCSessionDescription) => {
    if (peerConnection) {
      peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
        .then(() => {
          console.log('Set remote description');
          return navigator.mediaDevices.getUserMedia({ audio: true, video: true, });
        })
        .then((mediaStream) => {
          localVideo.srcObject = mediaStream;
          localVideo.addEventListener('loadedmetadata', () => localVideo.play());
          if (localVideoContainer.current && localVideoContainer.current.childElementCount === 0) {
            localVideoContainer.current.append(localVideo);
          }

          localStream = mediaStream;
          localStream.getTracks().forEach((mediaStreamTrack) => {
            peerConnection.addTrack(mediaStreamTrack, localStream);
          });
        })
        .then(() => peerConnection.createAnswer())
        .then((answer) => peerConnection.setLocalDescription(answer))
        .then(() => sendToSignalingServer({ event: ANSWER, data: peerConnection.localDescription as RTCSessionDescription, }))
        .then(() => console.log('Set local description and send an ANSWER to signaling server'));
    }
  }

  const handleAnswer = (answer: RTCSessionDescription) => {
    if (peerConnection) {
      peerConnection.setRemoteDescription(answer)
        .then(() => console.log('Set remote description'));
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <button type='button' onClick={startVideoCall}>Start Video Call</button>

        <div ref={localVideoContainer} style={{ width: '300px', height: '300px', }}></div>
        <div ref={remoteVideoContainer} style={{ width: '300px', height: '300px', }}></div>
      </main>
    </>
  );
}
