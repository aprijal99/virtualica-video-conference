import {Box, Typography} from '@mui/material';
import {useEffect, useState} from 'react';

const DateTime = () => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, []);

  return (
    <Box sx={{ width: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate3d(-50%, -50%, 0)'}}>
      <Typography variant='h4' align='center'>{date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, })}</Typography>
      <Typography align='center' sx={{ fontSize: '14px', }}>{date.toLocaleString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric', })}</Typography>
    </Box>
  );
}

export default DateTime;
