import {Avatar, Box, Typography} from '@mui/material';
import {grey} from '@mui/material/colors';
import {MicOffOutlined} from '@mui/icons-material';
import nameToColor from '@/functions/nameToColor';
import {createRef, useEffect, useState} from 'react';

const Video = () => {
  return (
    <Box
      display='flex' alignItems='center' justifyContent='center' flexGrow='1'
      sx={{ bgcolor: grey['800'], borderRadius: '10px', position: 'relative', minHeight: '150px', minWidth: '266px', }}
    >
      <Avatar
        sx={{ height: '60px', width: '60px', bgcolor: nameToColor('Aprijal Ghiyas Setiawan'), }}
        children={<Typography sx={{ color: 'white', fontSize: '25px', }}>AG</Typography>}
      />
      <Typography
        sx={{
          fontSize: '15px', position: 'absolute', bottom: '10px', left: '10px', maxWidth: '75%',
          whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden',
      }}
      >
        Aprijal Ghiyas Setiawan
      </Typography>
      <Avatar sx={{ height: '25px', width: '25px', bgcolor: 'rgba(0, 0, 0, 0.3)', position: 'absolute', top: '10px', right: '10px', }}>
        <MicOffOutlined sx={{ fontSize: '18px', color: 'white', }} />
      </Avatar>
    </Box>
  );
}

const VideoContainer = () => {
  const [videos, setVideos] = useState<string[]>(['']);
  const videosWrapperRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (videosWrapperRef.current) {
      const videoMinHeight = 150;
      const videoMinWidth = 266;

      const wrapperHeight: number = videosWrapperRef.current.offsetHeight;
      const wrapperWidth: number = videosWrapperRef.current.offsetWidth;

      const rowNum = Math.floor(wrapperHeight / videoMinHeight);
      const colNum = Math.floor(wrapperWidth / videoMinWidth);


    }
  }, [videos]);

  return (
    <Box display='flex' flexDirection='column' flexGrow='1' sx={{ mt: 2, }} onClick={() => setVideos(prevState => [...prevState, ''])}>
      <Typography sx={{ mb: 2, '@media (min-width: 600px)': { display: 'none', }, }}>Team Meeting</Typography>
      <Box ref={videosWrapperRef} display='flex' flexGrow='1' flexDirection='column'  sx={{ overflow: 'hidden', }}>

      </Box>
    </Box>
  );
}

export default VideoContainer;
