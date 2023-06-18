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
import React, {useContext, useState} from 'react';
import {blue} from '@mui/material/colors';
import {ApiType} from '@/type/api';
import {FeedbackContext} from '@/context/FeedbackProvider';


const LoginDialog = ({ openLoginDialog, handleCloseLoginDialog }: { openLoginDialog: boolean, handleCloseLoginDialog: () => void, }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { toggleBackdrop, toggleAlert, handleSetAlertMessage } = useContext(FeedbackContext);

  const handleLogin = async () => {
    if (email !== '' && password !== '') {
      if (toggleBackdrop) toggleBackdrop();

      const formBody: { [n: string]: string } = { email: email, password: password, }
      const encodedFormBody = Object.keys(formBody).map((key: string) => encodeURIComponent(key) + '=' + encodeURIComponent(formBody[key])).join('&');

      const fetchResult = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`, {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', },
        body: encodedFormBody,
      });

      const apiResult: ApiType<{ access_token: string, refresh_token: string, }> = await fetchResult.json();
      if (apiResult.code === 200) {
        if (handleSetAlertMessage) handleSetAlertMessage({ severity: 'success', message: 'Login succeed, redirect to dashboard', });
        window.location.href = ('http://localhost:3000/dashboard');
      } else {
        if (handleSetAlertMessage) handleSetAlertMessage({ severity: 'error', message: 'Email or password is wrong', });
      }

      if (toggleBackdrop) toggleBackdrop();
    } else {
      if (handleSetAlertMessage) handleSetAlertMessage({ severity: 'warning', message: 'Email or password can not be empty', });
    }

    if (toggleAlert) toggleAlert();
  }

  const handleLoginOnEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter' || e.which === 13) {
      handleLogin();
    }
  }

  return (
    <Dialog open={openLoginDialog} onClose={handleCloseLoginDialog} maxWidth='xs' fullScreen={useMediaQuery('(max-width: 599px)')}>
      <Box sx={{ maxWidth: '400px', mx: 'auto' }}>
        <DialogTitle sx={{ p: '24px 24px 0', }}>
          <Avatar sx={{ mx: 'auto', mb: 1.5, bgcolor: blue['500'], }}>
            <LockOutlined sx={{ color: 'white', }} />
          </Avatar>
          <Typography gutterBottom sx={{ textAlign: 'center', fontWeight: '600', fontSize: '24px', }}>Login</Typography>
          <Typography align='center'>Welcome, hope you have an amazing day, enjoy your online meetings with Virtualica</Typography>
        </DialogTitle>
        <DialogContent sx={{ flexGrow: '0', p: '24px !important', }}>
          <TextField
            fullWidth label='Email Address' variant='outlined' onKeyDown={handleLoginOnEnter}
            value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2, }}
          />
          <TextField
            fullWidth label='Password' variant='outlined' type='password' onKeyDown={handleLoginOnEnter}
            value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 1, }}
          />
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
    </Dialog>
  );
}

export default LoginDialog;
