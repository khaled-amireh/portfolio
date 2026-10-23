import { useMemo } from 'react'
import { AdditiveBlending } from 'three'
import { createConnectionData } from './neuralGeometry'
import { connectionVertex, connectionFragment } from './neuralShaders'

export default function NeuralConnections({ uniforms }) {
  const data = useMemo(() => createConnectionData(), [])
  return (
    <lineSegments frustumCulled={false} raycast={() => null}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-aScatter" args={[data.scatter, 3]} />
        <bufferAttribute attach="attributes-aTarget" args={[data.targets, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[data.seeds, 1]} />
        <bufferAttribute attach="attributes-aAlong" args={[data.along, 1]} />
      </bufferGeometry>
      <shaderMaterial uniforms={uniforms} vertexShader={connectionVertex} fragmentShader={connectionFragment} transparent depthWrite={false} blending={AdditiveBlending} toneMapped={false} />
    </lineSegments>
  )
}
