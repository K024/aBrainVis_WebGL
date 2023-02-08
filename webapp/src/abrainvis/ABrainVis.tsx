import { Billboard, Text, useCursor } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { Box3, Color, Vector3 } from "three"
import type { ABrainVisBundle } from "./bundle"
import { randomHsl, seed } from "./color"
import { ABrainVisLoader } from "./loader"
import { useControls, useVisModel } from "./state"

function BrainSegments({ bundle, color }: { bundle: ABrainVisBundle["bundles"][number], color: Color }) {
  const hasSelected = useVisModel(s => s.selected.length > 0)
  const isSelected = useVisModel(s => s.selected.includes(bundle.name))
  return (
    <lineSegments geometry={bundle.geometry}>
      <lineBasicMaterial color={color} transparent
        opacity={!hasSelected ? 1 : isSelected ? 1 : 0.1} />
    </lineSegments>
  )
}

function BrainBundleTag({ bundle, color }: { bundle: ABrainVisBundle["bundles"][number], color: Color }) {
  const toggleSelected = useVisModel(s => s.toggleSelected)
  const hasSelected = useVisModel(s => s.selected.length > 0)
  const isSelected = useVisModel(s => s.selected.includes(bundle.name))

  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  return (
    <Billboard key={bundle.name} follow position={getBundleLabelPosition(bundle.geometry?.boundingBox)}>
      <Text fontSize={0.1} color="#ffffff" outlineColor={color} outlineWidth={0.006}
        fillOpacity={!hasSelected ? 1 : isSelected ? 1 : 0.2}
        outlineOpacity={!hasSelected ? 1 : isSelected ? 1 : 0.2}
        onClick={(e) => (e.stopPropagation(), toggleSelected(bundle.name))}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}>
        {bundle.name}
      </Text>
    </Billboard>
  )
}

export function ABrainVis() {

  const model = useLoader(ABrainVisLoader, "/resources/atlas.bundles")
  const { setModel, setSelected } = useVisModel()

  useEffect(() => {
    setModel(model)
    setSelected([])
    return () => setModel(null)
  }, [model])

  seed(useControls(s => s.seed))
  const colors = model.bundles.map(() => randomHsl())

  return (
    <group>
      {model.bundles.map((bundle, i) => <BrainSegments key={bundle.name} bundle={bundle} color={colors[i]} />)}
      {model.bundles.map((bundle, i) => <BrainBundleTag key={bundle.name} bundle={bundle} color={colors[i]} />)}
    </group>
  )
}

export default ABrainVis

function getBundleLabelPosition(box?: Box3 | null) {
  if (!box) return undefined
  const center = box.getCenter(new Vector3())
  return center.normalize().multiplyScalar(2)
}
