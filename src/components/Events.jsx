import './Events.css'
import { BrainCircuit, Palette, Terminal, Gamepad2, Users, Trophy } from 'lucide-react'

const EVENTS = [
    {
        id: 'ai-prompt',
        icon: BrainCircuit,
        image: '/event-ai.png',
        title: 'AI Prompt Engineering Challenge',
        description: 'Test your AI mastery! Craft intelligent prompts to generate stunning outputs using cutting-edge AI tools. Push the boundaries of what AI can create.',
        category: 'Technical',
        prize: '₹5,000',
        team: 'Individual / Team of 2',
        studentCoords: ['Fizra Fathima', 'Syed Imad uddin'],
        facultyCoords: ['Mr. Najeemulla Baig', 'Mr. Ryan Husain'],
    },
    {
        id: 'poster-making',
        icon: Palette,
        image: '/event-poster.png',
        title: 'Poster Making',
        description: 'Unleash your artistic vision! Design powerful posters that communicate ideas through creativity, color, and composition. Digital & traditional both welcome.',
        category: 'Non-Technical',
        prize: '₹3,000',
        team: 'Individual',
        studentCoords: ['Zohair Shahid Khan', 'Samad'],
        facultyCoords: ['Ms. Sweta P', 'Madiha Banu'],
    },
    {
        id: 'code-in-chaos',
        icon: Terminal,
        image: '/event-code.png',
        title: 'Code in Chaos',
        description: 'Can you code under pressure? Debug, solve, and conquer chaotic programming challenges in a high-intensity battle of logic and speed.',
        category: 'Technical',
        prize: '₹5,000',
        team: 'Individual / Team of 2',
        studentCoords: ['Thaizia', 'Aamina Bushra'],
        facultyCoords: ['Ms. Mayuri Tone', 'Ms. Bhavana'],
    },
    {
        id: 'game-arena',
        icon: Gamepad2,
        image: '/event-game.png',
        title: 'The Game Arena',
        description: 'BGMI, Free Fire & more! Compete in the ultimate gaming showdown. Assemble your squad, strategize, and dominate the battlefield to claim victory.',
        category: 'Gaming',
        prize: '₹5,000',
        team: 'Squad (4 Players)',
        studentCoords: ['Abdul Rahman', 'Mohammed Taqee'],
        facultyCoords: ['Dr. Rizwan', 'Ms. Saniya'],
    },
]

export default function Events({ onRegister }) {
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
                        <div key={event.id} className="events__card glass-card reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="events__card-img-box">
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
                                onClick={() => onRegister(event.title)}
                            >
                                Register →
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
