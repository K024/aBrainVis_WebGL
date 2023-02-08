import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { GizmoHelper, GizmoViewport, OrbitControls, Text } from '@react-three/drei'
import { ABrainVis } from './abrainvis/ABrainVis'

export function Scene() {

  return (
    <Canvas frameloop="demand">
      <OrbitControls makeDefault />

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
