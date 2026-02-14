import './Events.css'

const EVENTS = [
    {
        id: 'web-design',
        icon: '🌐',
        title: 'Static Web Page Designing',
        description: 'Showcase your web development skills by creating stunning static web pages. Compete with the best developers from across the nation.',
        category: 'Technical',
        prize: '₹3,000',
        team: 'Individual / Team of 2',
    },
    {
        id: 'prompt-to-pixel',
        icon: '🎨',
        title: 'Prompt-to-PIXEL',
        description: 'AI Image Generation challenge using Midjourney, DALL·E, and Leonardo AI. Transform text prompts into breathtaking visual masterpieces.',
        category: 'Technical',
        prize: '₹3,000',
        team: 'Individual',
    },
    {
        id: 'langchain-workshop',
        icon: '🤖',
        title: 'LangChain & RAG Workshop',
        description: 'Deep dive into LLMs, Retrieval-Augmented Generation, Prompt Engineering, Vector Databases, and Agentic AI with industry experts.',
        category: 'Workshop',
        prize: 'Certificate',
        team: 'Individual',
    },
    {
        id: 'short-film',
        icon: '🎬',
        title: 'Short Film Making',
        description: 'Unleash your directorial and creative talent. Create compelling short films that tell powerful stories and captivate audiences.',
        category: 'Non-Technical',
        prize: '₹3,000',
        team: 'Team of 3-5',
    },
    {
        id: 'speaker-sessions',
        icon: '🎤',
        title: 'Speaker Sessions',
        description: 'Gain insights from industry leaders and tech pioneers. Interactive sessions covering the latest trends in technology and entrepreneurship.',
        category: 'Special',
        prize: 'Networking',
        team: 'Open to All',
    },
    {
        id: 'codestorm',
        icon: '⚡',
        title: 'CodeStorm Challenge',
        description: 'The ultimate coding competition. Solve complex algorithmic problems under pressure and prove your coding prowess against the best.',
        category: 'Technical',
        prize: '₹3,000',
        team: 'Individual / Team of 2',
    },
]

export default function Events({ onRegister }) {
    return (
        <section id="events" className="events">
            <div className="container">
                <div className="reveal">
                    <h2 className="section-title">Events & Competitions</h2>
                    <p className="section-subtitle">
                        Explore our exciting lineup of technical and non-technical events under CodeStorm
                    </p>
                </div>

                <div className="events__grid">
                    {EVENTS.map((event, index) => (
                        <div key={event.id} className="events__card glass-card reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="events__card-header">
                                <span className="events__card-icon">{event.icon}</span>
                                <span className={`events__card-category events__card-category--${event.category.toLowerCase()}`}>
                                    {event.category}
                                </span>
                            </div>
                            <h3 className="events__card-title">{event.title}</h3>
                            <p className="events__card-desc">{event.description}</p>
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
