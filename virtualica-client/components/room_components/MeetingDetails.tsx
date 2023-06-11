import {Box, Typography} from '@mui/material';
import {Close, ContentCopy} from '@mui/icons-material';
import {grey} from '@mui/material/colors';
import React from 'react';

const MeetingDetails = () => {
  return (
    <>
      <Box display='flex' alignItems='center' justifyContent='space-between' sx={{ mb: 3, }}>
        <Typography variant='h6' sx={{ fontWeight: '400', }}>Meeting Details</Typography>
        <Close sx={{ cursor: 'pointer', }} />
      </Box>

      <Box>
        <Typography gutterBottom sx={{ fontSize: '.95rem', }}>Joining info</Typography>
        <Typography sx={{ fontSize: '.9rem', color: grey['700'], lineHeight: '1.2rem', mb: 2, }}>https://virtualica.com/550e8400-e29b-41d4-a716-446655440000</Typography>
        <Box display='flex' alignItems='center' sx={{ cursor: 'pointer', }}>
          <ContentCopy color='primary' sx={{ mr: .5, fontSize: '20px', }} />
          <Typography color='primary' sx={{ fontSize: '.9rem', fontWeight: '500', }}>Copy joining info</Typography>
        </Box>
      </Box>
    </>
  );
}

export default MeetingDetails;
