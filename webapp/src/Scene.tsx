import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { GizmoHelper, GizmoViewport, Grid, OrbitControls, Stats } from '@react-three/drei'
import { useControls } from './abrainvis/state'

const ABrainVis = React.lazy(() => import('./abrainvis/ABrainVis'))

function Controls() {
  const stats = useControls(s => s.stats)
  const rotate = useControls(s => s.rotate)
  return <>
    <OrbitControls makeDefault autoRotate={rotate} />
    {stats && <Stats />}
  </>
}

export function Scene() {
  return (
    <Canvas frameloop="demand" camera={{ position: [0, 2, 5] }}>
      <Controls />

      <Grid cellColor="white" args={[12, 12]} position={[0, -2, 0]} />

      <GizmoHelper>
        <GizmoViewport />
      </GizmoHelper>

      <Suspense fallback={
        <line>
          <boxGeometry />
          <lineBasicMaterial />
        </line>
      }>
        <ABrainVis />
      </Suspense>
    </Canvas>
  )
}

export default Scene
