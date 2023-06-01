import {
  Accordion, AccordionDetails, AccordionSummary, Avatar,
  Box,
  Button, Checkbox,
  Divider,
  List, ListItem, ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import {blue, grey} from '@mui/material/colors';
import {
  AccessTime,
  ContentCopy,
  DeleteOutlined,
  EditOutlined, ExpandMore,
  InfoOutlined, Link, PeopleOutlined, PlayArrowOutlined, SendOutlined, StopOutlined,
  VideoCallOutlined,
  VideocamOutlined
} from '@mui/icons-material';
import React, {useContext, useEffect, useState} from 'react';
import CreateRoomDialog from '@/components/dashboard_components/CreateRoomDialog';
import {RoomContext, RoomType} from '@/context/RoomProvider';
import {ApiType} from '@/type/api';

const DashboardRooms = () => {
  const { roomList, selectedRoom, handleChangeSelectedRoom, handleChangeRoomStatus } = useContext(RoomContext);
  const [openCreateRoomDialog, setOpenCreateRoomDialog] = useState<boolean>(false);
  const [room, setRoom] = useState<RoomType | null>(null);

  useEffect(() => {
    if (selectedRoom !== '') {
      setRoom(roomList.filter((room) => room.roomId === selectedRoom)[0]);
    }
  }, [selectedRoom]);

  const startOrStopRoom = async () => {
    const fetchResult = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/room/${selectedRoom}/change-status`, {
      method: 'PUT',
    });
    const apiResult: ApiType = await fetchResult.json();

    if (apiResult.code === 200) {
      if (handleChangeRoomStatus) handleChangeRoomStatus(selectedRoom);

      if (room) {
        const updatedRoom: RoomType = {...room, roomStatus: !room.roomStatus}
        setRoom(updatedRoom);
      }
    }
  }

  return (
    <Box
      sx={{
        maxWidth: '1000px', mx: 'auto', display: 'grid', gridTemplateRows: 'auto auto', rowGap: '24px',
        '@media (min-width: 600px)': { height: 'calc(100vh - 70px - 48px)', gridTemplateRows: '1fr', gridTemplateColumns: '1fr 1fr', columnGap: '24px', },
        '@media (min-width: 700px)': { gridTemplateRows: '1fr', gridTemplateColumns: '1.3fr 1.7fr', columnGap: '24px', },
      }}
    >
      {/* ROOM LIST */}
      <Box display='flex' flexDirection='column' sx={{ borderRadius: '10px', overflow: 'hidden', minHeight: '50vh' }}>
        <Box
          id='room-list' display='flex' justifyContent='space-between' alignItems='center' columnGap='10px'
          sx={{ px: 3, bgcolor: blue['500'], position: 'relative', overflow: 'hidden', minHeight: '80px', }}
        >
          <Typography variant='h6' sx={{ fontWeight: '500', zIndex: 5, }}>Room List</Typography>
          <Button
            variant='contained' size='small' startIcon={<VideoCallOutlined />} onClick={() => setOpenCreateRoomDialog(true)}
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
          {roomList.length === 0 ?
            <Box display='flex' alignItems='center' columnGap='10px' justifyContent='center' sx={{ height: '100%', }}>
              <VideocamOutlined sx={{ color: grey.A400, }} />
              <Typography sx={{ fontSize: '14px', color: grey.A400, }}>You haven't created a room</Typography>
            </Box> :
            <List>
              {roomList.map((room, idx) => (
                <Box key={idx} onClick={() => handleChangeSelectedRoom && handleChangeSelectedRoom(room.roomId)}>
                  <ListItemButton className='item-button' selected={room.roomId === selectedRoom}>
                    <ListItemText
                      primary={<Typography sx={{ fontWeight: '600', }}>{room.roomName}</Typography>}
                      secondary={`Created at ${new Date(room.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', })}`}
                    />
                  </ListItemButton>
                  <Divider component="li" sx={{ width: '95%', mx: 'auto', }} />
                </Box>
              ))}
            </List>
          }
        </Box>
      </Box>

      {/* ROOM DETAIL*/}
      <Box
        sx={{
          overflowX: 'hidden', overflowY: 'overlay', scrollbarWidth: 'none',
          '::-webkit-scrollbar': { width: '5px', },
          '::-webkit-scrollbar-thumb': { borderRadius: '5px', visibility: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.3)', },
          ':hover': { '::-webkit-scrollbar-thumb': { visibility: 'visible', }, scrollbarWidth: 'thin', },
        }}
      >
        {room === null ?
          <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' rowGap='20px' sx={{ height: '100%', }}>
            <img src='/room-detail.png' alt='room detail' style={{ maxWidth: '200px', }} />
            <Typography sx={{ fontSize: '14px', color: grey.A400, }}>Click the room to show the detail</Typography>
          </Box> :
          <Box display='flex' flexDirection='column' sx={{ height: '100%', pr: 1, }}>
            <Typography gutterBottom variant='h5' sx={{ fontWeight: '600', mb: 2, }}>{room.roomName}</Typography>
            <Box display='flex' columnGap='10px' alignItems='center' sx={{ color: grey['400'], mb: 1, }}>
              <InfoOutlined fontSize='small' sx={{ mb: '2px', }} />
              <Typography>{room.roomDescription}</Typography>
            </Box>
            <Box display='flex' columnGap='10px' alignItems='center' sx={{ color: grey['400'], mb: 1, }}>
              <Link fontSize='small' sx={{ mb: '2px', transform: 'rotate(-45deg)', }} />
              <Typography>{room.roomId}</Typography>
            </Box>
            <Box display='flex' columnGap='10px' alignItems='center' sx={{ color: grey['400'], mb: 1, }}>
              <AccessTime fontSize='small' sx={{ mb: '2px', }} />
              <Typography>Created at {new Date(room.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', })}</Typography>
            </Box>
            <Box display='flex' columnGap='10px' alignItems='center' sx={{ color: grey['400'], mb: 1, }}>
              <PeopleOutlined fontSize='small' sx={{ mb: '2px', }} />
              <Typography>0 Contacts invited</Typography>
            </Box>

            <Box display='flex' columnGap='10px' rowGap='10px' flexWrap='wrap' sx={{ my: 5, }}>
              <Button
                variant='contained' size='small' color={room.roomStatus ? 'error' : 'primary'}
                startIcon={room.roomStatus ? <StopOutlined /> : <PlayArrowOutlined />}
                sx={{ textTransform: 'none', '.MuiButton-startIcon': { mr: .5, }, }}
                onClick={startOrStopRoom}
              >
                {room.roomStatus ? 'Stop' : 'Start'}
              </Button>
              <Button variant='outlined' size='small' startIcon={<ContentCopy />} sx={{ textTransform: 'none', }}>Copy Invitation</Button>
              <Button variant='outlined' size='small' startIcon={<EditOutlined />} sx={{ textTransform: 'none', }}>Edit</Button>
              <Button variant='outlined' size='small' startIcon={<DeleteOutlined />} color='error' sx={{ textTransform: 'none', }}>Delete</Button>
            </Box>

            <Box flexGrow='1'>
              <Accordion disableGutters sx={{ backgroundImage: 'none', boxShadow: 'none', }}>
                <AccordionSummary expandIcon={<ExpandMore />} sx={{ minHeight: '48px', px: 0, }}>
                  <Typography sx={{ fontWeight: '500', }}>Send Invitation to Contacts</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0, }}>
                  <List
                    sx={{
                      maxHeight: '280px', overflowX: 'hidden', overflowY: 'overlay', scrollbarWidth: 'none',
                      '::-webkit-scrollbar': { width: '5px', },
                      '::-webkit-scrollbar-thumb': { borderRadius: '5px', visibility: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.3)', },
                      ':hover': { '::-webkit-scrollbar-thumb': { visibility: 'visible', }, scrollbarWidth: 'thin', },
                    }}
                  >
                    {['Deki Geraldi', 'Ainun Nisa', 'Irsyad Ibadurrahman', 'Deki Geraldi', 'Ainun Nisa', 'Irsyad Ibadurrahman', 'Deki Geraldi', 'Ainun Nisa', 'Irsyad Ibadurrahman'].map((val, idx) => (
                      <ListItem
                        key={idx}
                        disablePadding
                        secondaryAction={
                          <Checkbox edge='end' />
                        }
                      >
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar src='https://i.pravatar.cc/150' alt='Contact profile picture' />
                          </ListItemAvatar>
                          <ListItemText primary={val} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                  <Box display='flex' justifyContent='flex-end' sx={{ mt: 3, }}>
                    <Button variant='contained' size='small' startIcon={<SendOutlined />} sx={{ textTransform: 'none', }}>Send</Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        }
      </Box>

      {/* CREATE ROOM DIALOG */}
      <CreateRoomDialog open={openCreateRoomDialog} close={() => setOpenCreateRoomDialog(false)} />
    </Box>
  );
}

export default DashboardRooms;
