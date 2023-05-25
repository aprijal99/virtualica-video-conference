import {Box, Button, Typography} from '@mui/material';
import {blue, grey} from '@mui/material/colors';
import {VideoCallOutlined, VideocamOutlined} from '@mui/icons-material';

const DashboardRooms = () => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 70px - 48px)', maxWidth: '1000px', mx: 'auto', display: 'grid', gridTemplateRows: '1fr 1fr', rowGap: '24px',
        '@media (min-width: 700px)': { gridTemplateRows: '1fr', gridTemplateColumns: '1.3fr 1.7fr', columnGap: '24px' },
      }}
    >
      <Box display='flex' flexDirection='column' sx={{ borderRadius: '10px', overflow: 'hidden', }}>
        <Box
          id='room-list' display='flex' justifyContent='space-between' alignItems='center' columnGap='10px'
          sx={{ p: 3, bgcolor: blue['500'], position: 'relative', overflow: 'hidden', }}
        >
          <Typography variant='h6' sx={{ fontWeight: '500', zIndex: 5, }}>Room List</Typography>
          <Button
            variant='contained' size='small' startIcon={<VideoCallOutlined />}
            sx={{ zIndex: 5, textTransform: 'none', boxShadow: 'none', ':hover': { boxShadow: 'none', bgcolor: blue['600'], }, }}
          >
            Create
          </Button>
        </Box>
        <Box flexGrow='1' sx={{ borderRadius: '0 0 10px 10px', border: `1px solid ${grey['800']}`, borderTop: 'none', }}>
          <Box display='flex' alignItems='center' columnGap='10px' justifyContent='center' sx={{ height: '100%', }}>
            <VideocamOutlined sx={{ color: grey.A400, }} />
            <Typography sx={{ fontSize: '14px', color: grey.A400, }}>You haven't created a room</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ borderRadius: '10px', overflow: 'hidden', }}>
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' rowGap='20px' sx={{ height: '100%', }}>
          <img src='/room-detail.png' alt='room detail' style={{ maxWidth: '200px', }} />
          <Typography sx={{ fontSize: '14px', color: grey.A400, }}>Click the room to show the detail</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardRooms;
