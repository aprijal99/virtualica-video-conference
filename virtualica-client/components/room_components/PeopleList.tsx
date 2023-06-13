import {Avatar, Box, IconButton, InputAdornment, TextField, Typography} from '@mui/material';
import {MoreVert, Search} from '@mui/icons-material';
import {grey} from '@mui/material/colors';
import React from 'react';

const PeopleList = () => {
  return (
    <>
      <TextField
        fullWidth={true} autoComplete='off' placeholder='Search for people'
        sx={{
          mb: 2,
          'input': { py: 1, pr: 1, color: 'black', },
          '.MuiInputBase-root': {
            pl: 1.5,
            '& > fieldset': { borderColor: grey['400'], },
            '&:hover fieldset': { borderColor: grey['600'], },
          },
          '& .MuiOutlinedInput-root.Mui-focused': {
            '& > fieldset': { borderColor: grey['600'], },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search sx={{ fontSize: '22px', color: '#8b8b8b', cursor: 'pointer', }} />
            </InputAdornment>
          ),
        }}
      />

      <Box>
        <Typography sx={{ color: grey['700'], fontSize: '.95rem', mb: 1.5, }}>In Call</Typography>

        <Box display='flex' alignItems='center'>
          <Avatar src='https://i.pravatar.cc/150' alt='Contact profile picture' sx={{ mr: 2, }} />
          <Typography sx={{ flexGrow: '1', }}>Aprijal Ghiyas Setiawan</Typography>
          <IconButton color='secondary' edge='end'>
            <MoreVert sx={{ color: 'black', }} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default PeopleList;
