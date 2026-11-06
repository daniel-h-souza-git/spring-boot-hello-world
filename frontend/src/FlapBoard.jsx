import { useEffect, useRef, useState } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?,.'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Uma letra: ao mudar, passa por alguns caracteres aleatórios antes de assentar.
function Flap({ char, delay }) {
  const [shown, setShown] = useState(' ')
  const [tick, setTick] = useState(0)
  const shownRef = useRef(' ')

  useEffect(() => {
    const settle = (value) => {
      shownRef.current = value
      setShown(value)
      setTick((t) => t + 1)
    }
    if (shownRef.current === char) return
    if (prefersReducedMotion()) {
      shownRef.current = char
      setShown(char)
      return
    }
    const steps = 4 + Math.floor(Math.random() * 4)
    const timers = []
    for (let i = 0; i < steps; i++) {
      const last = i === steps - 1
      timers.push(
        setTimeout(
          () => settle(last ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]),
          delay + i * 55,
        ),
      )
    }
    return () => timers.forEach(clearTimeout)
  }, [char, delay])

  return (
    <span className="flap" aria-hidden="true">
      <span key={tick} className="flap-face">
        {shown === ' ' ? ' ' : shown}
      </span>
    </span>
  )
}

export default function FlapBoard({ text, tone = 'ok' }) {
  const words = text.toUpperCase().split(' ')
  let index = 0

  return (
    <div className={`board board-${tone}`} role="status" aria-live="polite">
      <span className="sr-only">{text}</span>
      <div className="words" aria-hidden="true">
        {words.map((word, w) => (
          <span className="word" key={`${w}-${word}`}>
            {[...word].map((char, c) => (
              <Flap key={c} char={char} delay={index++ * 40} />
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
