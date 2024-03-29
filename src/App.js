import React from "react";

import { createTheme, ThemeProvider } from "@mui/material";
import { lightGreen, deepPurple } from '@mui/material/colors';

import Home from "./features/Home";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  palette: {
    primary: {
      main: lightGreen[500]
    },
    secondary: {
      main: deepPurple[500]
    }
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </div>
  );
}

export default App;
