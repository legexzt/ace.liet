import './Sponsors.css'

const SUPPORTING_BODIES = [
    { name: 'Osmania University', img: '/sponsors/osmania.png' },
    { name: "Institution's Innovation Council", img: '/sponsors/iic.png' },
    { name: 'NIRF Innovation', img: '/sponsors/nirf.png' },
    { name: 'AICTE', img: '/sponsors/aicte.png' },
    { name: 'UGC Autonomous', img: '/sponsors/ugc.png' },
    { name: 'NAAC Accredited', img: '/sponsors/naac.png' },
    { name: 'NBA Accredited', img: '/sponsors/nba.png' },
    { name: 'LORDS Skill Academy', img: '/sponsors/lords-skill.png' },
]

export default function Sponsors() {
    return (
        <section id="sponsors" className="sponsors">
            <div className="container">
                <div className="reveal">
                    <h2 className="section-title">Supporting Institutions</h2>
                    <p className="section-subtitle">
                        Proudly accredited and supported by premier educational bodies of India
                    </p>
                </div>

                <div className="sponsors__grid sponsors__grid--institutions reveal">
                    {SUPPORTING_BODIES.map((body, i) => (
                        <div key={i} className="sponsors__card glass-card sponsors__card--hover">
                            <span className="sponsors__card-img-wrapper" style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                <img src={body.img} alt={body.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))' }} />
                            </span>
                            <span className="sponsors__card-name" style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                                {body.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
