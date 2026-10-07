import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function RouteEffects(): null {
  const { key, hash } = useLocation()
  const previousKey = useRef(key)

  useEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => { window.history.scrollRestoration = previous }
  }, [])

  useLayoutEffect(() => {
    if (previousKey.current === key && !hash) return
    previousKey.current = key
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        const heading = target.querySelector<HTMLElement>('h1, h2, h3') ?? target
        heading.setAttribute('tabindex', '-1')
        heading.focus({ preventScroll: true })
        target.scrollIntoView({ behavior: 'instant', block: 'start' })
        return
      }
    }
    const main = document.getElementById('main-content')
    const heading = main?.querySelector<HTMLElement>('h1') ?? main
    heading?.setAttribute('tabindex', '-1')
    heading?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [key, hash])

  useEffect(() => {
    if (!window.matchMedia || !window.IntersectionObserver) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const blocks = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.reveal = 'visible'
          observer.unobserve(entry.target)
        }
      }
    }, { threshold: 0.05, rootMargin: '0px 0px -24px 0px' })

    function revealFocused(event: FocusEvent) {
      const block = (event.target as HTMLElement).closest<HTMLElement>('[data-reveal]')
      if (block) {
        block.dataset.reveal = 'visible'
        observer.unobserve(block)
      }
    }

    function syncMotion() {
      observer.disconnect()
      for (const block of blocks) {
        // Keep initial viewport content visible; enhance only later blocks.
        if (motion.matches || block.getBoundingClientRect().top < window.innerHeight) {
          block.dataset.reveal = 'visible'
        } else {
          block.dataset.reveal = 'pending'
          observer.observe(block)
        }
      }
    }

    syncMotion()
    document.addEventListener('focusin', revealFocused)
    motion.addEventListener('change', syncMotion)
    return () => {
      observer.disconnect()
      document.removeEventListener('focusin', revealFocused)
      motion.removeEventListener('change', syncMotion)
      for (const block of blocks) block.dataset.reveal = ''
    }
  }, [key])

  return null
}
