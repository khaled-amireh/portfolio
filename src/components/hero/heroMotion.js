export const introTiming = {
  eyebrow: 1.6,
  firstName: 1.8,
  lastName: 1.95,
  statement: 2.15,
  description: 2.3,
  actions: 2.45,
  details: 2.6,
}

export function createCinematicState() {
  return { formation: 0, activation: 0, eyes: 0, pulse: -5, progress: 0, entranceDone: false }
}
