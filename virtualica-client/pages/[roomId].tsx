import Head from 'next/head'
import {createRef, useEffect, useState} from 'react';
import {GetServerSideProps} from 'next';

type MessageType = {
  event: 'JOIN' | 'REQUEST' | 'CANDIDATE' | 'OFFER' | 'ANSWER',
  senderEmail?: string,
  receiverEmail?: string,
  roomId?: string,
  data?: RTCSessionDescription | RTCIceCandidate | string[],
}

const peerConnectionConfig: RTCConfiguration = {
  iceServers: [
    {'urls': 'stun:stun.stunprotocol.org:3478'},
    {'urls': 'stun:stun.l.google.com:19302'},
  ],
}

interface RoomIdProps {
  // isAuth: boolean,
  userEmail?: string,
  roomId: string,
}

const RoomId = ({ roomId, userEmail = `user-${Math.random()}` }: RoomIdProps) => {
  const peerHolder: Map<string, RTCPeerConnection> = new Map<string, RTCPeerConnection>();
  const [videoStream, setVideoStream] = useState<Map<string, MediaStream>>(new Map());

  useEffect(() => {
    const conn: WebSocket = new WebSocket('ws://localhost:7181/socket');

    conn.onmessage = (ev) => {
      const message: MessageType = JSON.parse(ev.data);

      switch (message.event) {
        case 'JOIN':
          console.log('Receive JOIN');
          handleJoin(message.data as string[]);
          break;
        case 'REQUEST':
          console.log('Receive REQUEST');
          handlePeerConnection(message.senderEmail as string);
          break;
        case 'CANDIDATE':
          console.log('Receive CANDIDATE');
          handleIceCandidate(message.senderEmail as string, message.data as RTCIceCandidate);
          break;
        case 'OFFER':
          console.log('Receive OFFER');
          handleOffer(message.senderEmail as string, message.data as RTCSessionDescription);
          break;
        case 'ANSWER':
          console.log('Receive ANSWER');
          handleAnswer(message.senderEmail as string, message.data as RTCSessionDescription);
          break;
        default:
          break;
      }
    }

    conn.onopen = () => {
      navigator.mediaDevices.getUserMedia({ audio: true, video: true, })
        .then((mediaStream) => {
          setVideoStream(new Map(videoStream.set(userEmail, mediaStream)));
        });

      sendToSignalingServer({ event: 'JOIN', senderEmail: userEmail, roomId });
    }

    const sendToSignalingServer = (message: MessageType) => {
      conn.send(JSON.stringify(message));
    }

    const handleJoin = (people: string[]) => {
      if (people.length > 1) {
        for (let i = 0; i < people.length; i++) {
          if (people[i] === userEmail) continue;
          peerHolder.set(people[i], new RTCPeerConnection(peerConnectionConfig));
        }

        sendToSignalingServer({ event: 'REQUEST', senderEmail: userEmail, roomId });
      }
    }

    const handlePeerConnection = (senderEmail: string) => {
      peerHolder.set(senderEmail, new RTCPeerConnection(peerConnectionConfig));

      peerHolder.get(senderEmail)!.onicecandidate = (ev) => {
        if (ev.candidate) {
          sendToSignalingServer({ event: 'CANDIDATE', senderEmail: userEmail, receiverEmail: senderEmail, roomId, data: ev.candidate, });
        }
      }

      peerHolder.get(senderEmail)!.ontrack = (ev) => {
        setVideoStream(new Map(videoStream.set(senderEmail, ev.streams[0])));
      }

      peerHolder.get(senderEmail)!.onnegotiationneeded = () => {
        peerHolder.get(senderEmail)!.createOffer()
          .then((offer) => peerHolder.get(senderEmail)!.setLocalDescription(offer))
          .then(() => sendToSignalingServer({ event: 'OFFER', senderEmail: userEmail, receiverEmail: senderEmail, roomId, data: peerHolder.get(senderEmail)!.localDescription as RTCSessionDescription, }));
      };

      navigator.mediaDevices.getUserMedia({ audio: true, video: true, })
        .then((mediaStream) => {
          mediaStream.getTracks().forEach((mediaStreamTrack) => {
            peerHolder.get(senderEmail)!.addTrack(mediaStreamTrack, mediaStream);
          });
        });
    }

    const handleIceCandidate = (senderEmail: string, candidate: RTCIceCandidate) => {
      peerHolder.get(senderEmail)!.addIceCandidate(new RTCIceCandidate(candidate));
    }

    const handleOffer = (senderEmail: string, offer: RTCSessionDescription) => {
      peerHolder.get(senderEmail)!.ontrack = (ev) => {
        setVideoStream(new Map(videoStream.set(senderEmail, ev.streams[0])));
      }

      peerHolder.get(senderEmail)!.setRemoteDescription(new RTCSessionDescription(offer))
        .then(() => navigator.mediaDevices.getUserMedia({ audio: true, video: true, }))
        .then((mediaStream) => {
          mediaStream.getTracks().forEach((mediaStreamTrack) => {
            peerHolder.get(senderEmail)!.addTrack(mediaStreamTrack, mediaStream);
          });
        })
        .then(() => peerHolder.get(senderEmail)!.createAnswer())
        .then((answer) => peerHolder.get(senderEmail)!.setLocalDescription(answer))
        .then(() => sendToSignalingServer({ event: 'ANSWER', senderEmail: userEmail, receiverEmail: senderEmail, roomId, data: peerHolder.get(senderEmail)!.localDescription as RTCSessionDescription, }));
    }

    const handleAnswer = (senderEmail: string, answer: RTCSessionDescription) => {
      peerHolder.get(senderEmail)!.setRemoteDescription(answer);
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
      {Array.from(renderedVideoStream.keys()).map((key, idx) => (
        <>
          <Video key={idx} mediaStream={renderedVideoStream.get(key) as MediaStream} />
          <div>{key}</div>
        </>
      ))}
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
