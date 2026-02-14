import './Sponsors.css'

const SPONSOR_TIERS = [
    {
        tier: 'Title Sponsor',
        sponsors: [
            { name: 'ACE - Association of Computer Engineers', icon: '🏆' },
        ],
    },
    {
        tier: 'Platinum Sponsors',
        sponsors: [
            { name: 'Sponsor Slot Available', icon: '💎' },
            { name: 'Sponsor Slot Available', icon: '💎' },
        ],
    },
    {
        tier: 'Gold Sponsors',
        sponsors: [
            { name: 'Sponsor Slot Available', icon: '🥇' },
            { name: 'Sponsor Slot Available', icon: '🥇' },
            { name: 'Sponsor Slot Available', icon: '🥇' },
        ],
    },
]

export default function Sponsors() {
    return (
        <section id="sponsors" className="sponsors">
            <div className="container">
                <div className="reveal">
                    <h2 className="section-title">Our Sponsors</h2>
                    <p className="section-subtitle">
                        Partnering with industry leaders to make Sanketika a grand success
                    </p>
                </div>

                {SPONSOR_TIERS.map(tier => (
                    <div key={tier.tier} className="sponsors__tier reveal">
                        <h3 className="sponsors__tier-title">{tier.tier}</h3>
                        <div className="sponsors__grid">
                            {tier.sponsors.map((sponsor, i) => (
                                <div key={i} className="sponsors__card glass-card">
                                    <span className="sponsors__card-icon">{sponsor.icon}</span>
                                    <span className="sponsors__card-name">{sponsor.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="sponsors__cta reveal">
                    <p>Want to sponsor Sanketika 2026?</p>
                    <a
                        href="mailto:ace.liet@gmail.com?subject=Sponsorship Inquiry - Sanketika 2026"
                        className="btn-primary"
                    >
                        🤝 Become a Sponsor
                    </a>
                </div>
            </div>
        </section>
    )
}
