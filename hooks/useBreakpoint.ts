import { useState, useEffect } from 'react'

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

export function useBreakpoint(breakpoint: keyof typeof breakpoints) {
  const [isAbove, setIsAbove] = useState(false)

  useEffect(() => {
    const checkBreakpoint = () => {
      setIsAbove(window.innerWidth >= breakpoints[breakpoint])
    }

    checkBreakpoint()
    window.addEventListener('resize', checkBreakpoint)
    return () => window.removeEventListener('resize', checkBreakpoint)
  }, [breakpoint])

  return isAbove
} 