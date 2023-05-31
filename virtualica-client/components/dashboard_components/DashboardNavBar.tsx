import {AppBar, Avatar, Box, Divider, Link, Menu, Toolbar, Typography} from '@mui/material';
import {
  Home,
  HomeOutlined, Logout,
  PermContactCalendar,
  PermContactCalendarOutlined, Settings,
  Videocam,
  VideocamOutlined
} from '@mui/icons-material';
import {blue, grey, red} from '@mui/material/colors';
import React, {useContext} from 'react';
import {UserContext} from '@/context/UserProvider';

const DashboardNavBar = ({ tabValue, changeTab }: { tabValue: number, changeTab: (n: number) => void, }) => {
  const { userData } = useContext(UserContext);
  const menu = ['Home', 'Rooms', 'Contacts'];

  const profileMenu = ['Settings', 'Sign Out'];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement | undefined>(null);
  const openProfileMenu = Boolean(anchorEl);
  const handleOpenProfileMenu = (event: React.MouseEvent<HTMLDivElement>) => setAnchorEl(event.currentTarget);
  const handleCloseProfileMenu = () => setAnchorEl(null);

  return (
    <AppBar component='nav' position='static' sx={{ backgroundImage: 'none', boxShadow: 'none', bgcolor: grey['900'], }}>
      <Toolbar sx={{ minHeight: '70px', padding: '0 24px', '@media (min-width: 600px)': { minHeight: '70px', }, }}>
        <Box display='flex' alignItems='center' sx={{ width: '100%', maxWidth: '1000px', mx: 'auto', }}>
          {/* LOGO */}
          <Box display='flex' alignItems='center' flexBasis='33.33%'>
            <Link href='/' className='prevent-highlight-on-click' sx={{ display: 'flex', }}>
              <img src='/virtualica.png' alt='logo' style={{ width: '30px', marginRight: '10px', }} />
            </Link>
            <Typography variant='h6' component='div' display='none' sx={{ fontWeight: 'bold', '@media (min-width: 600px)': { display: 'initial', }, }}>Dashboard</Typography>
          </Box>

          {/* CENTER MENU */}
          <Box display='flex' justifyContent='center' flexBasis='33.33%'>
            {menu.map((m, idx) => (
              <Box
                key={idx} className='prevent-highlight-on-click' display='flex' flexDirection='column' alignItems='center'
                sx={{ cursor: 'pointer', minWidth: '60px', }} onClick={() => changeTab(idx)}
              >
                {m === menu[0] && (tabValue === idx ? <Home color='primary' /> : <HomeOutlined sx={{ color: grey['400'], }} />)}
                {m === menu[1] && (tabValue === idx ? <Videocam color='primary' />: <VideocamOutlined sx={{ color: grey['400'], }} />)}
                {m === menu[2] && (tabValue === idx ? <PermContactCalendar color='primary' /> : <PermContactCalendarOutlined sx={{ color: grey['400'], }} />)}
                <Typography sx={{ fontSize: '12px', mt: .5, color: tabValue === idx ? blue['500'] : grey['400'], }}>{m}</Typography>
              </Box>
            ))}
          </Box>

          {/* PROFILE BUTTON */}
          <Box display='flex' justifyContent='end' flexBasis='33.33%'>
            <Box onClick={handleOpenProfileMenu}>
              <Avatar
                className='prevent-highlight-on-click' variant='rounded' children={<Typography sx={{ color: 'white', }}>{userData.name[0]}</Typography>}
                sx={{ bgcolor: blue['500'], width: '30px', height: '30px', borderRadius: '10px', cursor: 'pointer', }}
              />
            </Box>
          </Box>

          {/*PROFILE MENU */}
          <Menu
            open={openProfileMenu} anchorEl={anchorEl} onClose={handleCloseProfileMenu}
            sx={{ top: '10px', '.MuiList-root': { px: 1, }, }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
            transformOrigin={{ vertical: 'top', horizontal: 'right', }}
          >
            <Box
              className='prevent-highlight-on-click' onClick={handleCloseProfileMenu}
              display='flex' flexDirection='column' columnGap='10px'
              sx={{ minHeight: 'initial', px: 1, py: '6px', }}
            >
              <Typography sx={{ fontSize: '.95rem', fontWeight: '800', }}>{userData.name}</Typography>
              <Typography sx={{ fontSize: '.9rem', fontWeight: '300', }}>{userData.email}</Typography>
            </Box>
            <Divider sx={{ my: 1, }} />
            {profileMenu.map((val, idx) => (
              <Box
                key={idx} className='prevent-highlight-on-click'
                display='flex' justifyContent='start' alignItems='center' columnGap='10px'
                onClick={idx === 0 ? handleCloseProfileMenu : () => {
                  const logoutForm = document.getElementById('logoutForm') as HTMLFormElement;
                  logoutForm.submit();
                  handleCloseProfileMenu();
                }}
                sx={{
                  minHeight: 'initial', px: 1, py: '6px', cursor: 'pointer',
                  borderRadius: '4px', ':hover': { bgcolor: grey['800'], },
                }}
              >
                {idx === 0 ? <Settings fontSize='small' /> : <Logout fontSize='small' color='error' />}
                <Typography sx={{ fontSize: '.9rem', color: idx === 1 ? red.A400 : 'white', }}>{val}</Typography>
              </Box>
            ))}
            <form id='logoutForm' action='/dashboard' method='POST' style={{ visibility: 'hidden', }}></form>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default DashboardNavBar;
