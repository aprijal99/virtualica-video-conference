import {Avatar, Box, Typography} from '@mui/material';
import {grey} from '@mui/material/colors';
import {MicOffOutlined} from '@mui/icons-material';
import {createRef, useEffect, useRef, useState} from 'react';

const Video = ({ name, localStream }: { name: string, localStream: MediaStream | null, }) => {
  const videoRef = createRef<HTMLVideoElement>();

  useEffect(() => {
    if (localStream && videoRef.current) {
      videoRef.current.srcObject = localStream;
      videoRef.current.addEventListener('loadedmetadata', () => videoRef.current?.play());
    }
  }, [localStream]);

  return (
    <Box
      id={name} display='flex' flexGrow='1'
      sx={{ bgcolor: grey['800'], borderRadius: '10px', position: 'relative', overflow: 'hidden', }}
    >
      {/*<Avatar*/}
      {/*  sx={{ height: '60px', width: '60px', bgcolor: nameToColor('Aprijal Ghiyas Setiawan'), }}*/}
      {/*  children={<Typography sx={{ color: 'white', fontSize: '25px', }}>AG</Typography>}*/}
      {/*/>*/}
      <video ref={videoRef} style={{ position: 'absolute', width: '100%', height: '100%', }} />
      <Typography
        sx={{
          fontSize: '15px', position: 'absolute', bottom: '10px', left: '10px', maxWidth: '75%',
          whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden',
      }}
      >
        {name}
      </Typography>
      <Avatar sx={{ height: '25px', width: '25px', bgcolor: 'rgba(0, 0, 0, 0.3)', position: 'absolute', top: '10px', right: '10px', }}>
        <MicOffOutlined sx={{ fontSize: '18px', color: 'white', }} />
      </Avatar>
    </Box>
  );
}

const VideoContainer = ({ people, localStream }: { people: string[], localStream: MediaStream | null, }) => {
  const [videos, setVideos] = useState<string[] | null>(null);
  const [videosRestriction, setVideosRestriction] = useState<{ renderedVideos: string[], maxRowNum: number, maxColNum: number, } | null>(null);
  const [widthHeight, setWidthHeight] = useState<{ width: number, height: number} | null>(null);
  const videosWrapperRef = useRef<HTMLDivElement>();

  useEffect(() => setVideos(people), [people]);

  useEffect(() => {
    let wrapperWidth: number | undefined = videosWrapperRef.current?.offsetWidth;
    let wrapperHeight: number | undefined = videosWrapperRef.current?.offsetHeight;

    if (widthHeight) {
      handleSetVideosRestriction(widthHeight.width, widthHeight.height);
    } else {
      handleSetVideosRestriction(wrapperWidth as number, wrapperHeight as number);
    }
  }, [videos, widthHeight]);

  useEffect(() => {
    if (videosWrapperRef.current) {
      const observer = new ResizeObserver(entries => {
        let wrapperWidth = 0;
        let wrapperHeight = 0;

        entries.forEach(entry => {
          wrapperWidth = entry.contentRect.width;
          wrapperHeight = entry.contentRect.height;
        });

        setWidthHeight({ width: wrapperWidth, height: wrapperHeight, });
      });

      observer.observe(videosWrapperRef.current as Element);
    }
  }, []);

  const handleSetVideosRestriction = (wrapperWidth: number, wrapperHeight: number) => {
    if (videos) {
      let cellMinWidth = 160;
      let cellMinHeight = 180;

      if (window.innerHeight < window.innerWidth) {
        cellMinWidth = 260;
        cellMinHeight = 160;
      }

      const maxRowNum = Math.floor(wrapperHeight / cellMinHeight);
      const maxColNum = Math.floor(wrapperWidth / cellMinWidth);
      const maxVideoNum = maxRowNum * maxColNum;
      const renderedVideos = videos.slice(0, maxVideoNum);

      setVideosRestriction({ renderedVideos, maxRowNum, maxColNum, });
    }
  }

  const addVideo = () => setVideos(prevState => {
    if (prevState === null) {
      return [`user-${Math.floor(Math.random() * 100)}`];
    } else {
      return [...prevState, `user-${Math.floor(Math.random() * 100)}`];
    }
  })

  const renderVideos = (videosRestriction: { renderedVideos: string[], maxRowNum: number, maxColNum: number, }) => {
    const { renderedVideos, maxRowNum, maxColNum} = videosRestriction;
    const gridMap = [];

    if (window.innerHeight > window.innerWidth) {
      let y = 0;
      while (true) {
        if (gridMap.length === renderedVideos.length) break;
        for (let x = 0; x <= y; x++) {
          if (gridMap.length === renderedVideos.length) break;
          if ((x < maxColNum) && (y < maxRowNum)) gridMap.push([x, y]);
          if (gridMap.length === renderedVideos.length) break;
          if (x === y) continue;
          if (y < maxColNum) gridMap.push([y, x]);
          if (gridMap.length === renderedVideos.length) break;
        }
        y++;
      }
    } else {
      let x = 0;
      while (true) {
        if (gridMap.length === renderedVideos.length) break;
        for (let y = 0; y <= x; y++) {
          if (gridMap.length === renderedVideos.length) break;
          if ((y < maxRowNum) && (x < maxColNum)) gridMap.push([x, y]);
          if (gridMap.length === renderedVideos.length) break;
          if (y === x) continue;
          if (x < maxRowNum) gridMap.push([y, x]);
          if (gridMap.length === renderedVideos.length) break;
        }
        x++;
      }
    }

    let rowNum = 1;
    gridMap.map(val => rowNum = (val[1] + 1) > rowNum ? val[1] + 1 : rowNum);

    const groupVideos: string[][] = [];
    for (let i = 0; i < rowNum; i++) groupVideos.push([]);
    for (let j = 0; j < renderedVideos.length; j++) groupVideos[gridMap[j][1]].push(renderedVideos[j]);

    return (
      <Box sx={{ height: '100%', display: 'grid', gridTemplateRows: `repeat(${rowNum}, 1fr)`, rowGap: '10px', }}>
        {groupVideos.map((videos, idx) => (
          <Box key={idx} display='flex' columnGap='10px' >
            {videos.map((val, idx) => <Video key={idx} name={val} localStream={localStream} />)}
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box display='flex' flexDirection='column' flexGrow='1' sx={{ mt: 2, overflow: 'hidden', }} onClick={addVideo}>
      <Typography sx={{ mb: 2, '@media (min-width: 600px)': { display: 'none', }, }}>Team Meeting</Typography>
      <Box ref={videosWrapperRef} display='flex' flexGrow='1' flexDirection='column' sx={{ overflow: 'hidden', }}>
        {videosRestriction && renderVideos(videosRestriction)}
      </Box>
    </Box>
  );
}

export default VideoContainer;
