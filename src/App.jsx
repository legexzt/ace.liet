import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Events from './components/Events'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'
import Team from './components/Team'
import Sponsors from './components/Sponsors'
import Footer from './components/Footer'
import RegisterModal from './components/RegisterModal'
import AdminPanel from './admin/AdminPanel'

function App() {
  const [showRegister, setShowRegister] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (window.location.hash === '#admin') {
      setIsAdmin(true)
    }
    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [isAdmin])

  const openRegister = (eventName = '') => {
    setSelectedEvent(eventName)
    setShowRegister(true)
  }

  if (isAdmin) {
    return <AdminPanel onExit={() => { setIsAdmin(false); window.location.hash = '' }} />
  }

  return (
    <>
      <Navbar onRegister={() => openRegister()} />
      <Hero onRegister={() => openRegister()} />
      <About />
      <Events onRegister={openRegister} />
      <Timeline />
      <Gallery />
      <Team />
      <Sponsors />
      <Footer />
      {showRegister && (
        <RegisterModal
          event={selectedEvent}
          onClose={() => setShowRegister(false)}
        />
      )}
    </>
  )
}

export default App
