import { createTheme } from "@mui/material";
import { lightGreen, deepPurple } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: lightGreen[500]
    },
    secondary: {
      main: deepPurple[500]
    }
  },
});
