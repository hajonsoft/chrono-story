import React from "react";

import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import PublicHome from "./features/Home/public-home";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <PublicHome />
      </ThemeProvider>
    </div>
  );
}

export default App;
