import {
  Avatar, Backdrop,
  Box,
  Button, Checkbox, CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle, FormControlLabel,
  IconButton, Link,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import {Close, LockOutlined} from '@mui/icons-material';
import {useState} from 'react';

type ApiType<T> = {
  code: number,
  data?: T,
  status: string,
}

type LoginResult = {
  access_token: string,
  refresh_token: string,
}

const LoginDialog = ({ openLoginDialog, handleCloseLoginDialog }: { openLoginDialog: boolean, handleCloseLoginDialog: () => void, }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [backdrop, setBackdrop] = useState<boolean>(false);

  const handleLogin = async () => {
    if (email !== '' && password !== '') {
      setBackdrop(true);

      const formBody: { [n: string]: string } = { email: email, password: password, }
      const encodedFormBody = Object.keys(formBody).map((key: string) => encodeURIComponent(key) + '=' + encodeURIComponent(formBody[key])).join('&');

      const fetchResult = await fetch('http://localhost:7181/login', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', },
        body: encodedFormBody,
      });

      const apiResult: ApiType<LoginResult> = await fetchResult.json();
      if (apiResult.code === 200) {
        console.log('Login succeed');
        window.location.href = ('http://localhost:3000/room');
      } else {
        console.log('Unsuccessful login');
      }

      setBackdrop(false);
    }
  }

  return (
    <Dialog open={openLoginDialog} onClose={handleCloseLoginDialog} maxWidth='xs' fullScreen={useMediaQuery('(max-width: 600px)')}>
      <Box sx={{ maxWidth: '400px', mx: 'auto' }}>
        <DialogTitle sx={{ p: '24px 24px 0', }}>
          <Avatar sx={{ mx: 'auto', mb: 1.5, bgcolor: '#199bf1', }}>
            <LockOutlined sx={{ color: 'white', }} />
          </Avatar>
          <Typography gutterBottom sx={{ textAlign: 'center', fontWeight: '600', fontSize: '24px', }}>Login</Typography>
          <Typography align='center'>Welcome, hope you have an amazing day, enjoy your online meetings with Virtualica</Typography>
        </DialogTitle>
        <DialogContent sx={{ flexGrow: '0', p: '24px !important', }}>
          <TextField
            fullWidth label='Email Address' variant='outlined'
            value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2, }} />
          <TextField
            fullWidth label='Password' variant='outlined' type='password'
            value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 1, }} />
          <FormControlLabel control={<Checkbox disableRipple />} label='Remember me' sx={{ mb: 1, }} />
          <Button fullWidth variant='contained' onClick={handleLogin}>Login</Button>

          <Typography display='flex' justifyContent='space-between' sx={{ mt: 1}}>
            <Link sx={{ fontSize: '14px', cursor: 'pointer', }}>Forgot your password?</Link>
            <Link sx={{ fontSize: '14px', cursor: 'pointer', }}>or Sign up</Link>
          </Typography>
        </DialogContent>
      </Box>
      <IconButton onClick={handleCloseLoginDialog} sx={{ position: 'absolute', right: '10px', top: '10px', }}>
        <Close fontSize='small' />
      </IconButton>
      <Backdrop open={backdrop} sx={{ zIndex: 10000, }}>
        <CircularProgress />
      </Backdrop>
    </Dialog>
  );
}

export default LoginDialog;
