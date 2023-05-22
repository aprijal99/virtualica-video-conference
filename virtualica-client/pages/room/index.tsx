import {Box} from '@mui/material';
import ButtonNav from '@/components/ButtonNav';
import VideoContainer from '@/components/VideoContainer';

// const socket: WebSocket = new WebSocket('ws://localhost:7181/socket');

const JOIN: string = 'JOIN';
const REQUEST: string = 'REQUEST';
const OFFER: string = 'OFFER';
const CANDIDATE: string = 'CANDIDATE';
const ANSWER: string = 'ANSWER';

const Room = () => {
  return (
    <Box display='flex' flexDirection='column' sx={{ height: '100vh', mx: 2, }}>
      {/* VIDEO */}
      <VideoContainer />

      {/* NAVIGATION */}
      <ButtonNav />
    </Box>
  );
}

export default Room;
