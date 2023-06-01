import {AppBar, Box, Button, Menu, Toolbar, Typography} from '@mui/material';
import {GitHub, HelpOutline, MenuOutlined} from '@mui/icons-material';
import {grey} from '@mui/material/colors';
import React, {useState} from 'react';
import LoginDialog from '@/components/home_components/LoginDialog';

const HomeNavBar = ({ isAuth }: { isAuth: boolean, }) => {
  const menu = ['About', 'GitHub'];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement | undefined>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);

  return (
    <AppBar component='nav' position='static' sx={{ backgroundImage: 'none', boxShadow: 'none', }}>
      <Toolbar sx={{ minHeight: '80px', padding: '0 24px', '@media (min-width: 600px)': { minHeight: '80px', }, }}>
        {/* TITLE */}
        <Box flexGrow='1' display='flex' alignItems='center'>
          <img src='/virtualica.png' alt='logo' style={{ width: '30px', marginRight: '10px', }} />
          <Typography variant='h6' component='div' sx={{ fontWeight: 'bold', }}>Virtualica</Typography>
        </Box>

        {/* MENU */}
        <Box display='none' columnGap='10px' sx={{ mr: 1.5, '@media (min-width: 600px)': { display: 'flex', }, }}>
          {menu.map((m, idx) => (
            <Button
              key={idx} disableRipple startIcon={m === 'About' ? <HelpOutline /> : <GitHub />}
              sx={{ color: 'white', textTransform: 'none', ':hover': { bgcolor: 'initial', }, }}
            >
              {m}
            </Button>
          ))}
        </Box>

        {/* LOGIN BUTTON */}
        {isAuth ?
          <Button
            variant='outlined' size='small' href='/dashboard'
            sx={{ textTransform: 'none', color: 'white', borderColor: 'white', ':hover': { borderColor: 'white', bgcolor: 'initial', }, }}
          >
            Dashboard
          </Button> :
          <Button
            variant='outlined' size='small' onClick={() => setOpenLoginDialog(true)}
            sx={{ textTransform: 'none', color: 'white', borderColor: 'white', ':hover': { borderColor: 'white', bgcolor: 'initial', }, }}
          >
            Login
          </Button>
        }
        <LoginDialog openLoginDialog={openLoginDialog} handleCloseLoginDialog={() => setOpenLoginDialog(false)} />

        {/* MOBILE MENU BUTTON*/}
        <Box display='flex' onClick={handleClick}>
          <MenuOutlined
            className='prevent-highlight-on-click'
            sx={{ ml: 1.5, cursor: 'pointer', '@media (min-width: 600px)': { display: 'none', }, }}
          />
        </Box>

        {/* MOBILE MENU */}
        <Menu
          open={openMenu} anchorEl={anchorEl} onClose={handleClose}
          sx={{ top: '15px', left: '-2px', '.MuiList-root': { px: 1, }, }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
          transformOrigin={{ vertical: 'top', horizontal: 'right', }}
        >
          {menu.map((m, idx) => (
            <Box
              key={idx} className='prevent-highlight-on-click' onClick={handleClose}
              display='flex' justifyContent='start' alignItems='center' columnGap='10px'
              sx={{
                minHeight: 'initial', fontSize: '.9rem', fontWeight: 'medium', px: 1, py: '6px', cursor: 'pointer',
                borderRadius: '4px', ':hover': { bgcolor: grey['800'], },
              }}
            >
              {m === 'About' ? <HelpOutline fontSize='small' /> : <GitHub fontSize='small' />}
              {m}
            </Box>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default HomeNavBar;
