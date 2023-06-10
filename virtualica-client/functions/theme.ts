import {createTheme} from '@mui/material/styles';
import {blue, grey, red} from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: blue['500'],
    },
    secondary: {
      main: grey['400'],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
