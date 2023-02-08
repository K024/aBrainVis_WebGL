import { Box, CircularProgress, Paper } from '@mui/material'
import React, { Suspense } from 'react'
import { Menu } from './Menu'

const Scene = React.lazy(() => import('./Scene'))

export function App() {
  return (
    <Box display="flex" minHeight="100vh">
      <Box flex={1} maxHeight="100vh" overflow="hidden">
        <Suspense fallback={
          <Box p={8} display="flex" justifyContent="center">
            <CircularProgress size={80} />
          </Box>
        }>
          <Scene />
        </Suspense>
      </Box>
      <Box component={Paper} width={320} overflow="auto">
        <Menu />
      </Box>
    </Box>
  )
}
