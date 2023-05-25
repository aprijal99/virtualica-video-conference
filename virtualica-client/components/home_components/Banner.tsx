import {Box, Typography} from '@mui/material';
import {blue, grey} from '@mui/material/colors';
import React from 'react';

const Banner = () => {
  return (
    <Box sx={{ maxWidth: '600px', mx: 'auto', }}>
      <Typography
        align='center' gutterBottom={true}
        sx={{
          fontSize: '28px', lineHeight: '2.3rem', fontWeight: '700',
          '@media (min-width: 460px)': { fontSize: '35px', lineHeight: '3rem', },
          '@media (min-width: 530px)': { fontSize: '42px', lineHeight: '3.4rem', },
          '@media (min-width: 600px)': { fontSize: '48px', lineHeight: '3.8rem', },
        }}
      >
        One platform to <span style={{ color: blue['500'], }}>connect</span>, <span style={{ color: blue['500'], }}>create</span>,
        and <span style={{ color: blue['500'], }}>innovate</span>
      </Typography>
      <Typography
        gutterBottom={true} align='center'
        sx={{ mt: 3, color: grey['400'], '@media (min-width: 600px)': { fontSize: '18px', }, }}
      >
        Bring teams together, reimagine workspaces, engage new audiences, and delight your customers -
        all on the <span style={{ color: blue['500'], }}>Virtualica</span> platform you know and love
      </Typography>
    </Box>
  );
}

export default Banner;
