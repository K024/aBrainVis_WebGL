import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export function Scene() {

  return (
    <Canvas frameloop="demand">
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />

      <group>
        <axesHelper args={[1]} />
        <line>
          <boxGeometry />
          <lineBasicMaterial />
        </line>
      </group>

      <OrbitControls makeDefault />
    </Canvas>
  )
}
