import { useContext } from 'react'
import { MotionContext } from '../context/MotionContext'
export function useMotionPreferences() {
  const context = useContext(MotionContext)
  if (!context) throw new Error('useMotionPreferences requires MotionProvider')
  return context
}
