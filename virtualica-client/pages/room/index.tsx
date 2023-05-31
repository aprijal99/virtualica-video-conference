import {Box} from '@mui/material';
import RoomNavBar from '@/components/room_components/RoomNavBar';
import VideoContainer from '@/components/room_components/VideoContainer';
import {useEffect} from 'react';

const JOIN: string = 'JOIN';
const REQUEST: string = 'REQUEST';
const OFFER: string = 'OFFER';
const CANDIDATE: string = 'CANDIDATE';
const ANSWER: string = 'ANSWER';

const Room = () => {
  useEffect(() => {
    const socket: WebSocket = new WebSocket('ws://localhost:7181/socket');
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
