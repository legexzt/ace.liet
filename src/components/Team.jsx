import './Team.css'
import { GraduationCap, UserCheck, BrainCircuit, Palette, Zap, Gamepad2, Phone, Users, CheckCircle2 } from 'lucide-react'

const FACULTY = [
    { name: 'Dr. T.K. Shaik Shavali', role: 'Convenor', icon: GraduationCap },
    { name: 'Md. Asma', role: 'Co-Convenor', icon: UserCheck },
    { name: 'Jagadeshwar Reddy Gogu', role: 'Faculty Coordinator', icon: UserCheck, phone: '9885252291' },
    { name: 'Mr. Ahmadoddin Siddiqui', role: 'Faculty Coordinator', icon: UserCheck, phone: '+91 90529 50069' },
]

const CORE_TEAM = [
    { id: 1, name: 'Member 1', role: 'Core Leader', image: '/images/team/1.png', description: 'Guiding the vision and ensuring seamless execution with passion.' },
    { id: 2, name: 'Member 2', role: 'Technical Lead', image: '/images/team/2.png', description: 'Architecting cutting-edge solutions and digital experiences.' },
    { id: 3, name: 'Member 3', role: 'Creative Head', image: '/images/team/3.png', description: 'Pushing boundaries in design and visual storytelling.' },
    { id: 4, name: 'Member 4', role: 'Event Manager', image: '/images/team/4.png', description: 'Orchestrating unforgettable events and smooth operations.' },
    { id: 5, name: 'Member 5', role: 'Marketing Executive', image: '/images/team/5.png', description: 'Spreading the word and building our amazing community.' },
    { id: 6, name: 'Member 6', role: 'Logistics Lead', image: '/images/team/6.png', description: 'Managing resources and structuring our initiatives.' },
    { id: 7, name: 'Member 7', role: 'Sponsorship', image: '/images/team/7.png', description: 'Securing partnerships to power our ambitious projects.' },
    { id: 8, name: 'Member 8', role: 'Public Relations', image: '/images/team/8.png', description: 'Connecting with people and maintaining transparent communication.' },
    { id: 9, name: 'Member 9', role: 'Content Strategist', image: '/images/team/9.png', description: 'Crafting compelling narratives to engage our audience.' },
    { id: 10, name: 'Member 10', role: 'Documentation', image: '/images/team/10.png', description: 'Capturing the journey and keeping our records intact.' },
    { id: 11, name: 'Member 11', role: 'Social Media Lead', image: '/images/team/11.png', description: 'Driving engagement across all our digital platforms.' },
    { id: 12, name: 'Member 12', role: 'Operations', image: '/images/team/12.png', description: 'Ensuring everything happens precisely as planned.' }
];

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
        event: 'Poster Fusion - Design Battle',
        icon: Palette,
        students: ['Zohair Shahid Khan', 'Samad'],
        faculty: ['Ms. Sweta P', 'Madiha Banu'],
    },
    {
        event: 'MindOverCode - Logic vs Noise',
        icon: Zap,
        students: ['Thaizia', 'Aamina Bushra'],
        faculty: ['Ms. Mayuri Tone', 'Ms. Bhavana'],
    },
    {
        event: 'Instagram Reel Making', // Changed from 'The Game Arena'
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
                    <h3 className="team__section-title" style={{ fontSize: '1.4rem' }}>Core Team Leaders & Members</h3>
                    <div className="team__grid team__grid--core">
                        {CORE_TEAM.map(member => (
                            <div key={member.id} className="core-card">
                                <div className="core-card__image-container">
                                    <div className="core-card__glow"></div>
                                    <img src={member.image} alt={member.name} className="core-card__image" />
                                </div>
                                <div className="core-card__content">
                                    <h4 className="core-card__name">{member.name}</h4>
                                    <div className="core-card__badge">{member.role}</div>
                                    <div className="core-card__description">
                                        <p>{member.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="team__section reveal">
                    <h3 className="team__section-title">Faculty</h3>
                    <div className="team__grid team__grid--faculty">
                        {FACULTY.map(member => (
                            <div key={member.name} className="team__card glass-card">
                                <div className="team__card-avatar"><member.icon size={28} color="#d4a017" /></div>
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
