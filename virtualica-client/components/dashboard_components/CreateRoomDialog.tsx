import {Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography, useMediaQuery} from '@mui/material';
import {useContext, useState} from 'react';
import {UserContext} from '@/context/UserProvider';
import {ApiType} from '@/type/api';
import {RoomContext} from '@/context/RoomProvider';

const CreateRoomDialog = ({ open, close }: { open: boolean, close: () => void, }) => {
  const { userData } = useContext(UserContext);
  const { handleAddRoom } = useContext(RoomContext);
  const [roomName, setRoomName] = useState<string>('');
  const [roomDescription, setRoomDescription] = useState<string>('');

  const submitNewRoom = async () => {
    if (roomName !== '' && roomDescription !== '') {
      const fetchResult = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/room`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({
          roomName,
          roomDescription,
          ownerEmail: userData.email,
        }),
      });
      const apiResult: ApiType<{ roomId: string, }> = await fetchResult.json();

      if (apiResult.code === 201 && handleAddRoom) {
        handleAddRoom({
          roomId: apiResult.data?.roomId as string,
          roomName,
          roomDescription,
          createdAt: new Date().getTime(),
        });

        close();
        setRoomName('');
        setRoomDescription('');
      }
    }
  }

  return (
    <Dialog open={open} onClose={close} fullScreen={useMediaQuery('(max-width: 599px)')}>
      <Box sx={{ maxWidth: '400px', mx: 'auto', }}>
        <DialogTitle sx={{ mb: 1, }}>
          <Typography gutterBottom align='center' sx={{ fontWeight: '600', fontSize: '24px', }}>Create New Room</Typography>
          <Typography align='center'>Unlike other video conference applications, Virtualica let you create multiple rooms</Typography>
        </DialogTitle>
        <DialogContent sx={{ overflow: 'initial', }}>
          <TextField
            fullWidth label='Room Name' variant='outlined'
            value={roomName} onChange={(e) => setRoomName(e.target.value)} sx={{ mb: 2, }}
          />
          <TextField
            fullWidth label='Room Description' variant='outlined'
            value={roomDescription} onChange={(e) => setRoomDescription(e.target.value)} sx={{ mb: 2, }}
          />
          <Box display='flex' justifyContent='flex-end' columnGap='10px' sx={{ mt: 1, }}>
            <Button variant='contained' sx={{ textTransform: 'none', }} onClick={submitNewRoom}>Create</Button>
            <Button variant='contained' color='error' sx={{ textTransform: 'none', }} onClick={close}>Cancel</Button>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default CreateRoomDialog;
