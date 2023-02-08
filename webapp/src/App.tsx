import { Box, Paper } from '@mui/material'
import { Menu } from './Menu'
import { Scene } from './Scene'

export function App() {
  return (
    <Box display="flex" minHeight="100vh">
      <Box flex={1} overflow="hidden">
        <Scene />
      </Box>
      <Box component={Paper} width={320} overflow="auto">
        <Menu />
      </Box>
    </Box>
  )
}
