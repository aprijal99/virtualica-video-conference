import {Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography, useMediaQuery} from '@mui/material';
import {useState} from 'react';

const CreateRoomDialog = ({ open, close }: { open: boolean, close: () => void, }) => {
  const [roomName, setRoomName] = useState<string>('');
  const [roomDesc, setRoomDesc] = useState<string>('');

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
            value={roomName} onChange={(e) => setRoomName(e.target.value)} sx={{ mb: 2, }}
          />
          <Box display='flex' justifyContent='flex-end' columnGap='10px' sx={{ mt: 1, }}>
            <Button variant='contained' sx={{ textTransform: 'none', }}>Create</Button>
            <Button variant='contained' color='error' sx={{ textTransform: 'none', }} onClick={close}>Cancel</Button>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default CreateRoomDialog;
