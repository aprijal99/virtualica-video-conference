import Head from 'next/head'
import {createRef, useEffect} from 'react';

type MessageType = {
  event: string,
  data: RTCSessionDescriptionInit | RTCIceCandidate,
}

const OFFER: string = 'OFFER';
const ANSWER: string = 'ANSWER';
const CANDIDATE: string = 'CANDIDATE';

const conn: WebSocket = new WebSocket('ws://localhost:7181/socket');
// const conn: WebSocket = new WebSocket('wss://virtualica-signaling-server.onrender.com/socket');

export default function Home() {
  const inputMessageRef = createRef<HTMLInputElement>();
  const myVideoContainerRef = createRef<HTMLDivElement>();
  const anotherVideoContainerRef = createRef<HTMLDivElement>();

  conn.onopen = () => console.log('Connected to the signaling server');

  conn.onmessage = (ev) => {
    const message: MessageType = JSON.parse(ev.data);

    switch (message.event) {
      case OFFER:
        console.log('Receiving an offer');
        handleOffer(message.data as RTCSessionDescriptionInit);
        break;
      case ANSWER:
        console.log('Receiving an answer');
        handleAnswer(message.data as RTCSessionDescriptionInit);
        break;
      case CANDIDATE:
        console.log('Receiving an ICE candidate');
        handleCandidate(message.data as RTCIceCandidate);
        break;
      default:
        break;
    }
  }

  let peerConnection: RTCPeerConnection;
  let dataChannel: RTCDataChannel;
  let localStream: MediaStream;

  useEffect(() => {
    peerConnection = new RTCPeerConnection({
      iceServers: [
        {'urls': 'stun:stun.stunprotocol.org:3478'},
        {'urls': 'stun:stun.l.google.com:19302'},
      ],
    });
    dataChannel = peerConnection.createDataChannel("channel");

    dataChannel.onopen = () => console.log('Channel connected')
    dataChannel.onmessage = (ev) => console.log(`New message: ${ev.data}`);
    dataChannel.onclose = () => console.log('Channel closed');
    dataChannel.onerror = () => console.log('Error on channel');

    peerConnection.onicecandidate = (ev) => {
      if (ev.candidate) {
        sendToSignalingServer({ event: CANDIDATE, data: ev.candidate, });
      }
    }

    peerConnection.ondatachannel = (ev) => {
      dataChannel = ev.channel;
      console.log('Channel connected');
    }

    peerConnection.ontrack = (ev) => {
      console.log('Get video call');
      const anotherVideo: HTMLVideoElement = document.createElement('video');
      anotherVideo.muted = true;
      anotherVideo.srcObject = ev.streams[0];
      anotherVideo.addEventListener('loadedmetadata', () => anotherVideo.play());

      if (anotherVideoContainerRef.current && anotherVideoContainerRef.current.childElementCount === 0) {
        anotherVideoContainerRef.current.append(anotherVideo);
      }
    }
  }, []);

  useEffect(() => {
    const myVideo: HTMLVideoElement = document.createElement('video');
    myVideo.muted = true;

    navigator.mediaDevices.getUserMedia({ audio: true, video: true, })
      .then((stream) => {
        localStream = stream;
        myVideo.srcObject = stream;
        myVideo.addEventListener('loadedmetadata', () => myVideo.play());

        if (myVideoContainerRef.current && myVideoContainerRef.current.childElementCount === 0) {
          myVideoContainerRef.current.append(myVideo);
        }
      });
  }, []);

  const sendToSignalingServer = (message: MessageType) => {
    conn.send(JSON.stringify(message));
  }

  const requestConnection = () => {
    if (peerConnection) {
      peerConnection.createOffer()
        .then((sessionDescription) => {
          peerConnection.setLocalDescription(sessionDescription)
            .then(() => console.log('Succeed setting local description'))
            .catch(() => console.log('Failed setting local description'));
          sendToSignalingServer({ event: OFFER, data: sessionDescription, });
        })
        .then(() => console.log('Succeed creating offer and sent it to signaling server'))
        .catch(() => console.log('Failed creating offer and sent it to signaling server'));
    }
  }

  const handleOffer = (offer: RTCSessionDescriptionInit) => {
    if (peerConnection) {
      peerConnection.setRemoteDescription(offer)
        .then(() => console.log('Succeed setting remote description'))
        .catch(() => console.log('Failed setting remote description'));

      peerConnection.createAnswer()
        .then((answer) => {
          peerConnection.setLocalDescription(answer)
            .then(() => console.log('Succeed setting local description'))
            .catch(() => console.log('Failed setting local description'));
          sendToSignalingServer({ event: ANSWER, data: answer, });
        })
        .then(() => console.log('Succeed creating answer and sent it to signaling server'))
        .catch(() => console.log('Failed creating answer and sent it to signaling server'));
    }
  }

  const handleAnswer = (answer: RTCSessionDescriptionInit) => {
    if (peerConnection) {
      peerConnection.setRemoteDescription(answer)
        .then(() => console.log('Succeed setting remote description'))
        .catch(() => console.log('Failed setting remote description'));
    }
  }

  const handleCandidate = (candidate: RTCIceCandidate) => {
    if (peerConnection) {
      peerConnection.addIceCandidate(candidate)
        .then(() => console.log('Succeed setting ICE candidate'))
        .catch(() => console.log('Failed setting ICE candidate'));
    }
  }

  const sendMessageToChannel = () => {
    if (inputMessageRef.current && (inputMessageRef.current.value !== '') && dataChannel) {
      dataChannel.send(inputMessageRef.current.value);
      inputMessageRef.current.value = '';
    }
  }

  const startVideoCall = () => {
    if (peerConnection && localStream) {
      console.log('Start video call');
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });
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
        <div>
          <button type='button' onClick={requestConnection}>Request Connection</button>
        </div>

        <input type='text' ref={inputMessageRef} />
        <button type='button' onClick={sendMessageToChannel}>Send</button>

        <div>
          <button type='button' onClick={startVideoCall}>Start Video Call</button>
        </div>

        <div ref={myVideoContainerRef} style={{ width: '300px', height: '300px', }}></div>
        <div ref={anotherVideoContainerRef} style={{ width: '300px', height: '300px', }}></div>
      </main>
    </>
  );
}
