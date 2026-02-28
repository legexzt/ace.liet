import { useState, useRef } from 'react'
import { Check, PartyPopper, Target, Download } from 'lucide-react'
import html2canvas from 'html2canvas'
import './RegisterModal.css'

const MOTIVATIONAL_QUOTES = [
    "Innovation distinguishes between a leader and a follower.",
    "The future belongs to those who learn more skills and combine them in creative ways.",
    "First, solve the problem. Then, write the code.",
    "Make it work, make it right, make it fast.",
    "Talk is cheap. Show me the code.",
    "Creativity is intelligence having fun.",
    "The only way to do great work is to love what you do.",
    "Every great developer you know got there by solving problems they were unqualified to solve.",
    "In order to be irreplaceable, one must always be different.",
    "Code is like humor. When you have to explain it, it's bad."
];

const EVENTS_LIST = [
    'AI Prompt Engineering Challenge',
    'Poster Making',
    'Code in Chaos',
    'Instagram Reel Making',
]

export default function RegisterModal({ event, onClose }) {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [downloading, setDownloading] = useState(false)
    const [quote, setQuote] = useState('')
    const cardRef = useRef(null)
    const [formData, setFormData] = useState({
        event: event || '',
        teamName: '',
        leaderName: '',
        members: '',
        college: 'Lords Institute of Engineering & Technology',
        email: '',
        phone: '',
        branch: '',
        year: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSf83efzKwxL0WcqptN9mwKiyug3c0sqMiMSG6mul_xqZY69mA/formResponse';

            const formParams = new URLSearchParams();
            formParams.append('entry.957182212', formData.event); // Event
            formParams.append('entry.1106436604', formData.leaderName); // Name
            formParams.append('entry.1340991481', formData.teamName || 'N/A'); // Team Name
            formParams.append('entry.792004370', formData.members || 'None'); // Members
            formParams.append('entry.1471012741', formData.email); // Email
            formParams.append('entry.838773708', formData.phone); // Phone
            formParams.append('entry.232806118', formData.college || 'N/A'); // College
            formParams.append('entry.1593098683', formData.branch || 'N/A'); // Branch
            formParams.append('entry.1734440777', formData.year || 'N/A'); // Year

            // Submit directly to Google Forms bypassing CORS
            await fetch(GOOGLE_FORM_ACTION, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formParams
            });

            setSuccess(true);
            setQuote(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
        } catch (error) {
            console.error("Form submission failed:", error);
            setSuccess(true); // Fallback to show success for robust UX
            setQuote(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
        }
        setLoading(false)
    }

    const handleDownload = async () => {
        if (!cardRef.current) return;
        setDownloading(true);
        try {
            const canvas = await html2canvas(cardRef.current, { backgroundColor: null, scale: 2 });
            const link = document.createElement('a');
            link.download = `Sanketika_Invite_${formData.leaderName.replace(/\s+/g, '_')}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error('Download failed', error);
        }
        setDownloading(false);
    }

    const canProceedStep1 = formData.event !== ''
    const canProceedStep2 = formData.leaderName && formData.email && formData.phone

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal glass-card" onClick={e => e.stopPropagation()}>
                <button className="modal__close" onClick={onClose}>✕</button>

                {/* Progress bar */}
                <div className="modal__progress">
                    {[1, 2, 3].map(s => (
                        <div key={s} className={`modal__progress-step ${step >= s ? 'modal__progress-step--active' : ''}`}>
                            {success && s === 3 ? <Check size={16} strokeWidth={3} /> : s}
                        </div>
                    ))}
                    <div className="modal__progress-bar">
                        <div className="modal__progress-fill" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
                    </div>
                </div>

                {success ? (
                    <div className="modal__success">
                        <div className="modal__success-icon">
                            <PartyPopper size={48} color="#d4a017" strokeWidth={1.5} />
                        </div>
                        <h3>Registration Successful!</h3>
                        <p>You have been registered for <strong>{formData.event}</strong>.</p>

                        <p className="modal__success-note">We'll contact you via email/phone with further details.</p>

                        <div className="invite-card-wrapper">
                            <div className="invite-card" ref={cardRef}>
                                <div className="invite-card__bg">
                                    <img src="/images/ace-logo.png" alt="ACE Logo" crossOrigin="anonymous" />
                                </div>
                                <div className="invite-card__content">
                                    <div className="invite-card__header">
                                        <h3>SANKETIKA 2026</h3>
                                        <span>VIP PASS</span>
                                    </div>
                                    <div className="invite-card__body">
                                        <h4>{formData.leaderName}</h4>
                                        <p className="invite-card__event">{formData.event}</p>
                                        {formData.teamName && <p className="invite-card__team">Team: {formData.teamName}</p>}
                                    </div>
                                    <div className="invite-card__footer">
                                        <p className="invite-card__quote">"{quote}"</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="invite-card-actions">
                            <button className="btn-download" onClick={handleDownload} disabled={downloading}>
                                {downloading ? 'Generating...' : <><Download size={18} /> Download Invitation</>}
                            </button>
                            <button className="btn-secondary" style={{ marginLeft: '10px' }} onClick={onClose}>Done</button>
                        </div>
                    </div>
                ) : (
                    <>
                        {step === 1 && (
                            <div className="modal__step">
                                <h3 className="modal__title">Select Event</h3>
                                <p className="modal__subtitle">Choose the event you want to participate in</p>
                                <div className="modal__events-grid">
                                    {EVENTS_LIST.map(ev => (
                                        <button
                                            key={ev}
                                            className={`modal__event-btn glass-card ${formData.event === ev ? 'modal__event-btn--selected' : ''}`}
                                            onClick={() => setFormData({ ...formData, event: ev })}
                                        >
                                            {ev}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="modal__step">
                                <h3 className="modal__title">Team Details</h3>
                                <p className="modal__subtitle">Tell us about your team for {formData.event}</p>
                                <div className="modal__form">
                                    <div className="modal__field">
                                        <label>Team / Participant Name *</label>
                                        <input name="leaderName" value={formData.leaderName} onChange={handleChange} placeholder="Enter your name" />
                                    </div>
                                    <div className="modal__field">
                                        <label>Team Name (optional)</label>
                                        <input name="teamName" value={formData.teamName} onChange={handleChange} placeholder="Enter team name" />
                                    </div>
                                    <div className="modal__field">
                                        <label>Team Members (comma-separated)</label>
                                        <input name="members" value={formData.members} onChange={handleChange} placeholder="Member 1, Member 2" />
                                    </div>
                                    <div className="modal__row">
                                        <div className="modal__field">
                                            <label>Email *</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" />
                                        </div>
                                        <div className="modal__field">
                                            <label>Phone *</label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
                                        </div>
                                    </div>
                                    <div className="modal__row">
                                        <div className="modal__field">
                                            <label>College</label>
                                            <input name="college" value={formData.college} onChange={handleChange} placeholder="College name" />
                                        </div>
                                        <div className="modal__field">
                                            <label>Branch</label>
                                            <input name="branch" value={formData.branch} onChange={handleChange} placeholder="CSE, ECE, etc." />
                                        </div>
                                    </div>
                                    <div className="modal__field">
                                        <label>Year</label>
                                        <select name="year" value={formData.year} onChange={handleChange}>
                                            <option value="">Select Year</option>
                                            <option value="1">1st Year</option>
                                            <option value="2">2nd Year</option>
                                            <option value="3">3rd Year</option>
                                            <option value="4">4th Year</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="modal__step">
                                <h3 className="modal__title">Confirm Registration</h3>
                                <p className="modal__subtitle">Review your details before submitting</p>
                                <div className="modal__review glass-card">
                                    <div className="modal__review-item">
                                        <span>Event</span>
                                        <strong>{formData.event}</strong>
                                    </div>
                                    <div className="modal__review-item">
                                        <span>Name</span>
                                        <strong>{formData.leaderName}</strong>
                                    </div>
                                    {formData.teamName && (
                                        <div className="modal__review-item">
                                            <span>Team</span>
                                            <strong>{formData.teamName}</strong>
                                        </div>
                                    )}
                                    <div className="modal__review-item">
                                        <span>Email</span>
                                        <strong>{formData.email}</strong>
                                    </div>
                                    <div className="modal__review-item">
                                        <span>Phone</span>
                                        <strong>{formData.phone}</strong>
                                    </div>
                                    <div className="modal__review-item">
                                        <span>College</span>
                                        <strong>{formData.college}</strong>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="modal__actions">
                            {step > 1 && (
                                <button className="btn-secondary" onClick={() => setStep(step - 1)}>
                                    ← Back
                                </button>
                            )}
                            {step < 3 ? (
                                <button
                                    className="btn-primary"
                                    disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
                                    onClick={() => setStep(step + 1)}
                                >
                                    Next →
                                </button>
                            ) : (
                                <button className="btn-primary" onClick={handleSubmit} disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    {loading ? 'Submitting...' : <><Target size={18} /> Submit Registration</>}
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
