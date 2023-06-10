import {Avatar, Box, IconButton, InputAdornment, TextField, Typography} from '@mui/material';
import {Close, MoreVert, Search, Send} from '@mui/icons-material';
import {grey} from '@mui/material/colors';
import React from 'react';

const RoomMessage = () => {
  return (
    <Box
      display='flex' flexDirection='column'
      sx={{ p: 3, overflow: 'hidden', minWidth: '350px', maxWidth: '350px', height: '100%', bgcolor: 'white', color: 'black', ml: 2, borderRadius: '10px', }}
    >
      <Box display='flex' alignItems='center' justifyContent='space-between' sx={{ mb: 3, }}>
        <Typography variant='h6' sx={{ fontWeight: '400', }}>Messages</Typography>
        <Close sx={{ cursor: 'pointer', }} />
      </Box>

      <Typography align='center' sx={{ bgcolor: grey['200'], fontSize: '.8rem', p: 1, borderRadius: '5px', mb: 3, }}>
        Messages can only be seen by people in the call and are deleted when the call ends
      </Typography>

      <Box
        sx={{
          maxHeight: '100%', height: '100%', overflowX: 'hidden', overflowY: 'auto',
          scrollbarWidth: 'thin', position: 'relative', mx: -3,
        }}
      >
        <Box sx={{ display: 'block', position: 'absolute', width: '100%', pl: 3, pr: 2, }}>

        </Box>
      </Box>

      <TextField
        fullWidth={true} autoComplete='off' placeholder='Send a message'
        sx={{
          mt: 3,
          'input': { color: 'black', fontSize: '.9rem', },
          '.MuiInputBase-root': {
            borderRadius: '30px', pl: 1, bgcolor: grey['200'],
            '& > fieldset': { borderColor: grey['200'], },
            '&:hover fieldset': { borderColor: grey['200'], },
          },
          '& .MuiOutlinedInput-root.Mui-focused': {
            '& > fieldset': { borderColor: grey['200'], },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Send sx={{ fontSize: '22px', color: '#8b8b8b', cursor: 'pointer', }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  )
}

export default RoomMessage;
