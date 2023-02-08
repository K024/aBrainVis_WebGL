import { Box, Button, Chip, Divider, styled } from '@mui/material'

const Container = styled(Box)(({ theme }) => `
&>*+* {
  margin-top: ${theme.spacing(2)};
}
`)

export function Menu() {
  return (
    <Container p={2}>
      <Box>
        <Divider><Chip label="CONTROLS" /></Divider>
      </Box>
      <Box>
        <Button variant="contained" fullWidth>Load Model</Button>
      </Box>

      <Box mt={4}>
        <Divider><Chip label="GENES" /></Divider>
      </Box>
    </Container>
  )
}
