import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppointmentModule from './pages/AppointmentModule';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider, CssBaseline, Button } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import GlobalLoader from './components/GlobalLoader';
import GlobalSnackbar from './components/GlobalSnackbar';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <CssBaseline />
          <div style={{ padding: 20 }}>
            <Button variant="contained" onClick={() => setDarkMode(!darkMode)} sx={{ mb: 2 }}>
              {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </Button>
            <GlobalLoader/>
            <GlobalSnackbar/>
            <AppointmentModule />
          </div>
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
