import {AppBar, Box, Button, IconButton, Link, Menu, Toolbar, Typography} from '@mui/material';
import {GitHub, HelpOutline, KeyboardArrowLeft, KeyboardArrowRight, LinkedIn, MenuOutlined} from '@mui/icons-material';
import React, {useState} from 'react';
import {grey} from '@mui/material/colors';

const Index = () => {
  const menu = ['About', 'GitHub'];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement | undefined>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ maxWidth: '1000px', m: '0 auto', }}>
      <AppBar component='nav' position='static' sx={{ backgroundImage: 'none', boxShadow: 'none', }}>
        <Toolbar sx={{ minHeight: '80px', padding: '0 24px', '@media (min-width: 600px)': { minHeight: '80px', }, }}>
          <Box flexGrow='1' display='flex' alignItems='center'>
            <img src='/virtualica.png' alt='logo' style={{ width: '30px', marginRight: '10px', }} />
            <Typography variant='h6' component='div' sx={{ fontWeight: 'bold', }} >Virtualica</Typography>
          </Box>
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
          <Button
            variant='outlined' size='small'
            sx={{
              textTransform: 'none', color: 'white', borderColor: 'white',
              ':hover': { borderColor: 'white', bgcolor: 'initial', },
            }}
          >
            Login
          </Button>
          <Box display='flex' onClick={handleClick}>
            <MenuOutlined
              className='prevent-highlight-on-click'
              sx={{ ml: 1.5, cursor: 'pointer', '@media (min-width: 600px)': { display: 'none', }, }}
            />
          </Box>
          <Menu
            open={open} anchorEl={anchorEl} onClose={handleClose}
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

      <Box
        sx={{
          px: '24px', my: 3,
          '@media (min-width: 460px)': { mt: 5, },
          '@media (min-width: 530px)': { mt: 7, },
          '@media (min-width: 600px)': { mt: 9, },
        }}
      >
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
            One platform to <span style={{ color: '#199bf1', }}>connect</span>, <span style={{ color: '#199bf1', }}>create</span>,
            and <span style={{ color: '#199bf1', }}>innovate</span>
          </Typography>
          <Typography
            gutterBottom={true} align='center'
            sx={{ mt: 3, color: grey['400'], '@media (min-width: 600px)': { fontSize: '18px', }, }}
          >
            Bring teams together, reimagine workspaces, engage new audiences, and delight your customers -
            all on the <span style={{ color: '#199bf1', }}>Virtualica</span> platform you know and love
          </Typography>
        </Box>

        <Carousel />

        <Typography
          align='center' gutterBottom={true}
          sx={{ mt: 10, fontWeight: '300', }}
        >
          Created by <Link underline='none' target='_blank' href='https://www.aprijal-ghiyas.tech'>
          Aprijal Ghiyas Setiawan</Link>
        </Typography>
        <Box display='flex' justifyContent='center' columnGap='10px'>
          <Link target='_blank' href='https://github.com/aprijal99'><GitHub sx={{ color: 'white', }} /></Link>
          <Link target='_blank' href='https://www.linkedin.com/in/aprijalghiyas/'><LinkedIn sx={{ color: 'white', }} /></Link>
        </Box>
      </Box>
    </Box>
  );
}

const Carousel = () => {
  const text = [
    ['online-meeting.png', 'Connect with Virtualica', 'Enjoy video calls with friends and families or work meetings without any time limitation'],
    ['share-link.png', 'Get a link to share', 'Easy to get and share a link you can send to people you want to meet with'],
    ['schedule.png', 'Plan ahead', 'Create schedule meetings and send invites to participants'],
    ['secure.png', 'The meeting is safe', 'No one can join a meeting unless invited or admitted by the host'],
  ];
  const [textIdx, setTextIdx] = useState<number>(0);

  return (
    <Box
      display='flex'
      sx={{
        mt: 5, maxWidth: '450px', mx: 'auto',
        '@media (min-width: 460px)': { mt: 6.5, },
        '@media (min-width: 530px)': { mt: 8, },
        '@media (min-width: 600px)': { mt: 10, },
      }}
    >
      <Box display='flex' alignItems='center'>
        <IconButton disabled={textIdx === 0} onClick={() => setTextIdx(prevState => prevState - 1)}>
          <KeyboardArrowLeft />
        </IconButton>
      </Box>
      <Box sx={{ mx: 1, }}>
        <img src={`/${text[textIdx][0]}`} alt='online meeting' style={{ width: '100%', }} />
        <Typography align='center' gutterBottom sx={{ fontSize: '20px',  mt: 2, '@media (min-width: 460px)': { fontSize: '24px', }, }}>
          {text[textIdx][1]}
        </Typography>
        <Typography align='center' sx={{ fontWeight: '300', fontSize: '14px', }}>
          {text[textIdx][2]}
        </Typography>
      </Box>
      <Box display='flex' alignItems='center'>
        <IconButton disabled={textIdx === 3} onClick={() => setTextIdx(prevState => prevState + 1)}>
          <KeyboardArrowRight />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Index;
