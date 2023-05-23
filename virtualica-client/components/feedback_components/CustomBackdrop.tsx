import {Backdrop, CircularProgress} from '@mui/material';

const CustomBackdrop = ({ backdropLoading }: { backdropLoading: boolean, }) => {
  return (
    <Backdrop open={backdropLoading} sx={{ zIndex: 10000, }}>
      <CircularProgress />
    </Backdrop>
  );
}

export default CustomBackdrop;
