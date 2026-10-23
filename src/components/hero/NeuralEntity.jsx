import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils, Vector2 } from 'three'
import NeuralParticles from './NeuralParticles'
import NeuralConnections from './NeuralConnections'
import { createFaceData } from './neuralGeometry'

export default function NeuralEntity({ cinematic, pointer, quality, reducedMotion, onReady }) {
  const group = useRef()
  const material = useRef()
  const ready = useRef(false)
  const time = useRef(0)
  const data = useMemo(() => createFaceData(quality.step), [quality.step])
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }, uFormation: { value: 0 }, uProgress: { value: 0 },
    uReduced: { value: 0 }, uPointer: { value: new Vector2() },
    uScale: { value: 1 }, uEyes: { value: 0 }, uPulse: { value: -5 },
    uActivation: { value: 0 },
  }), [])

  useFrame(({ camera, size, gl }, delta) => {
    // Update the renderer-owned material through a ref, never React state.
    const shaderUniforms = material.current.uniforms
    const state = cinematic.current
    const dt = Math.min(delta, 0.05)
    if (!reducedMotion) time.current += dt
    const interactive = state.entranceDone && !reducedMotion && !quality.coarse
    const px = interactive ? pointer.current.x : 0
    const py = interactive ? pointer.current.y : 0
    shaderUniforms.uTime.value = reducedMotion ? 0 : time.current
    shaderUniforms.uFormation.value = reducedMotion ? 1 : state.formation
    shaderUniforms.uActivation.value = reducedMotion ? 1 : state.activation
    shaderUniforms.uEyes.value = reducedMotion ? 1 : state.eyes
    shaderUniforms.uPulse.value = reducedMotion ? -5 : state.pulse
    shaderUniforms.uProgress.value = reducedMotion ? 0 : state.progress
    shaderUniforms.uReduced.value = reducedMotion ? 1 : 0
    shaderUniforms.uScale.value = (size.height / 800) * gl.getPixelRatio()
    shaderUniforms.uPointer.value.x = MathUtils.damp(shaderUniforms.uPointer.value.x, px, 3, dt)
    shaderUniforms.uPointer.value.y = MathUtils.damp(shaderUniforms.uPointer.value.y, py, 3, dt)
    const progress = reducedMotion ? 0 : state.progress
    const targetY = -0.17 * (1 - progress) + px * 0.085
    group.current.rotation.y = reducedMotion ? -0.17 : MathUtils.damp(group.current.rotation.y, targetY, 3, dt)
    group.current.rotation.x = reducedMotion ? 0 : MathUtils.damp(group.current.rotation.x, -py * 0.045, 3, dt)
    group.current.position.y = reducedMotion ? 0 : Math.sin(time.current * 0.38) * 0.025
    camera.position.z = 7.5 - progress * 0.8
    if (!ready.current) { ready.current = true; onReady() }
  })

  return <group ref={group} rotation={[0, -0.17, 0]}>
    <NeuralParticles data={data} uniforms={uniforms} materialRef={material} />
    <NeuralConnections uniforms={uniforms} />
  </group>
}
