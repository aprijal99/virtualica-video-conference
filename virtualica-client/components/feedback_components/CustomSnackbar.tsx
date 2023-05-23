import {Alert, AlertColor, Slide, SlideProps, Snackbar} from '@mui/material';

type TransitionProps = Omit<SlideProps, 'direction'>;
function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction='down' />
}

const CustomSnackbar = ({ openAlert, closeAlert, alertMessage, alertSeverity }: { openAlert: boolean, closeAlert: () => void, alertMessage: string, alertSeverity: AlertColor, }) => {
  return (
    <Snackbar
      open={openAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center', }} onClose={closeAlert} TransitionComponent={TransitionDown} autoHideDuration={5000}
      sx={{ top: '24px', left: '24px', right: '24px', }}
    >
      <Alert severity={alertSeverity} sx={{ width: '100%', }}>{alertMessage}</Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
