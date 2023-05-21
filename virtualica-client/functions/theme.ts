import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#199bf1',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
