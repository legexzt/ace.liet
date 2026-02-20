import './Sponsors.css'
import { Trophy, Gem, Award, Handshake, Check } from 'lucide-react'

const SPONSOR_TIERS = [
    {
        tier: 'Title Sponsor',
        sponsors: [
            { name: 'ACE - Association of Computer Engineers', icon: Trophy },
        ],
    },
    {
        tier: 'Platinum Sponsors',
        sponsors: [
            { name: 'Sponsor Slot Available', icon: Gem },
            { name: 'Sponsor Slot Available', icon: Gem },
        ],
    },
    {
        tier: 'Gold Sponsors',
        sponsors: [
            { name: 'Sponsor Slot Available', icon: Award },
            { name: 'Sponsor Slot Available', icon: Award },
            { name: 'Sponsor Slot Available', icon: Award },
        ],
    },
]

const BENEFITS = [
    { perk: 'Sponsorship Certificate', tiers: [true, true, true] },
    { perk: 'Swags Distribution', tiers: [true, true, true] },
    { perk: 'Web & Media Promotion', tiers: [true, true, true] },
    { perk: 'Magazine Spotlight', tiers: [true, true, true] },
    { perk: 'Logo Promotion', tiers: [true, true, true] },
    { perk: 'Stage Shout-out', tiers: [true, true, true] },
    { perk: 'Instagram Reel', tiers: [false, true, true] },
    { perk: 'Booth Set-up', tiers: [false, true, true] },
    { perk: 'Name/Logo on T-shirt', tiers: [false, false, true] },
    { perk: '2-min Stage Spotlight', tiers: [false, false, true] },
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
                                    <span className="sponsors__card-icon"><sponsor.icon size={28} color="#d4a017" /></span>
                                    <span className="sponsors__card-name">{sponsor.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="sponsors__benefits reveal">
                    <div className="sponsors__3d-wrapper">
                        <div className="sponsors__3d-ring sponsors__3d-ring--1"></div>
                        <div className="sponsors__3d-ring sponsors__3d-ring--2"></div>
                        <div className="sponsors__3d-ring sponsors__3d-ring--3"></div>
                    </div>

                    <h2 className="section-title">SPONSORSHIP BENEFITS</h2>

                    <div className="sponsors__table-wrapper">
                        <table className="sponsors__table">
                            <thead>
                                <tr>
                                    <th className="sponsors__th-perks">PERKS</th>
                                    <th>
                                        <div className="sponsors__th-tier">3 STAR</div>
                                        <div className="sponsors__th-price">Rs 10,000/-</div>
                                    </th>
                                    <th>
                                        <div className="sponsors__th-tier">4 STAR</div>
                                        <div className="sponsors__th-price">Rs 15,000/-</div>
                                    </th>
                                    <th>
                                        <div className="sponsors__th-tier">5 STAR</div>
                                        <div className="sponsors__th-price">Rs 20,000/-</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {BENEFITS.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="sponsors__td-perk">{item.perk}</td>
                                        {item.tiers.map((hasPerk, tIdx) => (
                                            <td key={tIdx} className="sponsors__td-check">
                                                <div className={`sponsors__check-circle ${hasPerk ? 'sponsors__check-circle--active' : ''}`}>
                                                    {hasPerk && <Check size={16} strokeWidth={4} />}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="sponsors__cta reveal">
                    <p>Want to sponsor Sanketika 2026?</p>
                    <a
                        href="mailto:ace.liet@gmail.com?subject=Sponsorship Inquiry - Sanketika 2026"
                        className="btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <Handshake size={20} /> Become a Sponsor
                    </a>
                </div>
            </div>
        </section>
    )
}
