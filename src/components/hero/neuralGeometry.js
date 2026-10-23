// Original cybernetic wolf sculpture. The existing particle/animation contract
// is retained: only the authored surface samples and circuit routes change.
const outline = [
  [-1.56, 0.15], [-1.33, 0.42], [-1.09, 0.56], [-0.83, 0.91],
  [-0.76, 0.76], [-0.51, 1.10], [-0.40, 0.95], [-0.17, 1.17],
  [0.04, 0.99], [0.40, 0.86], [0.78, 0.74], [1.08, 0.36],
]
const yaw = 0.65
const cosYaw = Math.cos(yaw)
const sinYaw = Math.sin(yaw)

export const hash = (n) => {
  const value = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return value - Math.floor(value)
}

export function faceWidth(y) {
  for (let i = 1; i < outline.length; i++) {
    if (y <= outline[i][0]) {
      const [y0, w0] = outline[i - 1]
      const [y1, w1] = outline[i]
      return w0 + (w1 - w0) * (y - y0) / (y1 - y0)
    }
  }
  return 0.36
}

export function faceDepth(x, y) {
  const width = faceWidth(Math.max(-1.56, Math.min(1.08, y)))
  const lateral = Math.min(1, Math.abs(x) / width)
  const skull = 0.08 + 0.48 * Math.pow(1 - lateral, 0.65)
  const brow = 0.16 * Math.exp(-Math.pow((Math.abs(x) - 0.48) / 0.3, 2) - Math.pow((y - 0.55) / 0.24, 2))
  const cheek = 0.17 * Math.exp(-Math.pow((Math.abs(x) - 0.63) / 0.32, 2) - Math.pow((y + 0.27) / 0.48, 2))
  return skull + brow + cheek
}

// Bake a three-quarter pose into the asset, preserving the original group's
// idle/pointer/scroll transforms, camera, and responsive composition.
function pose(x, y, z) {
  return [x * cosYaw + z * sinYaw - 0.22, y, z * cosYaw - x * sinYaw]
}

export function pointAttributes(x, y, z) {
  const seed = hash(x * 9.71 + y * 5.34 + z * 2.17)
  const side = x < 0 ? -1 : 1
  return {
    seed,
    scatter: [x + (seed - 0.5) * 8, y + (hash(seed * 18) - 0.5) * 6, z - 2 - seed * 5],
    target: [side * (1.1 + hash(seed * 30) * 3.5), y * 0.95 + (seed - 0.5) * 1.7, -0.7 - hash(seed * 12) * 2],
  }
}

const interpolate = (a, b, t) => a.map((value, i) => value + (b[i] - value) * t)

