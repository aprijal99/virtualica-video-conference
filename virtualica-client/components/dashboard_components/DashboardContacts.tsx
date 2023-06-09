import {Box, Button, InputAdornment, TextField, Typography} from '@mui/material';
import {grey} from '@mui/material/colors';
import {PersonAddAlt, PersonOutlined, Search} from '@mui/icons-material';

const DashboardContacts = () => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 70px - 48px)', maxWidth: '1000px', mx: 'auto', display: 'grid', gridTemplateRows: '1fr',
        '@media (min-width: 600px)': { gridTemplateRows: '1fr', gridTemplateColumns: '1fr 1fr', },
        '@media (min-width: 700px)': { gridTemplateRows: '1fr', gridTemplateColumns: '1.3fr 1.7fr', },
      }}
    >
      <Box display='flex' flexDirection='column'>
        <Box
          id='contact-list' display='flex' justifyContent='space-between' alignItems='center' columnGap='10px'
          sx={{
            p: 3, position: 'relative', overflow: 'hidden', borderRadius: '10px 10px 0 0',
            background: 'linear-gradient(100.66deg, rgb(67, 67, 67) 6.56%, rgb(0, 0, 0) 93.57%)',
            '@media (min-width: 600px)': { borderTopRightRadius: '0', },
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: '500', zIndex: 5, }}>Contact List</Typography>
          <Button
            variant='contained' size='small' startIcon={<PersonAddAlt />}
            sx={{ zIndex: 5, textTransform: 'none', boxShadow: 'none', bgcolor: grey['700'], ':hover': { boxShadow: 'none', bgcolor: grey['800'], }, }}
          >
            Add
          </Button>
        </Box>
        <Box sx={{ p: 2, bgcolor: grey['900'], }}>
          <TextField
            fullWidth={true} autoComplete='off' placeholder='Search contact'
            sx={{
              'input': { py: 1, pr: 1, },
              '.MuiInputBase-root': { pl: 1.5, },
              '& .MuiOutlinedInput-root.Mui-focused': {
                '& > fieldset': { borderColor: grey['800'], },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start' >
                  <Search sx={{ fontSize: '22px', color: '#8b8b8b', }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box flexGrow='1' sx={{ bgcolor: grey['900'], borderRadius: '0 0 10px 10px', '@media (min-width: 600px)': { borderBottomRightRadius: '0', }, }}>
          <Box display='flex' alignItems='center' columnGap='10px' justifyContent='center' sx={{ height: '100%', }}>
            <PersonOutlined sx={{ color: grey.A400, }} />
            <Typography sx={{ fontSize: '14px', color: grey.A400, }}>You haven't had a contact</Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          overflow: 'hidden', borderRadius: '0 10px 10px 0', border: `1px solid ${grey['800']}`, borderLeft: 'none', display: 'none',
          '@media (min-width: 600px)': { display: 'initial', },
        }}
      >
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' rowGap='20px' sx={{ height: '100%', }}>
          <img src='/contact.png' alt='room detail' style={{ maxWidth: '200px', }} />
          <Typography align='center' sx={{ fontSize: '14px', color: grey.A400, maxWidth: '200px', }}>
            Send messages and invitations to your contacts
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardContacts;
