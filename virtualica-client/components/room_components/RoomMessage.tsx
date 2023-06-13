import {Box, InputAdornment, TextField, Typography} from '@mui/material';
import {Send} from '@mui/icons-material';
import {grey} from '@mui/material/colors';
import React, {useState} from 'react';
import {WsMessageType} from '@/pages/room/[roomId]';
import {RoomMessageType} from '@/context/RoomMessageProvider';

const RoomMessage = ({ webSocket }: { webSocket: WebSocket | null, }) => {
  const [message, setMessage] = useState<string>('');

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

export default RoomMessage;
