import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import React from 'react'
import '../styles/globals.css'
import theme from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  
  )
}
export default MyApp
