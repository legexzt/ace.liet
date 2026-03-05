import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Events from './components/Events'
import Gallery from './components/Gallery'
import Team from './components/Team'
import Sponsors from './components/Sponsors'
import Footer from './components/Footer'
import AdminPanel from './admin/AdminPanel'
import RegisterPage from './pages/RegisterPage'

function App() {
  const [showRegister, setShowRegister] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkHash = () => setIsAdmin(window.location.hash === '#admin')
    checkHash()
    window.addEventListener('hashchange', checkHash)

    // Only observe elements once on mount
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // Unobserve after it becomes visible to stop unnecessary calculations
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    // Use a small timeout to ensure DOM nodes are ready
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    }, 100)

    return () => {
      window.removeEventListener('hashchange', checkHash)
      observer.disconnect()
    }
  }, []) // Empty dependency array means this runs ONCE on mount, fixing massive scroll lag

  const openRegister = () => {
    setShowRegister(true)
    window.scrollTo(0, 0)
  }

  if (isAdmin) {
    return <AdminPanel onExit={() => { setIsAdmin(false); window.location.hash = '' }} />
  }

  if (showRegister) {
    return <RegisterPage onBack={() => setShowRegister(false)} />
  }

  return (
    <>
      <Navbar onRegister={openRegister} />
      <Hero onRegister={openRegister} />
      <About />
      <Events onRegister={openRegister} />
      <Gallery />
      <Team />
      <Sponsors />
      <Footer />
    </>
  )
}

export default App
