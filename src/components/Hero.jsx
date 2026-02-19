import { useState, useEffect } from 'react'
import { Target, Trophy, MapPin, Sparkles, Calendar, Gamepad2 } from 'lucide-react'
import './Hero.css'

export default function Hero({ onRegister }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
        const eventDate = new Date('2026-04-08T09:00:00+05:30').getTime()

        const timer = setInterval(() => {
            const now = Date.now()
            const diff = eventDate - now

            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
                clearInterval(timer)
                return
            }

            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <section id="home" className="hero">
            {/* Animated particles — more for density */}
            <div className="hero__particles">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className="hero__particle" style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${3 + Math.random() * 4}s`,
                    }} />
                ))}
            </div>

            {/* Left side decorations */}
            <div className="hero__side-left">
                <div className="hero__orb hero__orb--1"></div>
                <div className="hero__orb hero__orb--2"></div>
                <div className="hero__deco-line hero__deco-line--left">
                    <span></span><span></span><span></span>
                </div>
                <div className="hero__geo hero__geo--1"></div>
                <div className="hero__float-tag hero__float-tag--left glass-card" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Target size={16} color="#d4a017" /> 4 Events
                </div>
            </div>

            {/* Right side decorations */}
            <div className="hero__side-right">
                <div className="hero__orb hero__orb--3"></div>
                <div className="hero__orb hero__orb--4"></div>
                <div className="hero__deco-line hero__deco-line--right">
                    <span></span><span></span><span></span>
                </div>
                <div className="hero__geo hero__geo--2"></div>
                <div className="hero__float-tag hero__float-tag--right glass-card" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Trophy size={16} color="#d4a017" /> ₹20K+ Prizes
                </div>
            </div>

            <div className="hero__content container">
                <div className="hero__badge">
                    <span className="hero__badge-dot"></span>
                    Department of Computer Science & Engineering
                </div>

                <div className="hero__logo-wrapper">
                    <img src="/ace-logo.png" alt="ACE - Association of Computer Engineers" className="hero__logo-img" />
                </div>

                <h1 className="hero__title">
                    <span className="hero__title-sanketika">SANKETIKA</span>
                    <span className="hero__title-year">2026</span>
                </h1>

                <p className="hero__subtitle">
                    A Two Day National Level Technical & Non-Technical Fest
                </p>
                <p className="hero__venue" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <MapPin size={18} color="#d4a017" /> Lords Institute of Engineering & Technology
                </p>

                <div className="hero__countdown">
                    {[
                        { value: timeLeft.days, label: 'Days' },
                        { value: timeLeft.hours, label: 'Hours' },
                        { value: timeLeft.minutes, label: 'Minutes' },
                        { value: timeLeft.seconds, label: 'Seconds' },
                    ].map(item => (
                        <div key={item.label} className="hero__countdown-item glass-card">
                            <span className="hero__countdown-value">{String(item.value).padStart(2, '0')}</span>
                            <span className="hero__countdown-label">{item.label}</span>
                        </div>
                    ))}
                </div>

                <div className="hero__actions">
                    <button className="btn-primary" onClick={onRegister}>
                        <Sparkles size={18} /> Register Now
                    </button>
                    <a href="#events" className="btn-secondary" onClick={(e) => {
                        e.preventDefault()
                        document.querySelector('#events')?.scrollIntoView({ behavior: 'smooth' })
                    }}>
                        Explore Events →
                    </a>
                </div>

                <div className="hero__dates">
                    <div className="hero__date-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={16} color="#d4a017" /> 8 & 9 April 2026
                    </div>
                    <div className="hero__date-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Trophy size={16} color="#d4a017" /> Prize Pool ₹20,000+
                    </div>
                    <div className="hero__date-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Gamepad2 size={16} color="#d4a017" /> Gaming Arena
                    </div>
                </div>
            </div>

            <div className="hero__scroll-indicator">
                <div className="hero__scroll-mouse">
                    <div className="hero__scroll-dot"></div>
                </div>
                <span>Scroll Down</span>
            </div>
        </section>
    )
}
