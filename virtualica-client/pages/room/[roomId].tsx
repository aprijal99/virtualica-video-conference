import {Box} from '@mui/material';
import RoomNavBar from '@/components/room_components/RoomNavBar';
import VideoContainer from '@/components/room_components/VideoContainer';
import {useEffect, useState} from 'react';
import {GetServerSideProps} from 'next';
import jwtDecode from 'jwt-decode';

type WsMessageType = {
  type: 'JOIN' | 'REQUEST' | 'OFFER' | 'CANDIDATE' | 'ANSWER',
  roomId?: string,
  senderEmail?: string,
  receiverEmail?: string,
  data?: RTCSessionDescription | RTCIceCandidate | string[],
}

interface RoomPageProps {
  isAuth: boolean,
  userEmail?: string,
  roomId: string,
}

const peerConnectionConfig: RTCConfiguration = {
  iceServers: [
    {'urls': 'stun:stun.stunprotocol.org:3478'},
    {'urls': 'stun:stun.l.google.com:19302'},
  ],
}

const Room = ({ isAuth, userEmail = `user-${Math.random()}`, roomId }: RoomPageProps) => {
  const peerConnection: { [n: string]: RTCPeerConnection } = {};
  const [videoStream, setVideoStream] = useState<Map<string, MediaStream>>(new Map());

  useEffect(() => {
    const socket: WebSocket = new WebSocket('ws://localhost:7181/socket');

    socket.onmessage = (ev) => {
      const wsMessage: WsMessageType = JSON.parse(ev.data);

      switch (wsMessage.type) {
        case 'JOIN':
          console.log('Receive JOIN');
          handleJoin(wsMessage.data as string[]);
          break;
        case 'REQUEST':
          console.log('Receive REQUEST');
          handleRequest(wsMessage.senderEmail as string);
          break;
        case 'CANDIDATE':
          console.log('Receive CANDIDATE');
          handleCandidate(wsMessage.senderEmail as string, wsMessage.data as RTCIceCandidate);
          break;
        case 'OFFER':
          console.log('Receive OFFER');
          handleOffer(wsMessage.senderEmail as string, wsMessage.data as RTCSessionDescription);
          break;
        case 'ANSWER':
          console.log('Receive ANSWER');
          handleAnswer(wsMessage.senderEmail as string, wsMessage.data as RTCSessionDescription);
          break;
        default:
          break;
      }
    }

    socket.onopen = () => {
      sendToSignalingServer({ type: 'JOIN', roomId, senderEmail: userEmail, });
      console.log('Send JOIN');

      navigator.mediaDevices.getUserMedia({ audio: true, video: true, })
        .then((mediaStream) => setVideoStream(new Map(videoStream.set(userEmail, mediaStream))));
    }

    const sendToSignalingServer = (message: WsMessageType) => socket.send(JSON.stringify(message));

    const handleJoin = (peopleArr: string[]) => {
      if (peopleArr.length > 1) {
        for (let i = 0; i < peopleArr.length; i++) {
          if (peopleArr[i] === userEmail) continue;

          const newPeerConnection = new RTCPeerConnection(peerConnectionConfig);
          newPeerConnection.ontrack = (ev) => {
            setVideoStream(new Map(videoStream.set(peopleArr[i], ev.streams[0])));
          }
          peerConnection[peopleArr[i]] = newPeerConnection;
        }

        sendToSignalingServer({ type: 'REQUEST', roomId, senderEmail: userEmail, });
        console.log('Send REQUEST');
      }
    }

    const handleRequest = (senderEmail: string) => {
      peerConnection[senderEmail] = new RTCPeerConnection(peerConnectionConfig);

      peerConnection[senderEmail].onicecandidate = (ev) => {
        if (ev.candidate) {
          sendToSignalingServer({ type: 'CANDIDATE', roomId, senderEmail: userEmail, receiverEmail: senderEmail, data: ev.candidate as RTCIceCandidate, });
          console.log('Send CANDIDATE');
        }
      }

      peerConnection[senderEmail].ontrack = (ev) => {
        setVideoStream(new Map(videoStream.set(senderEmail, ev.streams[0])));
      }

      videoStream.get(userEmail)!.getTracks().forEach((mediaStreamTrack) => {
        peerConnection[senderEmail].addTrack(mediaStreamTrack, videoStream.get(userEmail)!);
      });

      peerConnection[senderEmail].onnegotiationneeded = () => {
        peerConnection[senderEmail].createOffer()
          .then((offer) => peerConnection[senderEmail].setLocalDescription(offer))
          .then(() => sendToSignalingServer({ type: 'OFFER', roomId, senderEmail: userEmail, receiverEmail: senderEmail, data: peerConnection[senderEmail].localDescription as RTCSessionDescription, }))
          .then(() => console.log('Send OFFER'));
      }
    }

    const handleCandidate = (senderEmail: string, candidate: RTCIceCandidate) => {
      peerConnection[senderEmail].addIceCandidate(new RTCIceCandidate(candidate));
    }

    const handleOffer = (senderEmail: string, offer: RTCSessionDescription) => {
      peerConnection[senderEmail].setRemoteDescription(new RTCSessionDescription(offer))
        .then(() => {
          navigator.mediaDevices.getUserMedia({ audio: true, video: true, })
            .then((mediaStream) => {
              mediaStream.getTracks().forEach((mediaStreamTrack) => {
                peerConnection[senderEmail].addTrack(mediaStreamTrack, mediaStream);
              });
            });
        })
        .then(() => {
          peerConnection[senderEmail].createAnswer()
            .then((answer) => peerConnection[senderEmail].setLocalDescription(answer))
            .then(() => sendToSignalingServer({ type: 'ANSWER', roomId, senderEmail: userEmail, receiverEmail: senderEmail, data: peerConnection[senderEmail].localDescription as RTCSessionDescription}))
            .then(() => console.log('Send ANSWER'));
        });
    }

    const handleAnswer = (senderEmail: string, answer: RTCSessionDescription) => {
      peerConnection[senderEmail].setRemoteDescription(answer);
    }
  }, []);

  return (
    isAuth ?
      <Box display='flex' flexDirection='column' sx={{ height: '100vh', mx: 2, }}>
        {/* VIDEO */}
        <VideoContainer videoStream={videoStream} />

        {/* NAVIGATION */}
        <RoomNavBar />
      </Box> :
      <Box>
        Please login to your account in Home page
      </Box>
  );
}

export const getServerSideProps: GetServerSideProps<RoomPageProps> = async (ctx) => {
  const props: RoomPageProps = {
    isAuth: false,
    // userEmail: '',
    roomId: '',
  }

  const accessToken: string | undefined = ctx.req.cookies['access_token'];
  if (accessToken === undefined) return { props, }

  const decodedAccessToken: { sub: string, roles: string[], iss: string, exp: number, } = jwtDecode(accessToken);
  const isValid: boolean = decodedAccessToken.exp > Date.now() / 1000;
  if (!isValid) return { props, }

  props.isAuth = true;
  // props.userEmail = decodedAccessToken.sub;
  props.roomId = ctx.params?.roomId as string;

  return { props, }
}

export default Room;
