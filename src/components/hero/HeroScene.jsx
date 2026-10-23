import { Component, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import NeuralEntity from './NeuralEntity'
import { AtmosphericParticles } from './NeuralParticles'

class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error) { this.props.onFailure(error) }
  render() { return this.state.failed ? null : this.props.children }
}

function ContextGuard({ onFailure }) {
  const get = useThree((state) => state.get)
  useEffect(() => {
    const { gl, invalidate } = get()
    const canvas = gl.domElement
    const lost = (event) => {
      event.preventDefault()
      onFailure(new Error('WebGL context lost'))
    }
    const previous = gl.debug.onShaderError
    gl.debug.onShaderError = () => onFailure(new Error('Neural shader could not compile'))
    canvas.addEventListener('webglcontextlost', lost, false)
    invalidate()
    return () => {
      canvas.removeEventListener('webglcontextlost', lost)
      gl.debug.onShaderError = previous
    }
  }, [get, onFailure])
  return null
}

export default function HeroScene({ cinematic, pointer, quality, reducedMotion, active, onReady, onFailure }) {
  return <SceneBoundary onFailure={onFailure}>
    <Canvas
      camera={{ position: [0, 0.12, 7.5], fov: 34, near: 0.1, far: 30 }}
      dpr={quality.dpr}
      gl={{ alpha: true, antialias: false, powerPreference: quality.name === 'high' ? 'high-performance' : 'low-power' }}
      frameloop={active && !reducedMotion ? 'always' : 'demand'}
      fallback={null}
      style={{ pointerEvents: 'none' }}
      onCreated={({ gl }) => { gl.setClearColor('#03090E', 0); gl.domElement.setAttribute('aria-hidden', 'true') }}
    >
      <ContextGuard onFailure={onFailure} />
      {active && !reducedMotion && <PerformanceMonitor bounds={() => [32, 58]} onDecline={quality.downgrade} />}
      <NeuralEntity cinematic={cinematic} pointer={pointer} quality={quality} reducedMotion={reducedMotion} onReady={onReady} />
      <AtmosphericParticles count={quality.dust} reducedMotion={reducedMotion} cinematic={cinematic} />
    </Canvas>
  </SceneBoundary>
}
