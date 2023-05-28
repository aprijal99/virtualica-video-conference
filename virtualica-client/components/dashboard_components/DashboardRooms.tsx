import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import {blue, grey} from '@mui/material/colors';
import {
  ContentCopy,
  DeleteOutlined,
  EditOutlined,
  InfoOutlined, Link,
  VideoCallOutlined,
  VideocamOutlined
} from '@mui/icons-material';
import React from 'react';

const DashboardRooms = () => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 70px - 48px)', maxWidth: '1000px', mx: 'auto', display: 'grid', gridTemplateRows: '1fr 1fr', rowGap: '24px',
        '@media (min-width: 600px)': { gridTemplateRows: '1fr', gridTemplateColumns: '1fr 1fr', columnGap: '24px', },
        '@media (min-width: 700px)': { gridTemplateRows: '1fr', gridTemplateColumns: '1.3fr 1.7fr', columnGap: '24px', },
      }}
    >
      <Box display='flex' flexDirection='column' sx={{ borderRadius: '10px', overflow: 'hidden', }}>
        <Box
          id='room-list' display='flex' justifyContent='space-between' alignItems='center' columnGap='10px'
          sx={{ px: 3, bgcolor: blue['500'], position: 'relative', overflow: 'hidden', minHeight: '80px', }}
        >
          <Typography variant='h6' sx={{ fontWeight: '500', zIndex: 5, }}>Room List</Typography>
          <Button
            variant='contained' size='small' startIcon={<VideoCallOutlined />}
            sx={{ zIndex: 5, textTransform: 'none', boxShadow: 'none', ':hover': { boxShadow: 'none', bgcolor: blue['600'], }, }}
          >
            Create
          </Button>
        </Box>
        <Box
          flexGrow='1'
          sx={{
            borderRadius: '0 0 10px 10px', border: `1px solid ${grey['800']}`, borderTop: 'none', overflowY: 'overlay', scrollbarWidth: 'none',
            '::-webkit-scrollbar': { width: '5px', },
            '::-webkit-scrollbar-thumb': { borderRadius: '5px', visibility: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.3)', },
            ':hover': { '::-webkit-scrollbar-thumb': { visibility: 'visible', }, scrollbarWidth: 'thin', },
          }}
        >
          {/*<Box display='flex' alignItems='center' columnGap='10px' justifyContent='center' sx={{ height: '100%', }}>*/}
          {/*  <VideocamOutlined sx={{ color: grey.A400, }} />*/}
          {/*  <Typography sx={{ fontSize: '14px', color: grey.A400, }}>You haven't created a room</Typography>*/}
          {/*</Box>*/}

          <List>
            <ListItemButton>
              <ListItemText
                primary={<Typography sx={{ fontWeight: '600', }}>Biochemistry Group Discussion</Typography>}
                secondary='Room for discussion of Biochemistry Group 5'
              />
            </ListItemButton>
            <Divider  component="li" />
          </List>
        </Box>
      </Box>

      <Box sx={{ borderRadius: '10px', overflow: 'hidden', }}>
        {/*<Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' rowGap='20px' sx={{ height: '100%', }}>*/}
        {/*  <img src='/room-detail.png' alt='room detail' style={{ maxWidth: '200px', }} />*/}
        {/*  <Typography sx={{ fontSize: '14px', color: grey.A400, }}>Click the room to show the detail</Typography>*/}
        {/*</Box>*/}

        <Box>
          <Typography gutterBottom variant='h5' sx={{ fontWeight: '600', mb: 2, }}>Biochemistry Group Discussion</Typography>
          <Box display='flex' columnGap='10px' alignItems='center' sx={{ color: grey['400'], mb: 1, }}>
            <InfoOutlined fontSize='small' sx={{ mb: '2px', }} />
            <Typography>Room for discussion of Biochemistry Group 5</Typography>
          </Box>
          <Box display='flex' columnGap='10px' alignItems='center' sx={{ color: grey['400'], }}>
            <Link fontSize='small' sx={{ mb: '2px', transform: 'rotate(-45deg)', }} />
            <Typography>123e4567-e89b-12d3-a456-426614174000</Typography>
          </Box>

          <Box display='flex' columnGap='10px' rowGap='10px' flexWrap='wrap' sx={{ mt: 5, }}>
            <Button variant='contained' size='small' sx={{ textTransform: 'none', }}>Start</Button>
            <Button variant='outlined' size='small' startIcon={<ContentCopy />} sx={{ textTransform: 'none', }}>Copy Invitation</Button>
            <Button variant='outlined' size='small' startIcon={<EditOutlined />} sx={{ textTransform: 'none', }}>Edit</Button>
            <Button variant='outlined' size='small' startIcon={<DeleteOutlined />} color='error' sx={{ textTransform: 'none', }}>Delete</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardRooms;
