import { useCallback, useState } from 'react'
import { useMediaQuery } from './useMediaQuery'

export const qualityLevels = {
  low: { step: 0.066, dpr: 1, dust: 30 },
  medium: { step: 0.046, dpr: 1.25, dust: 55 },
  high: { step: 0.034, dpr: 1.5, dust: 85 },
}

export function useDeviceQuality() {
  const mobile = useMediaQuery('(max-width: 767px)')
  const coarse = useMediaQuery('(pointer: coarse)')
  const limited = typeof navigator === 'undefined' ||
    (navigator.hardwareConcurrency ?? 8) <= 4 ||
    (navigator.deviceMemory ?? 8) <= 4 || Boolean(navigator.connection?.saveData)
  const [ceiling, setCeiling] = useState(2)
  const level = Math.min(ceiling, limited ? 0 : mobile || coarse ? 1 : 2)
  const name = ['low', 'medium', 'high'][level]
  const downgrade = useCallback(() => setCeiling((value) => Math.max(0, value - 1)), [])
  return { ...qualityLevels[name], name, mobile, coarse, downgrade }
}
