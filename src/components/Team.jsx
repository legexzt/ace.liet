import './Team.css'

const FACULTY = [
    { name: 'Dr. T.K. Shaik Shavali', role: 'Convenor', icon: '👨‍🏫' },
    { name: 'Md. Asma', role: 'Co-Convenor', icon: '👩‍🏫' },
    { name: 'N. Vibhavari', role: 'Faculty Coordinator', icon: '👩‍💻' },
    { name: 'Umme Ruma', role: 'Faculty Coordinator', icon: '👩‍💻' },
]

const STUDENTS = [
    { name: 'Md Rizwan', role: 'Student Coordinator', phone: '+91 90140 41144', icon: '🎓' },
    { name: 'Shaik Irfan', role: 'Student Coordinator', phone: '+91 93906 83362', icon: '🎓' },
    { name: 'Mohammed Abdul Amaan', role: 'Student Coordinator', phone: '+91 75690 99311', icon: '🎓' },
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
                                <div className="team__card-avatar">{member.icon}</div>
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
                                <div className="team__card-avatar">{member.icon}</div>
                                <h4 className="team__card-name">{member.name}</h4>
                                <p className="team__card-role">{member.role}</p>
                                {member.phone && (
                                    <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="team__card-phone">
                                        📞 {member.phone}
                                    </a>
                                )}
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