export function createFaceData(step = 0.038) {
  const positions = [], kinds = [], seeds = [], scatter = [], targets = []
  function add(x, y, z, kind = 0) {
    const point = pose(x, y, z)
    const data = pointAttributes(...point)
    positions.push(...point)
    kinds.push(kind)
    seeds.push(data.seed)
    scatter.push(...data.scatter)
    targets.push(...data.target)
  }
  function rail(points, kind = 2, spacing = step * 0.75) {
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1], b = points[i]
      const count = Math.ceil(Math.hypot(...b.map((v, j) => v - a[j])) / spacing)
      for (let j = 0; j < count; j++) add(...interpolate(a, b, j / count), kind)
    }
  }

  // Contoured skull and swept cheek plates. Socket and muzzle openings are
  // genuine negative space, not a face painted onto a spherical cloud.
  for (let row = 0, y = -1.54; y < 1.08; y += step, row++) {
    const width = faceWidth(y)
    for (let x = -width + (row % 2) * step * 0.5; x < width; x += step) {
      const ax = Math.abs(x)
      const eyeY = 0.24 + (ax - 0.23) * 0.45
      const socket = ax > 0.21 && ax < 0.77 && Math.abs(y - eyeY) < 0.13 * Math.sin((ax - 0.21) / 0.56 * Math.PI) + 0.035
      const muzzleOpening = y < 0.23 && y > -0.93 && ax < 0.37
      const cheekSeam = ax > 0.43 && Math.abs(y - (-0.17 - (ax - 0.43) * 0.52)) < step * 0.7
      const lowerSeam = ax > 0.38 && Math.abs(y - (-0.68 - (ax - 0.38) * 0.4)) < step * 0.7
      const foreheadSeam = y > 0.57 && Math.abs(ax - (0.10 + (y - 0.57) * 0.35)) < step * 0.55
      if (socket || muzzleOpening || cheekSeam || lowerSeam || foreheadSeam) continue
      // Small ordered ripples carve the dot rows into the sweeping cheek form.
      const contour = Math.sin(ax * 7 + y * 5) * 0.012
      add(x, y + contour, faceDepth(x, y))
      if (ax > width * 0.86 && row % 2 === 0) add(x * 0.94, y, faceDepth(x, y) - 0.18)
    }
  }

  // Tall swept triangular pinnae with a recessed interior and double edge.
  for (const side of [-1, 1]) {
    const a = [side * 0.31, 0.79, 0.23]
    const b = [side * 1.02, 0.62, -0.10]
    const tip = [side * 0.98, 2.02, -0.13]
    const rows = Math.ceil(1.43 / step)
    for (let row = 0; row < rows; row++) {
      const t = row / rows
      const left = interpolate(a, tip, t), right = interpolate(b, tip, t)
      const columns = Math.max(1, Math.ceil(Math.hypot(...right.map((v, i) => v - left[i])) / step))
      for (let column = 0; column <= columns; column++) {
        const u = column / columns
        const p = interpolate(left, right, u)
        const rim = u < 0.14 || u > 0.88 || t < 0.12
        if (!rim && (row + column) % 3 !== 0) continue
        p[2] -= Math.sin(u * Math.PI) * Math.sin(t * Math.PI) * 0.27
        add(...p)
      }
    }
    rail([a, tip, b])
    rail([[side * 0.44, 0.85, 0.19], [side * 0.95, 1.80, -0.14], [side * 0.88, 0.80, -0.07]], 0)
  }

  // Long, tapered, genuinely three-dimensional muzzle. Superellipse rings
  // produce angular bridge/side planes instead of a human nose or round snout.
  const rings = Math.ceil(1.22 / step)
  for (let row = 0; row <= rings; row++) {
    const t = row / rings
    const z = 0.46 + t * 1.21
    const centerY = -0.06 - t * 0.51
    const width = 0.43 - t * 0.17
    const height = 0.34 - t * 0.17
    const points = Math.ceil(2 * Math.PI * Math.max(width, height) / step)
    for (let i = 0; i < points; i++) {
      const angle = i / points * Math.PI * 2
      const c = Math.cos(angle), s = Math.sin(angle)
      // Omit the far underside: points stay crisp instead of looking like
      // overlapping transparent tube walls in the authored three-quarter pose.
      if (c > 0.45 && s < 0.4) continue
      const x = width * Math.sign(c) * Math.pow(Math.abs(c), 0.78)
      const y = centerY + height * Math.sign(s) * Math.pow(Math.abs(s), 0.8)
      if (Math.abs(c) < 0.06 && s > 0 && row % 3 !== 0) continue
      add(x, y, z)
    }
  }

  // Swept jowl surfaces close the rear of the muzzle. Only a narrow mouth
  // seam remains, rather than a hollow triangular opening beneath the snout.
  for (const side of [-1, 1]) {
    for (let z = 0.46; z <= 1.59; z += step) {
      const t = (z - 0.46) / 1.21
      const top = -0.425 - t * 0.34
      const bottom = -1.10 + t * 0.30
      for (let y = bottom; y <= top; y += step) {
        const v = (y - bottom) / (top - bottom)
        const x = side * (0.43 - t * 0.17 + Math.sin(v * Math.PI) * 0.055)
        add(x, y, z)
      }
    }
  }

  // Dark pentagonal nose with a lit top plane and paired nostril rims.
  const nose = [[-0.26, -0.44, 1.67], [0.26, -0.44, 1.67], [0.22, -0.63, 1.76], [0, -0.76, 1.80], [-0.22, -0.63, 1.76], [-0.26, -0.44, 1.67]]
  rail(nose)
  for (let x = -0.23; x < 0.24; x += step) {
    for (let y = -0.49; y < -0.44; y += step * 0.7) add(x, y, 1.70)
  }
  for (const side of [-1, 1]) {
    const nostril = []
    for (let i = 0; i <= 16; i++) {
      const angle = i / 16 * Math.PI * 1.3
      nostril.push([side * (0.15 + Math.cos(angle) * 0.06), -0.58 + Math.sin(angle) * 0.045, 1.77])
    }
    rail(nostril, 0)
  }

  // Closed lower jaw; a narrow negative-space mouth separates the two plates.
  for (let z = 0.36; z < 1.59; z += step) {
    const t = (z - 0.36) / 1.23
    const width = 0.32 - t * 0.10
    for (let x = -width; x <= width; x += step) {
      const y = -1.14 + t * 0.33 + 0.10 * Math.pow(x / width, 2)
      add(x, y, z)
    }
  }
  for (const side of [-1, 1]) {
    rail([[side * 0.74, -0.37, 0.42], [side * 0.42, -0.66, 0.79], [side * 0.28, -0.77, 1.45]], 0)
    rail([[side * 0.48, -1.05, 0.38], [side * 0.29, -0.95, 0.94], [side * 0.21, -0.81, 1.59]], 0)
  }

  // Slanted almond optics, with round dark pupils and precise cyan irises.
  // Fixed optical sampling keeps both eyes legible at the lowest quality tier.
  for (const side of [-1, 1]) {
    for (let i = 0; i <= 48; i++) {
      const t = i / 48
      const x = side * (0.25 + t * 0.48)
      const centerY = 0.25 + t * 0.215
      const halfHeight = Math.sin(Math.PI * t) * 0.065
      const z = faceDepth(x, centerY) + 0.025
      add(x, centerY + halfHeight, z, 1)
      add(x, centerY - halfHeight, z, 1)
      if (t > 0.32 && t < 0.65) {
        for (let j = -3; j <= 3; j++) {
          const radius = Math.hypot((t - 0.49) * 0.48, halfHeight * j / 4)
          if (radius < 0.026 || radius > 0.060) continue
          add(x, centerY + halfHeight * j / 4, z - 0.015, 1)
        }
      }
    }
    const brow = []
    for (let i = 0; i <= 30; i++) {
      const t = i / 30, x = side * (0.18 + t * 0.64)
      const y = 0.32 + t * 0.24 + Math.sin(t * Math.PI) * 0.08
      brow.push([x, y, faceDepth(x, y) + 0.045])
    }
    rail(brow, 2)
    const perimeter = outline.map(([y, width]) => [side * width, y, faceDepth(side * width, y)])
    rail(perimeter, 0)
    // Swept cheek circuitry replaces furry strands with deliberate cut planes.
    for (let layer = 0; layer < 3; layer++) {
      const y = -0.04 - layer * 0.30
      const points = [[side * 0.43, y, 0.59], [side * 0.75, y - 0.10, 0.49], [side * (1.10 - layer * 0.10), y - 0.18, 0.13]]
      rail(points, 0)
    }
  }
  return { positions: new Float32Array(positions), kinds: new Float32Array(kinds), seeds: new Float32Array(seeds), scatter: new Float32Array(scatter), targets: new Float32Array(targets), count: kinds.length }
}

