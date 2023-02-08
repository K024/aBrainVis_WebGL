import { Color } from "three"

export function random(start: number, end?: number) {
  if (end === undefined) {
    end = start
    start = 0
  }
  return ((end - start) * Math.random() + start) | 0
}

export function randomHsl() {
  return new Color(`hsl(${random(360)}, ${random(40, 80)}%, ${random(30, 70)}%)`)
}
