import {createTheme} from '@mui/material/styles';
import {blue, red} from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: blue['500'],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
