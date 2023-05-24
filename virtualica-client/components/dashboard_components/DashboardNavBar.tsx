import {AppBar, Box, Toolbar, Typography} from '@mui/material';
import React, {useState} from 'react';
import {
  Home,
  HomeOutlined,
  PermContactCalendar,
  PermContactCalendarOutlined,
  Videocam,
  VideocamOutlined
} from '@mui/icons-material';

const DashboardNavBar = () => {
  const menu = ['Home', 'Meetings', 'Contacts'];
  const [tabValue, setTabValue] = useState(0);

  return (
    <AppBar component='nav' position='fixed' sx={{ backgroundImage: 'none', boxShadow: 'none', }}>
      <Toolbar sx={{ justifyContent: 'center', columnGap: '20px', minHeight: '80px', padding: '0 24px', '@media (min-width: 600px)': { minHeight: '80px', }, }}>
        {menu.map((m, idx) => (
          <Box
            key={idx} className='prevent-highlight-on-click' display='flex' flexDirection='column' alignItems='center'
            sx={{ cursor: 'pointer', }} onClick={() => setTabValue(idx)}
          >
            {m === menu[0] && (tabValue === idx ? <Home color='primary' /> : <HomeOutlined />)}
            {m === menu[1] && (tabValue === idx ? <Videocam color='primary' />: <VideocamOutlined />)}
            {m === menu[2] && (tabValue === idx ? <PermContactCalendar color='primary' /> : <PermContactCalendarOutlined />)}
            <Typography sx={{ fontSize: '12px', mt: .5, color: tabValue === idx ? '#199bf1' : 'white' }}>{m}</Typography>
          </Box>
        ))}
      </Toolbar>
    </AppBar>
  );
}

export default DashboardNavBar;
