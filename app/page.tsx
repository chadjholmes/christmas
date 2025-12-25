'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<'start' | 'modal1' | 'modal2' | 'modal3' | 'modal4' | 'reveal'>('start')
  const [curtainsVisible, setCurtainsVisible] = useState(false)
  const [curtainsOpen, setCurtainsOpen] = useState(false)
  const [spotlightActive, setSpotlightActive] = useState(false)
  const [contentActive, setContentActive] = useState(false)
  const [showMusicButton, setShowMusicButton] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  const startExperience = () => {
    setCurrentScreen('modal1')
  }

  const nextModal = (next: 'modal2' | 'modal3' | 'modal4') => {
    setCurrentScreen(next)
  }

  const showReveal = () => {
    setCurrentScreen('reveal')
    setCurtainsVisible(true)

    // Play music
    if (audioRef.current) {
      audioRef.current.volume = 0.7
      audioRef.current.play().catch(() => {
        setShowMusicButton(true)
      })
    }

    // Open curtains
    setTimeout(() => {
      setCurtainsOpen(true)
    }, 800)

    // Show spotlight
    setTimeout(() => {
      setSpotlightActive(true)
    }, 1500)

    // Show content
    setTimeout(() => {
      setContentActive(true)
    }, 1000)

    // Create particles
    createParticles()
  }

  const createParticles = () => {
    if (!particlesRef.current) return
    const container = particlesRef.current
    container.innerHTML = ''

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.width = (Math.random() * 6 + 2) + 'px'
      particle.style.height = particle.style.width
      particle.style.animationDelay = (Math.random() * 8) + 's'
      particle.style.animationDuration = (Math.random() * 4 + 6) + 's'
      container.appendChild(particle)
    }
  }

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setShowMusicButton(false)
    }
  }

  const addToCalendar = () => {
    const title = 'The Phantom of the Opera'
    const description = 'A special night at the opera!'
    const location = ''
    const startDate = '20260412T183000'
    const endDate = '20260412T213000'

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Phantom Surprise//EN',
      'BEGIN:VEVENT',
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    // Create blob and download
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    // Create a temporary link and click it
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'phantom-of-the-opera.ics')
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }, 100)
  }

  return (
    <>
      {/* Audio Player */}
      <audio ref={audioRef} loop>
        <source src="/phantom.mp3" type="audio/mpeg" />
      </audio>

      {/* Start Screen */}
      <div className={`start-screen ${currentScreen !== 'start' ? 'hidden' : ''}`}>
        <div className="mask-icon">🎭</div>
        <h1 className="start-title">A Message Awaits</h1>
        <p className="start-subtitle">For Sophia</p>
        <button className="btn" onClick={startExperience}>Begin</button>
      </div>

      {/* Modal 1: Turn up volume */}
      <div className={`modal-overlay ${currentScreen === 'modal1' ? 'active' : ''}`}>
        <div className="modal">
          <div className="modal-icon">🔊</div>
          <h2>Turn Up Your Volume</h2>
          <p>This experience is best enjoyed with sound. Please turn your volume up.</p>
          <button className="btn" onClick={() => nextModal('modal2')}>Done</button>
        </div>
      </div>

      {/* Modal 2: Confirm volume */}
      <div className={`modal-overlay ${currentScreen === 'modal2' ? 'active' : ''}`}>
        <div className="modal">
          <div className="modal-icon">🎵</div>
          <h2>Volume Check</h2>
          <p>Is your volume turned up?</p>
          <button className="btn" onClick={() => nextModal('modal3')}>Yes, It&apos;s Up!</button>
        </div>
      </div>

      {/* Modal 3: Are you sure */}
      <div className={`modal-overlay ${currentScreen === 'modal3' ? 'active' : ''}`}>
        <div className="modal">
          <div className="modal-icon">🎭</div>
          <h2>Are You Ready?</h2>
          <p>Are you sure you&apos;re ready to see what awaits?</p>
          <button className="btn" onClick={() => nextModal('modal4')}>I&apos;m Ready</button>
        </div>
      </div>

      {/* Modal 4: Prepare to be dazzled */}
      <div className={`modal-overlay ${currentScreen === 'modal4' ? 'active' : ''}`}>
        <div className="modal">
          <div className="modal-icon">✨</div>
          <h2>Prepare to be Dazzled</h2>
          <p>The curtain is about to rise...</p>
          <button className="btn" onClick={showReveal}>Reveal</button>
        </div>
      </div>

      {/* Curtain */}
      <div className={`curtain ${curtainsVisible ? 'visible' : ''} ${curtainsOpen ? 'open' : ''}`}></div>

      {/* Reveal Section */}
      <div className={`reveal-section ${currentScreen === 'reveal' ? 'active' : ''}`}>
        <div className={`spotlight ${spotlightActive ? 'active' : ''}`}></div>
        <div className="particles" ref={particlesRef}></div>

        <div className={`reveal-content ${contentActive ? 'active' : ''}`}>
          <h1 className="reveal-title">Sophia...</h1>

          <div className="reveal-image-container">
            <img
              src="/phantom.png"
              alt="The Phantom of the Opera"
              className="reveal-image"
            />
          </div>

          <p className="reveal-message">
            You&apos;re going to see<br />
            <strong style={{ color: '#c9a227', fontSize: '1.3em' }}>The Phantom of the Opera!</strong>
          </p>

          <div className="date-card">
            <div className="date-card-content">
              <div className="date-card-date">
                <span>📅</span>
                <span>Sunday, April 12, 2026</span>
              </div>
              <div className="date-card-time">
                <span>🕡</span>
                <span>6:30 PM</span>
              </div>
            </div>
            <div className="date-card-footer">
              <button className="calendar-btn" onClick={addToCalendar}>
                Add to Calendar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Music Button (shown if autoplay blocked) */}
      {showMusicButton && (
        <button className="music-btn" onClick={playMusic}>
          🎵 Tap to Play Music
        </button>
      )}
    </>
  )
}
