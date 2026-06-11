// Apple-inspired easing — deliberate, confident
export const ease = [0.25, 0.46, 0.45, 0.94]

export const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease } },
}

export const slideLeft = {
  hidden:  { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
}

export const slideRight = {
  hidden:  { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
}

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } },
}

export const staggerContainer = (stagger = 0.12, delayChildren = 0) => ({
  hidden:  {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

export const cardVariant = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}

export const lineGrow = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease } },
}

export const counterSpring = {
  type: 'spring',
  stiffness: 60,
  damping: 15,
}
