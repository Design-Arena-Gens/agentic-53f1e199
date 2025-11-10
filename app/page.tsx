'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Scene {
  id: number
  duration: number
  background: string
  title?: string
  subtitle?: string
  narration?: string
  dialogue?: string
  speaker?: string
  mood: string
}

const scenes: Scene[] = [
  {
    id: 0,
    duration: 8000,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    title: 'Gunahon Ka Devta',
    subtitle: 'The God of Sins',
    narration: 'In the lanes of Allahabad, where love met sacrifice, lived a man — Chander.',
    mood: 'nostalgic'
  },
  {
    id: 1,
    duration: 9000,
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    dialogue: 'Chander… tum itne chup kyu rehte ho?',
    speaker: 'Sudha',
    narration: 'He loved her — deeply, silently, purely…',
    mood: 'tender'
  },
  {
    id: 2,
    duration: 13000,
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    narration: 'But fate had other plans. Sudha was promised to another.',
    mood: 'tension'
  },
  {
    id: 3,
    duration: 10000,
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    dialogue: 'Main tumhe kabhi nahi bhool sakti, Chander.',
    speaker: 'Sudha',
    narration: 'She married, but the heart remembers what the world forgets.',
    mood: 'sacrifice'
  },
  {
    id: 4,
    duration: 12000,
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    narration: 'Years passed. Sudha\'s life crumbled. Her husband left. Society judged.',
    mood: 'tragedy'
  },
  {
    id: 5,
    duration: 10000,
    background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    dialogue: 'Chander… kya tum mujhe maaf kar sakte ho?',
    speaker: 'Sudha',
    narration: 'And Chander? He never stopped loving her.',
    mood: 'devotion'
  },
  {
    id: 6,
    duration: 8000,
    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    narration: 'In a world that called them sinners, their love remained the purest truth.',
    mood: 'closure'
  },
  {
    id: 7,
    duration: 10000,
    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    title: 'Gunahon Ka Devta',
    narration: 'A timeless tale of unfulfilled love and silent devotion.',
    subtitle: 'Read the classic. Feel the legacy.',
    mood: 'epilogue'
  }
]

export default function GunahonKaDevta() {
  const [currentScene, setCurrentScene] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const startTimeRef = useRef<number>(Date.now())
  const animationFrameRef = useRef<number>()

  const totalDuration = scenes.reduce((acc, scene) => acc + scene.duration, 0)

  useEffect(() => {
    startTimeRef.current = Date.now()
    let sceneStartTime = Date.now()
    let currentSceneIndex = 0
    let accumulatedTime = 0

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current
      const progressPercent = Math.min((elapsed / totalDuration) * 100, 100)
      setProgress(progressPercent)

      const sceneElapsed = Date.now() - sceneStartTime

      if (sceneElapsed >= scenes[currentSceneIndex].duration) {
        accumulatedTime += scenes[currentSceneIndex].duration
        currentSceneIndex++

        if (currentSceneIndex < scenes.length) {
          setCurrentScene(currentSceneIndex)
          sceneStartTime = Date.now()
        } else {
          setIsComplete(true)
          return
        }
      }

      animationFrameRef.current = requestAnimationFrame(updateProgress)
    }

    animationFrameRef.current = requestAnimationFrame(updateProgress)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const handleReplay = () => {
    setCurrentScene(0)
    setProgress(0)
    setIsComplete(false)
    startTimeRef.current = Date.now()
  }

  const scene = scenes[currentScene]

  return (
    <main style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: scene.background,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="overlay" />
          <div className="content">
            {scene.title && (
              <motion.h1
                className="title"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {scene.title}
              </motion.h1>
            )}

            {scene.subtitle && (
              <motion.h2
                className="subtitle"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                {scene.subtitle}
              </motion.h2>
            )}

            {scene.dialogue && (
              <motion.p
                className="dialogue"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                "{scene.dialogue}"
                {scene.speaker && <span style={{ display: 'block', fontSize: '1.2rem', marginTop: '10px', color: '#fff' }}>— {scene.speaker}</span>}
              </motion.p>
            )}

            {scene.narration && (
              <motion.p
                className="narration"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: scene.dialogue ? 1 : 0.8 }}
              >
                {scene.narration}
              </motion.p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="progress-bar" style={{ width: `${progress}%` }} />

      <button
        className="sound-control"
        onClick={() => setIsMuted(!isMuted)}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      <button
        className={`replay-button ${isComplete ? 'visible' : ''}`}
        onClick={handleReplay}
      >
        ↻ Replay
      </button>
    </main>
  )
}
