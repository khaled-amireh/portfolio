import { AdditiveBlending } from 'three'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { hash } from './neuralGeometry'
import { particleVertex, particleFragment } from './neuralShaders'

export default function NeuralParticles({ data, uniforms, materialRef }) {
  return (
    <points frustumCulled={false} raycast={() => null}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-aScatter" args={[data.scatter, 3]} />
        <bufferAttribute attach="attributes-aTarget" args={[data.targets, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[data.seeds, 1]} />
        <bufferAttribute attach="attributes-aKind" args={[data.kinds, 1]} />
      </bufferGeometry>
      <shaderMaterial ref={materialRef} uniforms={uniforms} vertexShader={particleVertex} fragmentShader={particleFragment} transparent depthWrite={false} blending={AdditiveBlending} toneMapped={false} />
    </points>
  )
}

export function AtmosphericParticles({ count, reducedMotion, cinematic }) {
  const cloud = useRef()
  const elapsed = useRef(0)
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      values[i * 3] = (hash(i + 1) - 0.5) * 9
      values[i * 3 + 1] = (hash(i + 23) - 0.5) * 6
      values[i * 3 + 2] = -1 - hash(i + 51) * 3
    }
    return values
  }, [count])
  useFrame((_, delta) => {
    if (!reducedMotion) elapsed.current += Math.min(delta, 0.05)
    cloud.current.position.y = reducedMotion ? 0 : Math.sin(elapsed.current * 0.08) * 0.16
    cloud.current.material.opacity = reducedMotion ? 0.25 : 0.12 + cinematic.current.formation * 0.2
  })
  return <points ref={cloud} raycast={() => null}>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
    <pointsMaterial color="#54D6CB" size={0.013} transparent opacity={0.3} depthWrite={false} />
  </points>
}
