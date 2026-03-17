import { useEffect, useRef } from 'react'
import './Cursor.css'

function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafId = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dot.style.display = 'none'
      ring.style.display = 'none'
      document.body.style.cursor = 'auto'
      return
    }

    function onMouseMove(e) {
      mousePos.current = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
    }

    function onMouseOver(e) {
      const isPointer = e.target.closest('a, button, [data-cursor="pointer"]')
      ring.classList.toggle('cursor-ring--hover', !!isPointer)
    }

    function onMouseDown() {
      dot.classList.add('cursor-dot--click')
    }

    function onAnimationEnd() {
      dot.classList.remove('cursor-dot--click')
    }

    function animate() {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12
      ring.style.left = ringPos.current.x + 'px'
      ring.style.top = ringPos.current.y + 'px'
      rafId.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mousedown', onMouseDown)
    dot.addEventListener('animationend', onAnimationEnd)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mousedown', onMouseDown)
      dot.removeEventListener('animationend', onAnimationEnd)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}

export default Cursor
