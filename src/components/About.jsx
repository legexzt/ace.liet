import { useEffect, useRef } from 'react'
import { Target, Lightbulb, Rocket } from 'lucide-react'
import './About.css'

const STATS = [
    { value: 500, suffix: '+', label: 'Participants' },
    { value: 4, suffix: '', label: 'Events' },
    { value: 2, suffix: '', label: 'Days' },
    { value: 20, suffix: 'K+', label: 'Prize Pool ₹' },
    { value: 50, suffix: '+', label: 'Colleges' },
]

export default function About() {
    const statsRef = useRef(null)
    const animated = useRef(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !animated.current) {
                        animated.current = true
                        animateCounters()
                    }
                })
            },
            { threshold: 0.3 }
        )
        if (statsRef.current) observer.observe(statsRef.current)
        return () => observer.disconnect()
    }, [])

    const animateCounters = () => {
        const counters = document.querySelectorAll('.about__stat-value')
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'))
            const duration = 2000
            const start = performance.now()

            const animate = (now) => {
                const elapsed = now - start
                const progress = Math.min(elapsed / duration, 1)
                const eased = 1 - Math.pow(1 - progress, 3)
                counter.textContent = Math.floor(target * eased)
                if (progress < 1) requestAnimationFrame(animate)
                else counter.textContent = target
            }
            requestAnimationFrame(animate)
        })
    }

    return (
        <section id="about" className="about">
            {/* Animated Background */}
            <div className="about__bg">
                <div className="about__orb about__orb--1"></div>
                <div className="about__orb about__orb--2"></div>
                <div className="about__orb about__orb--3"></div>
                <div className="about__particles">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="about__particle" style={{
                            '--delay': `${Math.random() * 5}s`,
                            '--duration': `${10 + Math.random() * 10}s`,
                            '--x': `${Math.random() * 100}%`,
                            '--y': `${Math.random() * 100}%`,
                        }}></div>
                    ))}
                </div>
            </div>

            <div className="container">
                <div className="reveal">
                    <h2 className="section-title">About Sanketika</h2>
                    <p className="section-subtitle">
                        A premier technical extravaganza organized by the Association of Computer Engineers
                    </p>
                </div>

                <div className="about__grid reveal">
                    <div className="about__info glass-card">
                        <div className="about__info-icon">
                            <Target size={32} color="#d4a017" strokeWidth={1.5} />
                        </div>
                        <h3>What is Sanketika?</h3>
                        <p>
                            Sanketika is a Two Day National Level Technical & Non-Technical Fest organized by
                            <strong> ACE (Association of Computer Engineers)</strong>, Department of Computer Science & Engineering
                            at Lords Institute of Engineering & Technology. It brings together the brightest minds
                            from across the nation to compete, learn, and innovate.
                        </p>
                    </div>

                    <div className="about__info glass-card">
                        <div className="about__info-icon">
                            <Lightbulb size={32} color="#d4a017" strokeWidth={1.5} />
                        </div>
                        <h3>What is ACE?</h3>
                        <p>
                            ACE is the official club of the CSE Department at LIET, dedicated to fostering
                            technical excellence and innovation. With departments spanning Event Management,
                            Graphics, Marketing, Operations, Sponsorship, Documentation, and Photography —
                            ACE is a powerhouse of student talent driving the tech community forward.
                        </p>
                    </div>

                    <div className="about__info glass-card">
                        <div className="about__info-icon">
                            <Rocket size={32} color="#d4a017" strokeWidth={1.5} />
                        </div>
                        <h3>What's New in 2026?</h3>
                        <p>
                            From AI Prompt Engineering to an intense Gaming Arena, from creative Poster Making
                            to the chaotic Code in Chaos — SANKETIKA 2026 brings 4 power-packed events
                            across 2 days. Each event is designed to challenge your skills, creativity,
                            and competitive spirit!
                        </p>
                    </div>
                </div>

                <div className="about__stats reveal" ref={statsRef}>
                    {STATS.map(stat => (
                        <div key={stat.label} className="about__stat glass-card">
                            <span className="about__stat-value" data-target={stat.value}>0</span>
                            <span className="about__stat-suffix">{stat.suffix}</span>
                            <span className="about__stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
