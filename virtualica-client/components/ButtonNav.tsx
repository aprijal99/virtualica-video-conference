import {Avatar, Box, Typography} from '@mui/material';
import {grey, red} from '@mui/material/colors';
import {
  BackHandOutlined,
  CallEnd, ErrorOutline,
  KeyboardVoice,
  MessageOutlined,
  MoreVert, PeopleAltOutlined,
  VideocamOutlined
} from '@mui/icons-material';

const ButtonNav = () => {
  return (
    <Box
      display='flex' justifyContent='center' alignItems='center' columnGap='20px'
      sx={{
        my: 3, '@media (min-width: 600px)': { justifyContent: 'space-between', },
        '@media (min-width: 900px)': { mx: 2, },
      }}
    >
      <Box display='none' flexBasis='33.333%' sx={{ overflow: 'hidden', '@media (min-width: 600px)': { display: 'flex', }, }}>
        <Box display='flex' sx={{ overflow: 'hidden', }}>
          <Typography sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', }}>
            Team Meeting
          </Typography>
        </Box>
      </Box>

      <Box flexBasis='33.333%' display='flex' justifyContent='center' columnGap='10px'>
        <Avatar className='prevent-highlight-on-click' sx={{ bgcolor: red.A400, cursor: 'pointer', }}>
          <CallEnd sx={{ color: 'white', }} />
        </Avatar>
        <Avatar className='prevent-highlight-on-click' sx={{ bgcolor: grey['800'], cursor: 'pointer', }}>
          <VideocamOutlined sx={{ color: 'white', }} />
        </Avatar>
        <Avatar className='prevent-highlight-on-click' sx={{ bgcolor: grey['800'], cursor: 'pointer', }}>
          <KeyboardVoice sx={{ color: 'white', }} />
        </Avatar>
        <Avatar className='prevent-highlight-on-click' sx={{ bgcolor: grey['800'], cursor: 'pointer', }}>
          <BackHandOutlined sx={{ color: 'white', }} />
        </Avatar>
        <Avatar className='prevent-highlight-on-click' sx={{ bgcolor: grey['800'], cursor: 'pointer', '@media (min-width: 600px)': { display: 'none', }, }}>
          <MoreVert sx={{ color: 'white', }} />
        </Avatar>
      </Box>

      <Box
        display='flex' columnGap='20px' flexBasis='33.333%' justifyContent='end'
        sx={{ display: 'none', '@media (min-width: 600px)': { display: 'flex', }, }}
      >
        <MessageOutlined sx={{ color: 'white', cursor: 'pointer', }} />
        <PeopleAltOutlined sx={{ color: 'white', cursor: 'pointer', }} />
        <ErrorOutline sx={{ color: 'white', cursor: 'pointer', }} />
      </Box>
    </Box>
  );
}

export default ButtonNav;
