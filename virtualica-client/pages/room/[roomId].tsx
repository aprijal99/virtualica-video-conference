import {Box} from '@mui/material';
import RoomNavBar from '@/components/room_components/RoomNavBar';
import VideoContainer from '@/components/room_components/VideoContainer';
import {useEffect} from 'react';
import {GetServerSideProps} from 'next';
import jwtDecode from 'jwt-decode';

type WsMessageType = {
  type: 'JOIN' | 'REQUEST' | 'OFFER' | 'CANDIDATE' | 'ANSWER',
  roomId: string,
  senderEmail: string,
  receiverEmail?: string,
  data?: RTCSessionDescription | RTCIceCandidate,
}

interface RoomPageProps {
  isAuth: boolean,
  userEmail: string,
  roomId: string,
}

const Room = ({ isAuth, userEmail, roomId }: RoomPageProps) => {
  useEffect(() => {
    const socket: WebSocket = new WebSocket('ws://localhost:7181/socket');

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

    socket.onopen = () => {
      const joinMessage: WsMessageType = { type: 'JOIN', roomId, senderEmail: userEmail, }
      socket.send(JSON.stringify(joinMessage));
    }
  }, []);

  return (
    isAuth ?
      <Box display='flex' flexDirection='column' sx={{ height: '100vh', mx: 2, }}>
        {/* VIDEO */}
        <VideoContainer />

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
