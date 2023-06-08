import {Box} from '@mui/material';
import RoomNavBar from '@/components/room_components/RoomNavBar';
import VideoContainer from '@/components/room_components/VideoContainer';
import {useEffect, useState} from 'react';
import {GetServerSideProps} from 'next';
import jwtDecode from 'jwt-decode';

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

interface RoomPageProps {
  isAuth: boolean,
  userEmail: string,
  roomId: string,
}

const Room = ({ isAuth, userEmail, roomId }: RoomPageProps) => {
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
    userEmail: `user-${Math.random()}`,
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
