import React from "react";

import "./App.css";

import { store } from "@/redux/store";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { theme } from "./theme";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={routes} />
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
