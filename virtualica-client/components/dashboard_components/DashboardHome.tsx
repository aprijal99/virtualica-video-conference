import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import {AddBox, ArrowDropDown, ArrowRight, CalendarMonth, Event, Login} from '@mui/icons-material';
import {blue, grey} from '@mui/material/colors';
import DateTime from '@/components/dashboard_components/DateTime';
import React from 'react';

const DashboardHome = () => {
  const buttons = ['Create', 'Schedule', 'Join'];
  const recentMessages = [
    ['Aprijal Ghiyas Setiawan', 'https://i.pravatar.cc/150?u=123', 'Brunch this weekend?', ' — I\'ll be in your neighborhood doing errands this…'],
    ['Ainun Nisa', 'https://i.pravatar.cc/150?u=234', 'Summer BBQ', ' — Wish I could come, but I\'m out of town this…'],
    ['Deki Geraldi', 'https://i.pravatar.cc/150?u=345', 'Oui Oui', ' — Do you have Paris recommendations? Have you ever…'],
    ['Irsyad Ibadurrahman', 'https://i.pravatar.cc/150?u=456', 'Club Meeting', ' — I think we should do online meeting to discuss about next week activity…'],
  ];

  return (
    <Box
      sx={{
        maxWidth: '1000px', mx: 'auto', display: 'grid', gridTemplateRows: 'auto auto auto', rowGap: '24px',
        '@media (min-width: 600px)': { gridTemplateColumns: '140px calc(50% - 164px) 1fr', gridTemplateRows: 'auto auto', columnGap: '24px' },
      }}
    >
      <Box
        sx={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px',
          '@media (min-width: 600px)': { gridTemplateColumns: '1fr', gridTemplateRows: 'auto auto auto', gridColumn: '1 / 2' },
        }}
      >
        {buttons.map((btn, idx) => (
          <Box key={idx} display='flex' flexDirection='column' sx={{ aspectRatio: '1/1'}}>
            <Button
              variant='outlined'
              sx={{
                height: '100%', p: 0, borderRadius: '10px', borderColor: grey['800'], color: grey['400'],
                flexDirection: 'column', rowGap: '5px', textTransform: 'none',
                ':hover': { bgcolor: 'initial', color: blue['500'], },
              }}
            >
              {btn === buttons[0] && <AddBox sx={{ fontSize: '38px', }} />}
              {btn === buttons[1] && <Event sx={{ fontSize: '38px', }} />}
              {btn === buttons[2] && <Login sx={{ fontSize: '38px', }} />}
              {btn}
            </Button>
          </Box>
        ))}
      </Box>

      <Box
        display='flex' flexDirection='column'
        sx={{ borderRadius: '10px', overflow: 'hidden', '@media (min-width: 600px)': { gridColumn: '2 / span 2', }, }}
      >
        <Box sx={{ position: 'relative', }}>
          <Box
            sx={{
              width: '100%', height: '130px', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', opacity: 0.5,
              backgroundImage: 'url(https://images.unsplash.com/photo-1683669260701-2a12766c2bb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTI1MDl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODQ5MjAxNzV8&ixlib=rb-4.0.3&q=80&w=1080)',
            }}
          />
          <DateTime />
        </Box>
        <Box
          display='flex' justifyContent='center' alignItems='center' flexGrow='1'
          sx={{ p:2, minHeight: '300px', borderRadius: '0 0 10px 10px', border: `1px solid ${grey['800']}`, borderTop: 'none', }}
        >
          <Box display='flex' columnGap='10px'>
            <CalendarMonth fontSize='small' sx={{ color: grey['400'], }} />
            <Typography sx={{ fontSize: '14px', color: grey['400'], }}>There is no upcoming meetings</Typography>
          </Box>
        </Box>
      </Box>

      <Box
        display='flex' flexDirection='column'
        sx={{ borderRadius: '10px', overflow: 'hidden', '@media (min-width: 600px)': { gridColumn: '1 / span 3', }, }}
      >
        <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ bgcolor: grey['900'], p: 2, }}>
          <Typography variant='h6' sx={{ fontWeight: '500', display: 'flex', alignItems: 'center', cursor: 'pointer', }}>
            Recent Messages
            <ArrowRight />
          </Typography>
          <Box display='flex' sx={{ cursor: 'pointer', }}>
            10
            <ArrowDropDown />
          </Box>
        </Box>
        <List
          sx={{
            width: '100%', borderRadius: '0 0 10px 10px', border: `1px solid ${grey['800']}`, borderTop: 'none',
            maxHeight: '300px', position: 'relative', overflowY: 'overlay', scrollbarWidth: 'none',
            '::-webkit-scrollbar': { width: '5px', },
            '::-webkit-scrollbar-thumb': { borderRadius: '5px', visibility: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.3)', },
            ':hover': { '::-webkit-scrollbar-thumb': { visibility: 'visible', }, scrollbarWidth: 'thin', },
          }}
        >
          {recentMessages.map((msg, idx) => (<Box key={idx}>
            <ListItemButton alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar alt={msg[0]} src={msg[1]} />
              </ListItemAvatar>
              <ListItemText
                primary={msg[2]}
                secondary={
                  <React.Fragment>
                    <Typography
                      component='span'
                      variant='body2'
                      color='text.primary'
                      sx={{ display: 'inline', }}
                    >
                      {msg[0]}
                    </Typography>
                    {msg[3]}
                  </React.Fragment>
                }
              />
            </ListItemButton>
            {idx !== recentMessages.length - 1 && <Divider variant="inset" component="li" />}
          </Box>))}
        </List>
      </Box>
    </Box>
  );
}

export default DashboardHome;
