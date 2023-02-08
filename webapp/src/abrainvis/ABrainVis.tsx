import { Billboard, Text } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { Box3, Vector3 } from "three"
import { randomHsl } from "./color"
import { ABrainVisLoader } from "./loader"

export function ABrainVis() {
  const model = useLoader(ABrainVisLoader, "/resources/atlas.bundles")

  return (
    <group>
      {model.bundles.map(bundle =>
        <lineSegments geometry={bundle.geometry}>
          <lineBasicMaterial color={randomHsl()} />
        </lineSegments>)}
      {model.bundles.map(bundle =>
        <Billboard follow position={getBundleLabelPosition(bundle.geometry?.boundingBox)}>
          <Text fontSize={0.1} color="#33aaff">{bundle.name}</Text>
        </Billboard>)}
    </group>
  )
}

function getBundleLabelPosition(box?: Box3 | null) {
  if (!box) return undefined
  const center = box.getCenter(new Vector3())
  return center.normalize().multiplyScalar(2)
}
