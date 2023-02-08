import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#202020',
      paper: '#404040',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
