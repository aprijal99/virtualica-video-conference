import {
  Avatar,
  Box,
  Button, Checkbox,
  Dialog,
  DialogContent,
  DialogTitle, FormControlLabel,
  IconButton, Link,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import {Close, LockOutlined} from '@mui/icons-material';
import theme from '@/functions/theme';

const LoginDialog = ({ openLoginDialog, handleCloseLoginDialog }: { openLoginDialog: boolean, handleCloseLoginDialog: () => void, }) => {
  return (
    <Dialog open={openLoginDialog} onClose={handleCloseLoginDialog} maxWidth='xs' fullScreen={useMediaQuery('(max-width: 600px)')}>
      <Box sx={{ maxWidth: '400px', mx: 'auto' }}>
        <DialogTitle sx={{ p: '24px 24px 0', }}>
          <Avatar sx={{ mx: 'auto', mb: 1, bgcolor: '#199bf1', }}>
            <LockOutlined sx={{ color: 'white', }} />
          </Avatar>
          <Typography gutterBottom sx={{ textAlign: 'center', fontWeight: '600', fontSize: '24px', }}>Login</Typography>
          <Typography align='center'>Welcome, hope you have an amazing day, enjoy your online meetings with Virtualica</Typography>
        </DialogTitle>
        <DialogContent sx={{ flexGrow: '0', p: '24px !important', }}>
          <TextField fullWidth label='Email Address' variant='outlined' sx={{ mb: 2, }} />
          <TextField fullWidth label='Password' variant='outlined' sx={{ mb: 1, }} />
          <FormControlLabel control={<Checkbox disableRipple />} label='Remember me' sx={{ mb: 1, }} />
          <Button fullWidth variant='contained'>Login</Button>

          <Typography align='center' sx={{ mt: 1}}>
            <Link sx={{ fontSize: '14px', cursor: 'pointer', }}>Forgot your password?</Link>
          </Typography>
        </DialogContent>
      </Box>
      <IconButton onClick={handleCloseLoginDialog} sx={{ position: 'absolute', right: '10px', top: '10px', }}>
        <Close />
      </IconButton>
    </Dialog>
  );
}

export default LoginDialog;
