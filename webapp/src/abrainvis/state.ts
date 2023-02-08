import { create } from "zustand"
import type { ABrainVisBundle } from "./bundle"

export const useControls = create<{
  seed: number
  rotate: boolean
  stats: boolean
  setSeed: (seed: number) => void
  setRotate: (rotate: boolean) => void
  setStats: (stats: boolean) => void
}>(set => ({
  seed: 42,
  rotate: true,
  stats: false,
  setSeed: seed => set({ seed }),
  setRotate: rotate => set({ rotate }),
  setStats: stats => set({ stats }),
}))

export type VisModelState = {
  model: ABrainVisBundle | null
  selected: string[],
  setModel(model: ABrainVisBundle | null): void
  setSelected(selected: string[]): void
  toggleSelected(name: string): void
}

export const useVisModel = create<VisModelState>(set => ({
  model: null,
  selected: [],
  setModel: model => set({ model }),
  setSelected: selected => set({ selected }),
  toggleSelected: name => set(({ selected }) => ({
    selected: selected.includes(name)
      ? selected.filter(x => x !== name)
      : selected.concat(name)
  })),
}))
