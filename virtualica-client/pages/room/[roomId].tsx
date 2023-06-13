import {Box, Typography} from '@mui/material';
import RoomNavBar from '@/components/room_components/RoomNavBar';
import VideoContainer from '@/components/room_components/VideoContainer';
import React, {useContext, useEffect, useState} from 'react';
import {GetServerSideProps} from 'next';
import jwtDecode from 'jwt-decode';
import PeopleList from '@/components/room_components/PeopleList';
import RoomMessage from '@/components/room_components/RoomMessage';
import MeetingDetails from '@/components/room_components/MeetingDetails';
import {RoomDialogContext} from '@/context/RoomDialogProvider';
import {Close} from '@mui/icons-material';
import {RoomMessageType} from '@/context/RoomMessageProvider';

export type WsMessageType = {
  event: 'JOIN' | 'REQUEST' | 'CANDIDATE' | 'OFFER' | 'ANSWER' | 'MESSAGE',
  senderEmail?: string,
  receiverEmail?: string,
  roomId?: string,
  data?: RTCSessionDescription | RTCIceCandidate | string[] | RoomMessageType,
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
  userName: string,
  roomId: string,
}

const Room = ({ isAuth, userEmail, userName, roomId }: RoomPageProps) => {
  const peerHolder: Map<string, RTCPeerConnection> = new Map<string, RTCPeerConnection>();
  const [videoStream, setVideoStream] = useState<Map<string, MediaStream>>(new Map());
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const conn: WebSocket = new WebSocket('ws://localhost:7181/socket');

    conn.onmessage = (ev) => {
      const message: WsMessageType = JSON.parse(ev.data);

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
      // navigator.mediaDevices.getUserMedia({ audio: true, video: true, })
      //   .then((mediaStream) => {
      //     setVideoStream(new Map(videoStream.set(userEmail, mediaStream)));
      //   });

      // sendToSignalingServer({ event: 'JOIN', senderEmail: userEmail, roomId });

      setWebSocket(conn);
    }

    const sendToSignalingServer = (message: WsMessageType) => {
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
        <Box display='flex' flexGrow='1' sx={{ mt: 2, overflow: 'hidden', }}>
          {/* VIDEO */}
          <VideoContainer videoStream={videoStream} />

          {/* ROOM DIALOG */}
          <RoomDialog webSocket={webSocket} />
        </Box>

        {/* NAVIGATION */}
        <RoomNavBar />
      </Box> :
      <Box>
        Please login to your account in Home page
      </Box>
  );
}

const RoomDialog = ({ webSocket }: { webSocket: WebSocket | null, }) => {
  const { dialogStatus, changeDialogStatus } = useContext(RoomDialogContext);

  return (
    <Box
      display='flex' flexDirection='column'
      sx={{
        p: 3, overflow: 'hidden', minWidth: '350px', maxWidth: '350px', height: '100%', bgcolor: 'white', color: 'black', ml: 2, borderRadius: '10px',
        transform: dialogStatus === '' ? 'translateX(366px)' : '', transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
      }}
    >
      <Box display='flex' alignItems='center' justifyContent='space-between' sx={{ mb: 3, }}>
        <Typography variant='h6' sx={{ fontWeight: '400', }}>
          {dialogStatus === 'people' && 'People'}
          {dialogStatus === 'message' && 'Messages'}
          {dialogStatus === 'info' && 'Meeting Details'}
        </Typography>
        <Box display='flex' onClick={() => changeDialogStatus!('')}>
          <Close sx={{ cursor: 'pointer', }} />
        </Box>
      </Box>
      {dialogStatus === 'people' && <PeopleList />}
      {dialogStatus === 'message' && <RoomMessage webSocket={webSocket} />}
      {dialogStatus === 'info' && <MeetingDetails />}
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps<RoomPageProps> = async (ctx) => {
  const props: RoomPageProps = {
    isAuth: false,
    userEmail: `user-${Math.random()}`,
    userName: '',
    roomId: '',
  }

  const accessToken: string | undefined = ctx.req.cookies['access_token'];
  if (accessToken === undefined) return { props, }

  const decodedAccessToken: { sub: string, roles: string[], iss: string, exp: number, } = jwtDecode(accessToken);
  const isValid: boolean = decodedAccessToken.exp > Date.now() / 1000;
  if (!isValid) return { props, }

  const userName: string = atob(ctx.req.cookies['user_name'] as string);
  const userEmail: string = atob(ctx.req.cookies['user_email'] as string);

  props.isAuth = true;
  // props.userEmail = userEmail;
  props.userName = userName as string;
  props.roomId = ctx.params?.roomId as string;

  return { props, }
}

export default Room;
