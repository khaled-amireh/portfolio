import { useMemo } from 'react'
import { createFaceData } from './neuralGeometry'

// The same authored geometry, projected into an accessible-free static SVG.
// Always available before WebGL loads and if context creation/rendering fails.
export default function HeroFallback({ hidden = false }) {
  const data = useMemo(() => createFaceData(0.095), [])
  return (
    <div className={`hero-fallback ${hidden ? 'is-hidden' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 600 700" fill="none">
        {Array.from({ length: data.count }, (_, i) => {
          const x = data.positions[i * 3], y = data.positions[i * 3 + 1]
          const z = data.positions[i * 3 + 2], kind = data.kinds[i]
          return <circle key={i} cx={300 + (x * 0.99 + z * -0.12) * 135} cy={355 - y * 145} r={kind === 1 ? 1.55 : 1.05} fill={kind === 1 ? '#B7F4EA' : '#54D6CB'} opacity={kind > 0 ? 0.9 : 0.25 + data.seeds[i] * 0.4} />
        })}
      </svg>
    </div>
  )
}
