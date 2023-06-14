import {Box, InputAdornment, TextField, Typography} from '@mui/material';
import {Send} from '@mui/icons-material';
import {grey} from '@mui/material/colors';
import React, {useContext, useState} from 'react';
import {WsMessageType} from '@/pages/room/[roomId]';
import {RoomMessageContext, RoomMessageType} from '@/context/RoomMessageProvider';

const RoomMessage = ({ webSocket }: { webSocket: WebSocket | null, }) => {
  const [message, setMessage] = useState<string>('');
  const { roomMessage } = useContext(RoomMessageContext);

  const sendMessage = (message: string) => {
    const roomMessage: RoomMessageType = {
      message,
      senderName: 'aprijal',
      date: new Date().getDate(),
    }

    const wsMessage: WsMessageType = {
      event: 'MESSAGE',
      roomId: '123',
      data: roomMessage as RoomMessageType,
    }

    webSocket?.send(JSON.stringify(wsMessage));
    setMessage('');
  }

  const handleSendMessageClick = () => {
    sendMessage(message);
  }

  const handleSendMessageEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter' || e.which === 13) {
      sendMessage(message);
    }
  }

  return (
    <>
      <Typography align='center' sx={{ bgcolor: grey['200'], fontSize: '.8rem', p: 1, borderRadius: '5px', mb: 3, }}>
        Messages can only be seen by people in the call and are deleted when the call ends
      </Typography>

      <Box
        sx={{
          maxHeight: '100%', height: '100%', overflowX: 'hidden', overflowY: 'auto',
          scrollbarWidth: 'thin', position: 'relative', mx: -3,
        }}
      >
        <Box sx={{ display: 'block', position: 'absolute', width: '100%', pl: 3, pr: 2, }}>
          {roomMessage.map((rm, idx) => {
            let sameSender: boolean = false;
            if (idx !== 0) {
              sameSender = roomMessage[idx - 1].senderName === rm.senderName;
            }

            return <Message key={idx} sameSender={sameSender} roomMessage={rm} />;
          })}
        </Box>
      </Box>

      <TextField
        value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleSendMessageEnter}
        fullWidth={true} autoComplete='off' placeholder='Send a message'
        sx={{
          mt: 3,
          'input': { color: 'black', fontSize: '.9rem', },
          '.MuiInputBase-root': {
            borderRadius: '30px', pl: 1, bgcolor: grey['200'],
            '& > fieldset': { borderColor: grey['200'], },
            '&:hover fieldset': { borderColor: grey['200'], },
          },
          '& .MuiOutlinedInput-root.Mui-focused': {
            '& > fieldset': { borderColor: grey['200'], },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Box display='flex' sx={{ cursor: 'pointer', }} onClick={handleSendMessageClick}>
                <Send sx={{ fontSize: '22px', color: '#8b8b8b', }} />
              </Box>
            </InputAdornment>
          ),
        }}
      />
    </>
  )
}

const Message = ({ sameSender, roomMessage }: { sameSender: boolean, roomMessage: RoomMessageType, }) => {
  return (
    <Box sx={{ fontSize: '.9rem', mt: sameSender ? .5 : 2.5, }}>
      {!sameSender && (
        <Box display='flex' columnGap='10px' sx={{ mb: .5, }}>
          <Typography sx={{ fontSize: '.9rem', fontWeight: '500', }}>{roomMessage.senderName}</Typography>
          <Typography sx={{ fontSize: '.9rem', color: grey['800'], }}>
            {new Date(roomMessage.date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, })}
          </Typography>
        </Box>
      )}
      {roomMessage.message}
    </Box>
  );
}

export default RoomMessage;
