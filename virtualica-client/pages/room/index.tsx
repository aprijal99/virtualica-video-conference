import {Box} from '@mui/material';
import RoomNavBar from '@/components/room_components/RoomNavBar';
import VideoContainer from '@/components/room_components/VideoContainer';
import {useEffect} from 'react';

const JOIN: string = 'JOIN';
const REQUEST: string = 'REQUEST';
const OFFER: string = 'OFFER';
const CANDIDATE: string = 'CANDIDATE';
const ANSWER: string = 'ANSWER';

type WsMessageType = {
  type: 'JOIN' | 'REQUEST' | 'OFFER' | 'CANDIDATE' | 'ANSWER',
  roomId: string,
  senderEmail: string,
  receiverEmail: string,
  data?: RTCSessionDescription | RTCIceCandidate,
}

const Room = () => {
  let socket: WebSocket | null = null;

  useEffect(() => {
    socket = new WebSocket('ws://localhost:7181/socket');

    socket.onmessage = (ev) => {
      const wsMessage: WsMessageType = JSON.parse(ev.data);

      switch (wsMessage.type) {
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
  }, []);

  return (
    <Box display='flex' flexDirection='column' sx={{ height: '100vh', mx: 2, }}>
      {/* VIDEO */}
      <VideoContainer />

      {/* NAVIGATION */}
      <RoomNavBar />
    </Box>
  );
}

export default Room;
