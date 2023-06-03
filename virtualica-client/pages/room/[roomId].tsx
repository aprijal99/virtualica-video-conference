import {Box} from '@mui/material';
import RoomNavBar from '@/components/room_components/RoomNavBar';
import VideoContainer from '@/components/room_components/VideoContainer';
import {createElement, useEffect, useState} from 'react';
import {GetServerSideProps} from 'next';
import jwtDecode from 'jwt-decode';

type WsMessageType = {
  type: 'JOIN' | 'REQUEST' | 'OFFER' | 'CANDIDATE' | 'ANSWER',
  roomId?: string,
  senderEmail?: string,
  receiverEmail?: string,
  data?: RTCSessionDescription | RTCIceCandidate,
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
  const [people, setPeople] = useState<string[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<Map<string, MediaStream>>(new Map());

  useEffect(() => console.log(peerConnections), [peerConnections]);
  useEffect(() => console.log(people), [people]);

  useEffect(() => {
    const socket: WebSocket = new WebSocket('ws://localhost:7181/socket');

    socket.onmessage = (ev) => {
      const wsMessage: WsMessageType = JSON.parse(ev.data);

      switch (wsMessage.type) {
        case 'JOIN':
          // handleJoin();
          break;
        case 'REQUEST':
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

      if (people.length === 0) setPeople([userEmail, userEmail]);

      navigator.mediaDevices.getUserMedia({ audio: true, video: true, })
        .then((mediaStream) => {
          setLocalStream(mediaStream);
        });
    }

    const sendToSignalingServer = (message: WsMessageType) => socket.send(JSON.stringify(message));

    const handleJoin = () => {
      const localPeerConnection = new RTCPeerConnection(peerConnectionConfig);
      localPeerConnection.onicecandidate = (ev) => {
        if (ev.candidate) sendToSignalingServer({ type: 'REQUEST', roomId, senderEmail: userEmail, });
      }

      const newPeerConnections = new Map<string, RTCPeerConnection>(peerConnections);
      newPeerConnections.set(userEmail, new RTCPeerConnection(peerConnectionConfig));
      setPeerConnections(newPeerConnections);
    }
  }, []);

  return (
    isAuth ?
      <Box display='flex' flexDirection='column' sx={{ height: '100vh', mx: 2, }}>
        {/* VIDEO */}
        <VideoContainer people={people} localStream={localStream} />

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
