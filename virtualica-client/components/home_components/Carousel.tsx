import React, {useState} from 'react';
import {Box, IconButton, Typography} from '@mui/material';
import {KeyboardArrowLeft, KeyboardArrowRight} from '@mui/icons-material';

const Carousel = () => {
  const text = [
    ['online-meeting.png', 'Connect with Virtualica', 'Enjoy video calls with friends and families or work meetings without any time limitation'],
    ['share-link.png', 'Get a link to share', 'Easy to get and share a link you can send to people you want to meet with'],
    ['schedule.png', 'Plan ahead', 'Create schedule meetings and send invites to participants'],
    ['secure.png', 'The meeting is safe', 'No one can join a meeting unless invited or admitted by the host'],
  ];
  const [textIdx, setTextIdx] = useState<number>(0);

  return (
    <Box
      display='flex'
      sx={{
        mt: 5, maxWidth: '450px', mx: 'auto',
        '@media (min-width: 460px)': { mt: 6.5, },
        '@media (min-width: 530px)': { mt: 8, },
        '@media (min-width: 600px)': { mt: 10, },
      }}
    >
      <Box display='flex' alignItems='center'>
        <IconButton disabled={textIdx === 0} onClick={() => setTextIdx(prevState => prevState - 1)}>
          <KeyboardArrowLeft />
        </IconButton>
      </Box>
      <Box sx={{ mx: 1, }}>
        <img src={`/${text[textIdx][0]}`} alt='online meeting' style={{ width: '100%', }} />
        <Typography align='center' gutterBottom sx={{ fontSize: '20px',  mt: 2, '@media (min-width: 460px)': { fontSize: '24px', }, }}>
          {text[textIdx][1]}
        </Typography>
        <Typography align='center' sx={{ fontWeight: '300', fontSize: '14px', }}>
          {text[textIdx][2]}
        </Typography>
      </Box>
      <Box display='flex' alignItems='center'>
        <IconButton disabled={textIdx === 3} onClick={() => setTextIdx(prevState => prevState + 1)}>
          <KeyboardArrowRight />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Carousel;
