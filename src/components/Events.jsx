import { useState } from 'react'
import './Events.css'
import { BrainCircuit, Palette, Terminal, Users, Trophy, MessageCircle } from 'lucide-react'

const EVENTS = [
    {
        id: 'ai-prompt',
        icon: BrainCircuit,
        image: '/images/event-ai-wide.png',
        title: 'AI Prompt Engineering Challenge',
        description: 'Test your AI mastery! Craft intelligent prompts to generate stunning outputs using cutting-edge AI tools. Push the boundaries of what AI can create.',
        category: 'Technical',
        prize: '₹5,000',
        team: 'Individual / Team of 2',
        studentCoords: ['Fizra Fathima', 'Syed Imad uddin'],
        facultyCoords: ['Mr. Najeemulla Baig', 'Mr. Ryan Husain'],
        whatsapp: 'https://wa.me/91XXXXXXXXXX' // Add your specific whatsapp link here if different per event
    },
    {
        id: 'poster-making',
        icon: Palette,
        image: '/images/event-poster-wide.png',
        title: 'Poster Making',
        description: 'Unleash your artistic vision! Design powerful posters that communicate ideas through creativity, color, and composition. Digital & traditional both welcome.',
        category: 'Non-Technical',
        prize: '₹3,000',
        team: 'Individual',
        studentCoords: ['Zohair Shahid Khan', 'Samad'],
        facultyCoords: ['Ms. Sweta P', 'Madiha Banu'],
        whatsapp: 'https://wa.me/91XXXXXXXXXX'
    },
    {
        id: 'code-in-chaos',
        icon: Terminal,
        image: '/images/event-code-wide.png',
        title: 'Code in Chaos',
        description: 'Can you code under pressure? Debug, solve, and conquer chaotic programming challenges in a high-intensity battle of logic and speed.',
        category: 'Technical',
        prize: '₹5,000',
        team: 'Individual / Team of 2',
        studentCoords: ['Thaizia', 'Aamina Bushra'],
        facultyCoords: ['Ms. Mayuri Tone', 'Ms. Bhavana'],
        whatsapp: 'https://wa.me/91XXXXXXXXXX'
    },
    {
        id: 'instagram-reel-making',
        icon: Palette,
        image: '/images/event-reel-wide.png',
        title: 'Instagram Reel Making',
        description: 'Display your creativity and editing skills! Create an engaging, short-form Instagram Reel on a given theme. Bring out the trendsetter in you.',
        category: 'Non-Technical',
        prize: '₹3,000',
        team: 'Individual / Team of 2',
        studentCoords: ['Abdul Rahman', 'Mohammed Taqee'],
        facultyCoords: ['Dr. Rizwan', 'Ms. Saniya'],
        whatsapp: 'https://wa.me/91XXXXXXXXXX'
    },
]

export default function Events({ onRegister }) {
    const [flippedCardId, setFlippedCardId] = useState(null)

    const handleFlip = (id, e) => {
        // Prevent flipping if clicking the register button on the front
        if (e && e.target.closest('button')) return
        setFlippedCardId(flippedCardId === id ? null : id)
    }

    return (
        <section id="events" className="events">
            <div className="container">
                <div className="reveal">
                    <h2 className="section-title">Events & Competitions</h2>
                    <p className="section-subtitle">
                        Explore our electrifying lineup of 4 flagship events at SANKETIKA 2026
                    </p>
                </div>

                <div className="events__grid">
                    {EVENTS.map((event, index) => (
                        <div
                            key={event.id}
                            className={`events__card reveal ${flippedCardId === event.id ? 'is-flipped' : ''}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="events__card-inner">
                                {/* FRONT FACE */}
                                <div className="events__card-front">
                                    <div className="events__card-img-box" onClick={(e) => handleFlip(event.id, e)}>
                                        <img src={event.image} alt={event.title} className="events__card-img" />
                                        <span className={`events__card-category events__card-category--${event.category.toLowerCase()}`}>
                                            {event.category}
                                        </span>
                                    </div>

                                    <div className="events__card-content">
                                        <div className="events__card-header">
                                            <span className="events__card-icon"><event.icon size={26} strokeWidth={1.5} /></span>
                                            <h3 className="events__card-title">{event.title}</h3>
                                        </div>
                                        <p className="events__card-desc">{event.description}</p>

                                        <div className="events__card-coordinators">
                                            <div className="events__coord-group">
                                                <span className="events__coord-label">
                                                    <Users size={12} className="events__coord-icon" /> Student Coordinators
                                                </span>
                                                <div className="events__coord-names">
                                                    {event.studentCoords.map(name => (
                                                        <span key={name} className="events__coord-chip">{name}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="events__coord-group">
                                                <span className="events__coord-label">
                                                    <Users size={12} className="events__coord-icon" /> Faculty Coordinators
                                                </span>
                                                <div className="events__coord-names">
                                                    {event.facultyCoords.map(name => (
                                                        <span key={name} className="events__coord-chip events__coord-chip--faculty">{name}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="events__card-meta">
                                            <div className="events__card-meta-item">
                                                <span className="events__card-meta-label">Prize</span>
                                                <span className="events__card-meta-value">{event.prize}</span>
                                            </div>
                                            <div className="events__card-meta-item">
                                                <span className="events__card-meta-label">Team</span>
                                                <span className="events__card-meta-value">{event.team}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="btn-primary events__card-btn"
                                        style={{ borderRadius: '0 0 var(--radius-lg) var(--radius-lg)' }}
                                        onClick={() => onRegister(event.title)}
                                    >
                                        Register →
                                    </button>
                                </div>

                                {/* BACK FACE */}
                                <div className="events__card-back">
                                    <div className="events__back-header events__slide-up delay-1">
                                        <h3 className="events__back-title">{event.title}</h3>
                                        <button className="events__close-btn" onClick={(e) => { e.stopPropagation(); setFlippedCardId(null) }}>
                                            &times;
                                        </button>
                                    </div>

                                    <div className="events__back-details events__slide-up delay-1">
                                        <p>{event.description}</p>

                                        <ul className="events__back-info-list">
                                            <li>
                                                <span className="events__back-info-label">Category</span>
                                                <span className="events__back-info-value">{event.category}</span>
                                            </li>
                                            <li>
                                                <span className="events__back-info-label">Team Size</span>
                                                <span className="events__back-info-value">{event.team}</span>
                                            </li>
                                            <li>
                                                <span className="events__back-info-label">Prize Pool</span>
                                                <span className="events__back-info-value">{event.prize}</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="events__contact-box events__slide-up delay-2">
                                        <div className="events__contact-text">
                                            Questions? Contact coordinators directly:
                                        </div>
                                        <a href={event.whatsapp} target="_blank" rel="noopener noreferrer" className="events__whatsapp-btn">
                                            <MessageCircle size={18} /> WhatsApp Support
                                        </a>
                                    </div>

                                    <div className="events__slide-up delay-3">
                                        <button
                                            className="events__register-big"
                                            onClick={() => onRegister(event.title)}
                                        >
                                            REGISTER NOW FREE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
