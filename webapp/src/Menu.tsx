import {
  Box, Button, Checkbox, Chip, Divider,
  FormControlLabel, MenuItem, Slider, styled, Switch, TextField, Typography
} from '@mui/material'
import { useVisModel, useControls } from './abrainvis/state'

const Container = styled(Box)(({ theme }) => `
&>*+* {
  margin-top: ${theme.spacing(2)};
}
`)

function Genes() {
  const { model, selected, toggleSelected } = useVisModel()

  return <>
    <Box>
      {model?.bundles.map(bundle =>
        <Box key={bundle.name}>
          <FormControlLabel
            label={bundle.name}
            control={<Checkbox
              checked={selected.includes(bundle.name)}
              onChange={() => toggleSelected(bundle.name)} />}
          />
        </Box>)}
    </Box>
  </>
}

function Controls() {
  const { seed, rotate, stats, setSeed, setRotate, setStats } = useControls()

  return <>
    <Box>
      <Button variant="contained" fullWidth>Load Model</Button>
    </Box>
    <Box>
      <Typography gutterBottom>Sampler</Typography>
      <TextField fullWidth variant="filled" size="small" defaultValue="K_DPM" hiddenLabel select>
        <MenuItem value=""><em>None</em></MenuItem>
        <MenuItem value="K_Euler">K_Euler</MenuItem>
        <MenuItem value="K_DPM">K_DPM</MenuItem>
        <MenuItem value="K_DPMPP">K_DPMPP</MenuItem>
        <MenuItem value="K_DPMPP_SDE">K_DPMPP_SDE</MenuItem>
      </TextField>
    </Box>
    <Box>
      <Typography gutterBottom>Seed</Typography>
      <TextField type="number" fullWidth variant="filled" size="small" hiddenLabel
        value={seed} onChange={e => setSeed(+e.target.value || 42)} />
    </Box>
    <Box>
      <Typography gutterBottom>Steps</Typography>
      <Slider valueLabelDisplay="auto" defaultValue={20} step={1} min={1} max={50} />
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography gutterBottom>Rounding</Typography>
      <Switch checked={rotate} onChange={e => setRotate(e.target.checked)} />
    </Box>
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography gutterBottom>Monitoring</Typography>
      <Switch checked={stats} onChange={e => setStats(e.target.checked)} />
    </Box>
    <Box>
      <Button variant="contained" fullWidth>ACTIVATE</Button>
    </Box>
  </>
}

export function Menu() {

  return (
    <Container p={2} maxHeight="100vh" overflow="auto">
      <Box>
        <Divider><Chip label="CONTROLS" /></Divider>
      </Box>
      <Controls />

      <Box mt={4}>
        <Divider><Chip label="FIBERS" /></Divider>
      </Box>
      <Genes />
    </Container>
  )
}
