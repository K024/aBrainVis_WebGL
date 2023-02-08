import { BufferGeometry, BufferAttribute, Matrix4 } from 'three'

export class ABrainVisBundle {

  curvesCount: number
  bundles: { name: string, start: number, end: number, geometry?: BufferGeometry }[]

  constructor(attributes: string, data: ArrayBuffer) {

    const attrDict: { curves_count: number, bundles: (string | number)[] } = JSON.parse(
      attributes.replace(/^attributes\s*=\s*/, "").replace(/'/g, "\"")
    )

    this.curvesCount = attrDict.curves_count
    this.bundles = []

    for (let i = 0; i < attrDict.bundles.length; i += 2) {
      const name = attrDict.bundles[i]
      const start = attrDict.bundles[i + 1]
      const end = attrDict.bundles[i + 3] || attrDict.curves_count
      if (typeof name !== "string" || typeof start !== "number" || typeof end !== "number")
        throw new Error("Unexpected type in bundles definition")
      this.bundles.push({ name, start, end })
    }

    this._loadData(data)
  }

  _loadData(data: ArrayBuffer) {
    const intView = new Int32Array(data)
    const floatView = new Float32Array(data)

    const fibers: number[] = []
    let i = 0
    while (i < intView.length) {
      fibers.push(i)
      const next = i + 1 + intView[i] * 3
      if (next <= i) break
      i = next
    }

    for (const bundle of this.bundles) {
      const { start, end } = bundle
      const bundleFibers = fibers.slice(start, end)
      if (fibers.length <= 0)
        continue

      const points = bundleFibers.map(i => intView[i]).reduce((a, b) => a + b)

      const position = new Float32Array(points * 3)
      const indices: number[] = []

      let positionIndex = 0
      let indicesIndex = 0
      for (const index of bundleFibers) {
        const count = intView[index]
        position.set(floatView.subarray(index + 1, index + 1 + count * 3), positionIndex * 3)
        for (let idx = 1; idx < count; idx++) {
          indices[indicesIndex++] = positionIndex + idx - 1
          indices[indicesIndex++] = positionIndex + idx
        }
        positionIndex += count
      }

      let geometry = new BufferGeometry()
      geometry.setIndex(indices)
      geometry.setAttribute("position", new BufferAttribute(position, 3, true))

      geometry = geometry.scale(0.015, 0.015, 0.015).rotateX(Math.PI / 2).translate(0, 0, -0.25).rotateY(Math.PI)
      geometry.computeBoundingBox()

      bundle.geometry = geometry
    }
  }
}
