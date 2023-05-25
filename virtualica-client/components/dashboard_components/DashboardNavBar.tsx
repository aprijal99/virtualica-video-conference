import {AppBar, Avatar, Box, Link, Toolbar, Typography} from '@mui/material';
import React, {useState} from 'react';
import {
  Home,
  HomeOutlined,
  PermContactCalendar,
  PermContactCalendarOutlined,
  Videocam,
  VideocamOutlined
} from '@mui/icons-material';
import {blue, grey} from '@mui/material/colors';

const DashboardNavBar = () => {
  const menu = ['Home', 'Rooms', 'Contacts'];
  const [tabValue, setTabValue] = useState(0);

  return (
    <AppBar component='nav' position='static' sx={{ backgroundImage: 'none', boxShadow: 'none', bgcolor: grey['900'], }}>
      <Toolbar sx={{ minHeight: '70px', padding: '0 24px', '@media (min-width: 600px)': { minHeight: '70px', }, }}>
        <Box display='flex' alignItems='center' sx={{ width: '100%', maxWidth: '1000px', mx: 'auto', }}>
          <Box display='flex' alignItems='center' flexBasis='33.33%'>
            <Link href='/' className='prevent-highlight-on-click' sx={{ display: 'flex', }}>
              <img src='/virtualica.png' alt='logo' style={{ width: '30px', marginRight: '10px', }} />
            </Link>
            <Typography variant='h6' component='div' display='none' sx={{ fontWeight: 'bold', '@media (min-width: 600px)': { display: 'initial', }, }}>Dashboard</Typography>
          </Box>

          <Box display='flex' justifyContent='center' flexBasis='33.33%'>
            {menu.map((m, idx) => (
              <Box
                key={idx} className='prevent-highlight-on-click' display='flex' flexDirection='column' alignItems='center'
                sx={{ cursor: 'pointer', minWidth: '60px', }} onClick={() => setTabValue(idx)}
              >
                {m === menu[0] && (tabValue === idx ? <Home color='primary' /> : <HomeOutlined sx={{ color: grey['400'], }} />)}
                {m === menu[1] && (tabValue === idx ? <Videocam color='primary' />: <VideocamOutlined sx={{ color: grey['400'], }} />)}
                {m === menu[2] && (tabValue === idx ? <PermContactCalendar color='primary' /> : <PermContactCalendarOutlined sx={{ color: grey['400'], }} />)}
                <Typography sx={{ fontSize: '12px', mt: .5, color: tabValue === idx ? blue['500'] : grey['400'], }}>{m}</Typography>
              </Box>
            ))}
          </Box>

          <Box display='flex' justifyContent='end' flexBasis='33.33%'>
            <Avatar
              className='prevent-highlight-on-click' variant='rounded' children={<Typography sx={{ color: 'white', }}>A</Typography>}
              sx={{ bgcolor: blue['500'], width: '30px', height: '30px', borderRadius: '10px', cursor: 'pointer', }}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default DashboardNavBar;
