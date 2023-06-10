import {Avatar, Box, Typography} from '@mui/material';
import {grey} from '@mui/material/colors';
import {MicOffOutlined} from '@mui/icons-material';
import {createRef, useEffect, useRef, useState} from 'react';

const VideoContainer = ({ videoStream }: { videoStream: Map<string, MediaStream>, }) => {
  const [videosRestriction, setVideosRestriction] = useState<{ renderedVideos: Map<string, MediaStream>, maxRowNum: number, maxColNum: number, } | null>(null);
  const [widthHeight, setWidthHeight] = useState<{ width: number, height: number} | null>(null);
  const videosWrapperRef = useRef<HTMLDivElement>();

  useEffect(() => {
    let wrapperWidth: number | undefined = videosWrapperRef.current?.offsetWidth;
    let wrapperHeight: number | undefined = videosWrapperRef.current?.offsetHeight;

    if (widthHeight) {
      handleSetVideosRestriction(widthHeight.width, widthHeight.height);
    } else {
      handleSetVideosRestriction(wrapperWidth as number, wrapperHeight as number);
    }
  }, [videoStream, widthHeight]);

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
    if (videoStream) {
      let cellMinWidth = 160;
      let cellMinHeight = 180;

      if (window.innerHeight < window.innerWidth) {
        cellMinWidth = 260;
        cellMinHeight = 160;
      }

      const maxRowNum = Math.floor(wrapperHeight / cellMinHeight);
      const maxColNum = Math.floor(wrapperWidth / cellMinWidth);
      const maxVideoNum = maxRowNum * maxColNum;
      const renderedVideos = new Map(Array.from(videoStream).slice(0, maxVideoNum));

      setVideosRestriction({ renderedVideos, maxRowNum, maxColNum, });
    }
  }

  const renderVideos = (videosRestriction: { renderedVideos: Map<string, MediaStream | null>, maxRowNum: number, maxColNum: number, }) => {
    const { renderedVideos, maxRowNum, maxColNum} = videosRestriction;
    const gridMap = [];

    if (window.innerHeight > window.innerWidth) {
      let y = 0;
      while (true) {
        if (gridMap.length === renderedVideos.size) break;
        for (let x = 0; x <= y; x++) {
          if (gridMap.length === renderedVideos.size) break;
          if ((x < maxColNum) && (y < maxRowNum)) gridMap.push([x, y]);
          if (gridMap.length === renderedVideos.size) break;
          if (x === y) continue;
          if (y < maxColNum) gridMap.push([y, x]);
          if (gridMap.length === renderedVideos.size) break;
        }
        y++;
      }
    } else {
      let x = 0;
      while (true) {
        if (gridMap.length === renderedVideos.size) break;
        for (let y = 0; y <= x; y++) {
          if (gridMap.length === renderedVideos.size) break;
          if ((y < maxRowNum) && (x < maxColNum)) gridMap.push([x, y]);
          if (gridMap.length === renderedVideos.size) break;
          if (y === x) continue;
          if (x < maxRowNum) gridMap.push([y, x]);
          if (gridMap.length === renderedVideos.size) break;
        }
        x++;
      }
    }

    let rowNum = 1;
    gridMap.map(val => rowNum = (val[1] + 1) > rowNum ? val[1] + 1 : rowNum);

    const groupVideos: Map<string, MediaStream>[][] = [];
    for (let i = 0; i < rowNum; i++) groupVideos.push([]);

    const keys: string[] = Array.from(renderedVideos.keys());
    for (let j = 0; j < renderedVideos.size; j++) {
      const itemKey: string = keys[j];
      const itemVal = renderedVideos.get(itemKey) as MediaStream;
      const item = new Map<string, MediaStream>();
      item.set(itemKey, itemVal);
      groupVideos[gridMap[j][1]].push(item);
    }

    return (
      <Box sx={{ height: '100%', display: 'grid', gridTemplateRows: `repeat(${rowNum}, 1fr)`, rowGap: '10px', }}>
        {groupVideos.map((videos, idx) => (
          <Box key={idx} display='flex' columnGap='10px' >
            {videos.map((val, idx) => {
              const itemKey: string = Array.from(val.keys())[0];
              return <Video key={idx} name={itemKey} mediaStream={val.get(itemKey) as MediaStream} />
            })}
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box display='flex' flexDirection='column' flexGrow='1' sx={{ overflow: 'hidden', height: '100%', bgcolor: grey.A700, }}>
      <Typography sx={{ mb: 2, '@media (min-width: 600px)': { display: 'none', }, }}>Team Meeting</Typography>
      <Box ref={videosWrapperRef} display='flex' flexGrow='1' flexDirection='column' sx={{ overflow: 'hidden', }}>
        {videosRestriction && renderVideos(videosRestriction)}
      </Box>
    </Box>
  );
}

const Video = ({ name, mediaStream }: { name: string, mediaStream: MediaStream }) => {
  const videoBoxRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (videoBoxRef.current) {
      const video: HTMLVideoElement = document.createElement('video');
      video.srcObject = mediaStream;
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.position = 'absolute';
      video.addEventListener('loadedmetadata', () => video.play());

      videoBoxRef.current.append(video);
    }
  }, []);

  return (
    <Box
      display='flex' flexGrow='1' ref={videoBoxRef}
      sx={{ bgcolor: grey['800'], borderRadius: '10px', position: 'relative', overflow: 'hidden', }}
    >
      {/*<Avatar*/}
      {/*  sx={{ height: '60px', width: '60px', bgcolor: nameToColor('Aprijal Ghiyas Setiawan'), }}*/}
      {/*  children={<Typography sx={{ color: 'white', fontSize: '25px', }}>AG</Typography>}*/}
      {/*/>*/}

      <Typography
        sx={{
          fontSize: '15px', position: 'absolute', bottom: '10px', left: '10px', maxWidth: '75%',
          whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', zIndex: '5',
        }}
      >
        {name}
      </Typography>
      <Avatar sx={{ height: '25px', width: '25px', bgcolor: 'rgba(0, 0, 0, 0.3)', position: 'absolute', top: '10px', right: '10px', zIndex: '5', }}>
        <MicOffOutlined sx={{ fontSize: '18px', color: 'white', }} />
      </Avatar>
    </Box>
  );
}

export default VideoContainer;
