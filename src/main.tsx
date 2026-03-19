import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import GlobalLoader from "./components/GlobalLoader";
import GlobalSnackbar from "./components/GlobalSnackbar";
import AppRoutes from "./AppRoutes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={false ? darkTheme : lightTheme}>
          <CssBaseline />
          <GlobalLoader />
          <GlobalSnackbar />
          <AppRoutes />
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>,
);
