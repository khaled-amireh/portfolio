import { Suspense } from 'react'
import { MotionProvider } from './context/MotionProvider'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/layout/LoadingScreen'
import PageTransition from './components/layout/PageTransition'
import SmoothScroll from './components/layout/SmoothScroll'
import ScrollProgress from './components/animations/ScrollProgress'
import Hero from './components/hero/Hero'

export default function App() {
  return (
    <MotionProvider>
      <SmoothScroll>
        <a className="skip-link" href="#main">Skip to content</a>
        <ScrollProgress />
        <Navbar />
        <main id="main" tabIndex={-1}>
          <Suspense fallback={<LoadingScreen />}>
            <PageTransition><Hero /></PageTransition>
          </Suspense>
        </main>
        <Footer />
      </SmoothScroll>
    </MotionProvider>
  )
}
