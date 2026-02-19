import './Team.css'
import { GraduationCap, UserCheck, BrainCircuit, Palette, Zap, Gamepad2, Phone, Users, CheckCircle2 } from 'lucide-react'

const FACULTY = [
    { name: 'Dr. T.K. Shaik Shavali', role: 'Convenor', icon: GraduationCap },
    { name: 'Md. Asma', role: 'Co-Convenor', icon: UserCheck },
    { name: 'N. Vibhavari', role: 'Faculty Coordinator', icon: UserCheck },
    { name: 'Umme Ruma', role: 'Faculty Coordinator', icon: UserCheck },
]

const STUDENTS = [
    { name: 'Md Rizwan', role: 'Student Coordinator', phone: '+91 90140 41144', icon: Users },
    { name: 'Shaik Irfan', role: 'Student Coordinator', phone: '+91 93906 83362', icon: Users },
    { name: 'Mohammed Abdul Amaan', role: 'Student Coordinator', phone: '+91 75690 99311', icon: Users },
]

const EVENT_COORDINATORS = [
    {
        event: 'AI Prompt Engineering Challenge',
        icon: BrainCircuit,
        students: ['Fizra Fathima', 'Syed Imad uddin'],
        faculty: ['Mr. Najeemulla Baig', 'Mr. Ryan Husain'],
    },
    {
        event: 'Poster Making',
        icon: Palette,
        students: ['Zohair Shahid Khan', 'Samad'],
        faculty: ['Ms. Sweta P', 'Madiha Banu'],
    },
    {
        event: 'Code in Chaos',
        icon: Zap,
        students: ['Thaizia', 'Aamina Bushra'],
        faculty: ['Ms. Mayuri Tone', 'Ms. Bhavana'],
    },
    {
        event: 'The Game Arena',
        icon: Gamepad2,
        students: ['Abdul Rahman', 'Mohammed Taqee'],
        faculty: ['Dr. Rizwan', 'Ms. Saniya'],
    },
]

const DEPARTMENTS = [
    'Event Management', 'Graphics', 'Marketing', 'Operations',
    'Sponsorship', 'Documentation', 'Photography',
]

export default function Team() {
    return (
        <section id="team" className="team">
            <div className="container">
                <div className="reveal">
                    <h2 className="section-title">Our Team</h2>
                    <p className="section-subtitle">
                        The brilliant minds behind ACE & Sanketika 2026
                    </p>
                </div>

                <div className="team__section reveal">
                    <h3 className="team__section-title">Faculty</h3>
                    <div className="team__grid team__grid--faculty">
                        {FACULTY.map(member => (
                            <div key={member.name} className="team__card glass-card">
                                <div className="team__card-avatar"><member.icon size={28} color="#d4a017" /></div>
                                <h4 className="team__card-name">{member.name}</h4>
                                <p className="team__card-role">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="team__section reveal">
                    <h3 className="team__section-title">Student Coordinators</h3>
                    <div className="team__grid team__grid--students">
                        {STUDENTS.map(member => (
                            <div key={member.name} className="team__card glass-card">
                                <div className="team__card-avatar"><member.icon size={28} color="#1db954" /></div>
                                <h4 className="team__card-name">{member.name}</h4>
                                <p className="team__card-role">{member.role}</p>
                                {member.phone && (
                                    <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="team__card-phone" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                        <Phone size={14} /> {member.phone}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="team__section reveal">
                    <h3 className="team__section-title">Event-wise Coordinators</h3>
                    <div className="team__grid team__grid--events">
                        {EVENT_COORDINATORS.map(coord => (
                            <div key={coord.event} className="team__card team__card--event glass-card">
                                <div className="team__card-avatar"><coord.icon size={28} color="#d4a017" /></div>
                                <h4 className="team__card-name">{coord.event}</h4>
                                <div className="team__card-coord-section">
                                    <span className="team__card-coord-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={12} /> Students</span>
                                    <p className="team__card-coord-names">{coord.students.join(', ')}</p>
                                </div>
                                <div className="team__card-coord-section">
                                    <span className="team__card-coord-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><GraduationCap size={12} /> Faculty</span>
                                    <p className="team__card-coord-names">{coord.faculty.join(', ')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="team__departments reveal">
                    <h3 className="team__section-title">ACE Departments</h3>
                    <div className="team__dept-grid">
                        {DEPARTMENTS.map(dept => (
                            <div key={dept} className="team__dept-tag glass-card">
                                {dept}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
