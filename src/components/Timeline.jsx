import './Timeline.css'

const TIMELINE_DATA = [
    {
        day: 'Day 1 — April 24, 2026',
        events: [
            { time: '09:00 AM', title: 'Inauguration Ceremony', desc: 'Grand opening with Chief Guest & ACE faculty', icon: '🎪' },
            { time: '10:00 AM', title: 'CodeStorm Kickoff', desc: 'Web Page Designing & Prompt-to-PIXEL begin', icon: '⚡' },
            { time: '11:30 AM', title: 'Speaker Session I', desc: 'Industry expert keynote on AI/ML trends', icon: '🎤' },
            { time: '01:00 PM', title: 'Lunch Break & Networking', desc: 'Connect with participants from 50+ colleges', icon: '🍽️' },
            { time: '02:00 PM', title: 'LangChain Workshop Begins', desc: 'Hands-on LLMs, RAG & Agentic AI session', icon: '🤖' },
            { time: '05:00 PM', title: 'Day 1 Wrap-up', desc: 'Results announcement & Day 2 preview', icon: '📋' },
        ],
    },
    {
        day: 'Day 2 — April 25, 2026',
        events: [
            { time: '09:30 AM', title: 'Short Film Screening', desc: 'Short film entries showcase & judging', icon: '🎬' },
            { time: '11:00 AM', title: 'CodeStorm Finals', desc: 'Final round of coding competition', icon: '💻' },
            { time: '12:00 PM', title: 'Speaker Session II', desc: 'Tech entrepreneurship & innovation talk', icon: '🎤' },
            { time: '01:00 PM', title: 'Lunch Break', desc: 'Refreshments & gallery viewing', icon: '☕' },
            { time: '02:30 PM', title: 'Workshop Continuation', desc: 'Advanced Vector DBs & deployment session', icon: '🔧' },
            { time: '04:30 PM', title: 'Prize Ceremony & Closing', desc: 'Winners announced, prizes & mementos distributed', icon: '🏆' },
        ],
    },
]

export default function Timeline() {
    return (
        <section id="timeline" className="timeline">
            <div className="container">
                <div className="reveal">
                    <h2 className="section-title">Event Timeline</h2>
                    <p className="section-subtitle">
                        Two days of unforgettable experiences — here's what's happening
                    </p>
                </div>

                {TIMELINE_DATA.map((day, dayIndex) => (
                    <div key={dayIndex} className="timeline__day reveal">
                        <h3 className="timeline__day-title glass-card">{day.day}</h3>
                        <div className="timeline__track">
                            {day.events.map((event, i) => (
                                <div key={i} className={`timeline__item ${i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}>
                                    <div className="timeline__item-content glass-card">
                                        <span className="timeline__item-time">{event.time}</span>
                                        <span className="timeline__item-icon">{event.icon}</span>
                                        <h4 className="timeline__item-title">{event.title}</h4>
                                        <p className="timeline__item-desc">{event.desc}</p>
                                    </div>
                                    <div className="timeline__item-dot"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
