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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    return () => {
      window.removeEventListener('hashchange', checkHash)
      observer.disconnect()
    }
  }, [isAdmin])

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
