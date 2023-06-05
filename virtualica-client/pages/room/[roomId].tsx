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
  userEmail: string,
  roomId: string,
}

const peerConnectionConfig: RTCConfiguration = {
  iceServers: [
    {'urls': 'stun:stun.stunprotocol.org:3478'},
    {'urls': 'stun:stun.l.google.com:19302'},
  ],
}

const Room = ({ isAuth, userEmail, roomId }: RoomPageProps) => {
  const [peerConnections, setPeerConnections] = useState<Map<string, RTCPeerConnection>>(new Map());
  const [videoStream, setVideoStream] = useState<Map<string, MediaStream | null>>(new Map());

  useEffect(() => console.log(peerConnections), [peerConnections]);

  useEffect(() => {
    const socket: WebSocket = new WebSocket('ws://localhost:7181/socket');

    socket.onmessage = (ev) => {
      const wsMessage: WsMessageType = JSON.parse(ev.data);

      switch (wsMessage.type) {
        case 'JOIN':
          handleJoin(wsMessage.data as string[]);
          break;
        case 'REQUEST':
          handleRequest(wsMessage.senderEmail as string);
          break;
        case 'OFFER':
          break;
        case 'CANDIDATE':
          break;
        case 'ANSWER':
          break;
        default:
          break;
      }
    }

    socket.onopen = () => {
      sendToSignalingServer({ type: 'JOIN', roomId, senderEmail: userEmail, });

      navigator.mediaDevices.getUserMedia({ audio: true, video: true, })
        .then((mediaStream) => {
          setVideoStream(new Map(videoStream.set(userEmail, mediaStream)));
        });
    }

    const sendToSignalingServer = (message: WsMessageType) => socket.send(JSON.stringify(message));

    const handleJoin = (peopleArr: string[]) => {
      if (peopleArr.length > 1) {
        for (let i = 0; i < peopleArr.length; i++) {
          if (peopleArr[i] === userEmail) continue;

          setVideoStream(new Map(videoStream.set(peopleArr[i], null)));

          const newPeerConnection = new RTCPeerConnection(peerConnectionConfig);
          newPeerConnection.ontrack = (ev) => {
            videoStream.set(peopleArr[i], ev.streams[0]);
          }
          setPeerConnections(new Map(peerConnections.set(peopleArr[i], newPeerConnection)));
        }

        sendToSignalingServer({ type: 'REQUEST', roomId, senderEmail: userEmail, });
      }
    }

    const handleRequest = (senderEmail: string) => {

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
    userEmail: '',
    roomId: '',
  }

  const accessToken: string | undefined = ctx.req.cookies['access_token'];
  if (accessToken === undefined) return { props, }

  const decodedAccessToken: { sub: string, roles: string[], iss: string, exp: number, } = jwtDecode(accessToken);
  const isValid: boolean = decodedAccessToken.exp > Date.now() / 1000;
  if (!isValid) return { props, }

  props.isAuth = true;
  props.userEmail = decodedAccessToken.sub;
  props.roomId = ctx.params?.roomId as string;

  return { props, }
}

export default Room;
