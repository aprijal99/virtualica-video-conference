import Head from 'next/head'
import {createRef, useEffect, useState} from 'react';
import {GetServerSideProps} from 'next';

type MessageType = {
  event: 'JOIN' | 'CANDIDATE' | 'OFFER' | 'ANSWER',
  data?: RTCSessionDescription | RTCIceCandidate,
}

const peerConnectionConfig: RTCConfiguration = {
  iceServers: [
    {'urls': 'stun:stun.stunprotocol.org:3478'},
    {'urls': 'stun:stun.l.google.com:19302'},
  ],
}

interface RoomIdProps {
  // isAuth: boolean,
  // userEmail?: string,
  roomId: string,
}

const RoomId = ({ roomId }: RoomIdProps) => {
  let peerConnection: RTCPeerConnection;
  const [videoStream, setVideoStream] = useState<Map<string, MediaStream>>(new Map());

  useEffect(() => {
    const conn: WebSocket = new WebSocket('ws://localhost:7181/socket');

    conn.onmessage = (ev) => {
      const message: MessageType = JSON.parse(ev.data);

      switch (message.event) {
        case 'JOIN':
          console.log('Receive JOIN');
          handlePeerConnection();
          break;
        case 'CANDIDATE':
          console.log('Receive CANDIDATE');
          handleIceCandidate(message.data as RTCIceCandidate);
          break;
        case 'OFFER':
          console.log('Receive OFFER');
          handleOffer(message.data as RTCSessionDescription);
          break;
        case 'ANSWER':
          console.log('Receive ANSWER');
          handleAnswer(message.data as RTCSessionDescription);
          break;
        default:
          break;
      }
    }

    conn.onopen = () => {
      navigator.mediaDevices.getUserMedia({ audio: true, video: true, })
        .then((mediaStream) => {
          setVideoStream(new Map(videoStream.set('local', mediaStream)));
        });

      peerConnection = new RTCPeerConnection(peerConnectionConfig);

      peerConnection.ontrack = (ev) => {
        setVideoStream(new Map(videoStream.set('remote', ev.streams[0])));
      }

      sendToSignalingServer({ event: 'JOIN', });
    }

    const sendToSignalingServer = (message: MessageType) => {
      conn.send(JSON.stringify(message));
    }

    const handlePeerConnection = () => {
      peerConnection = new RTCPeerConnection(peerConnectionConfig);

      peerConnection.onicecandidate = (ev) => {
        if (ev.candidate) {
          sendToSignalingServer({ event: 'CANDIDATE', data: ev.candidate, });
        }
      }

      peerConnection.ontrack = (ev) => {
        setVideoStream(new Map(videoStream.set('remote', ev.streams[0])));
      }

      peerConnection.onnegotiationneeded = (() => {
        peerConnection.createOffer()
          .then((offer) => peerConnection.setLocalDescription(offer))
          .then(() => sendToSignalingServer({ event: 'OFFER', data: peerConnection.localDescription as RTCSessionDescription, }));
      });

      navigator.mediaDevices.getUserMedia({ audio: true, video: true, })
        .then((mediaStream) => {
          mediaStream.getTracks().forEach((mediaStreamTrack) => {
            peerConnection.addTrack(mediaStreamTrack, mediaStream);
          });
        });
    }

    const handleIceCandidate = (candidate: RTCIceCandidate) => {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }

    const handleOffer = (offer: RTCSessionDescription) => {
      peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
        .then(() => navigator.mediaDevices.getUserMedia({ audio: true, video: true, }))
        .then((mediaStream) => {
          mediaStream.getTracks().forEach((mediaStreamTrack) => {
            peerConnection.addTrack(mediaStreamTrack, mediaStream);
          });
        })
        .then(() => peerConnection.createAnswer())
        .then((answer) => peerConnection.setLocalDescription(answer))
        .then(() => sendToSignalingServer({ event: 'ANSWER', data: peerConnection.localDescription as RTCSessionDescription, }));
    }

    const handleAnswer = (answer: RTCSessionDescription) => {
      peerConnection.setRemoteDescription(answer);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <VideoContainer videoStream={videoStream} />
      </main>
    </>
  );
}

const VideoContainer = ({ videoStream }: { videoStream: Map<string, MediaStream>, }) => {
  const [renderedVideoStream, setRenderedVideoStream] = useState<Map<string, MediaStream>>(new Map());

  useEffect(() => {
    setRenderedVideoStream(new Map(videoStream));
  }, [videoStream]);

  return (
    <div>
      {Array.from(renderedVideoStream.keys()).map((key, idx) => <Video key={idx} mediaStream={renderedVideoStream.get(key) as MediaStream} />)}
    </div>
  );
}

const Video = ({ mediaStream }: { mediaStream: MediaStream, }) => {
  const videoContainerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (videoContainerRef.current) {
      const video: HTMLVideoElement = document.createElement('video');
      video.srcObject = mediaStream;
      video.height = 300;
      video.width = 300;
      video.addEventListener('loadedmetadata', () => video.play());

      videoContainerRef.current.append(video);
    }
  }, []);

  return (
    <div ref={videoContainerRef}></div>
  )
}

export const getServerSideProps: GetServerSideProps<RoomIdProps> = async (ctx) => {
  const props: RoomIdProps = {
    roomId: '',
  }

  props.roomId = ctx.params?.roomId as string;

  return { props, }
}

export default RoomId;
