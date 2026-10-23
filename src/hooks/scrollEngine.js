import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function createScrollEngine() {
  // One clock only. Touch keeps native behavior; no scroller proxy needed.
  const lenis = new Lenis({
    autoRaf: false,
    duration: 1.1,
    smoothWheel: true,
    syncTouch: false,
    anchors: true,
  })
  const tick = (seconds) => lenis.raf(seconds * 1000)
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  ScrollTrigger.refresh()
  return () => {
    gsap.ticker.remove(tick)
    lenis.off('scroll', ScrollTrigger.update)
    lenis.destroy()
    gsap.ticker.lagSmoothing(500, 33)
  }
}
