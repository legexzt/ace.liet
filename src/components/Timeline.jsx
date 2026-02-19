import './Timeline.css'
import { Tent, BrainCircuit, Palette, Zap, UtensilsCrossed, Trophy, Target, ClipboardList, Laptop, Gamepad2, Coffee, Flame, Medal } from 'lucide-react'

const TIMELINE_DATA = [
    {
        day: 'Day 1 — April 8, 2026',
        events: [
            { time: '09:00 AM', title: 'Inauguration Ceremony', desc: 'Grand opening with Chief Guest, Faculty & ACE Team', icon: Tent },
            { time: '10:00 AM', title: 'AI Prompt Engineering Challenge Begins', desc: 'Round 1 kicks off — craft intelligent prompts with AI tools', icon: BrainCircuit },
            { time: '10:30 AM', title: 'Poster Making Starts', desc: 'Participants begin designing posters on given themes', icon: Palette },
            { time: '12:00 PM', title: 'AI Challenge Round 2', desc: 'Advanced prompt engineering tasks — top performers advance', icon: Zap },
            { time: '01:00 PM', title: 'Lunch Break & Networking', desc: 'Connect with participants from colleges across the state', icon: UtensilsCrossed },
            { time: '02:00 PM', title: 'Poster Judging & Results', desc: 'Expert panel evaluates and announces poster winners', icon: Trophy },
            { time: '03:00 PM', title: 'AI Challenge Finals & Results', desc: 'Final round + winner announcement for AI Prompt Engineering', icon: Target },
            { time: '04:30 PM', title: 'Day 1 Wrap-up', desc: 'Results recap & Day 2 preview — Gaming Arena coming up!', icon: ClipboardList },
        ],
    },
    {
        day: 'Day 2 — April 9, 2026',
        events: [
            { time: '09:30 AM', title: 'Code in Chaos Begins', desc: 'Round 1 — chaotic coding challenges under time pressure', icon: Laptop },
            { time: '10:00 AM', title: 'The Game Arena Opens', desc: 'BGMI & Free Fire tournaments kick off — squads battle it out', icon: Gamepad2 },
            { time: '11:30 AM', title: 'Code in Chaos Round 2', desc: 'Elimination round — only the sharpest coders survive', icon: Zap },
            { time: '01:00 PM', title: 'Lunch Break', desc: 'Refreshments & live gaming streams on the big screen', icon: Coffee },
            { time: '02:00 PM', title: 'Game Arena Semi-Finals', desc: 'Top squads clash in intense semifinal matches', icon: Flame },
            { time: '02:30 PM', title: 'Code in Chaos Finals', desc: 'Grand finale — ultimate coding showdown for the crown', icon: Medal },
            { time: '03:30 PM', title: 'Game Arena Grand Finale', desc: 'Championship match — which squad reigns supreme?', icon: Gamepad2 },
            { time: '04:30 PM', title: 'Prize Ceremony & Closing', desc: 'Winners announced, prizes & mementos distributed — SANKETIKA 2026 concludes!', icon: Trophy },
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
                        Two days of unforgettable experiences — here's what's happening at SANKETIKA 2026
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
                                        <span className="timeline__item-icon"><event.icon size={20} color="#d4a017" /></span>
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
