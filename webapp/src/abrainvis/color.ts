import { Color } from "three"

let state = 0

export function seed(s: number) {
  state = s
}

export function mulberry32() {
  var t = state += 0x6D2B79F5
  t = Math.imul(t ^ t >>> 15, t | 1)
  t ^= t + Math.imul(t ^ t >>> 7, t | 61)
  return ((t ^ t >>> 14) >>> 0) / 4294967296
}

export function random(start: number, end?: number) {
  if (end === undefined) {
    end = start
    start = 0
  }
  return ((end - start) * mulberry32() + start) | 0
}

export function randomHsl() {
  return new Color(`hsl(${random(360)}, ${random(40, 70)}%, ${random(30, 60)}%)`)
}