export function createConnectionData() {
  // Sparse paths follow ears, brow planes, muzzle sides and cheek circuitry.
  const paths = []
  for (const side of [-1, 1]) {
    paths.push(
      [[side * 0.39, 0.85, 0.23], [side * 0.94, 1.86, -0.12], [side * 0.91, 0.83, -0.06]],
      [[side * 0.23, 0.94, 0.43], [side * 0.37, 0.70, 0.64], [side * 0.76, 0.58, 0.51]],
      [[side * 0.38, 0.06, 0.58], [side * 0.73, -0.12, 0.52], [side * 1.08, -0.20, 0.16]],
      [[side * 0.45, -0.44, 0.58], [side * 0.68, -0.55, 0.43], [side * 0.87, -0.80, 0.17]],
      [[side * 0.35, -0.12, 0.72], [side * 0.30, -0.31, 1.12], [side * 0.25, -0.50, 1.58]],
      [[side * 0.38, -1.10, 0.30], [side * 0.26, -1.28, 0.33], [side * 0.12, -1.45, 0.25]],
    )
  }
  const positions = [], scatter = [], targets = [], seeds = [], along = []
  paths.forEach((path, route) => {
    for (let i = 1; i < path.length; i++) {
      for (const [j, point] of [[i - 1, path[i - 1]], [i, path[i]]]) {
        const posed = pose(...point)
        const data = pointAttributes(...posed)
        positions.push(...posed)
        scatter.push(...data.scatter)
        targets.push(...data.target)
        seeds.push(data.seed)
        along.push(j / (path.length - 1) + route * 0.17)
      }
    }
  })
  return Object.fromEntries(Object.entries({ positions, scatter, targets, seeds, along }).map(([key, value]) => [key, new Float32Array(value)]))
}
