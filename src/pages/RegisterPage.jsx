import { useState, useEffect } from 'react'
import './RegisterPage.css'

const FORM_URL = 'https://forms.gle/riKV9onsrpDvXcjo9'

export default function RegisterPage({ onBack }) {
    const [submitted, setSubmitted] = useState(false)

    // Check if user came back after submitting
    useEffect(() => {
        const wasRedirected = sessionStorage.getItem('ace_form_opened')
        if (wasRedirected) {
            sessionStorage.removeItem('ace_form_opened')
            setSubmitted(true)
        }
    }, [])

    const openForm = () => {
        sessionStorage.setItem('ace_form_opened', 'true')
        window.open(FORM_URL, '_blank')
        // Show "I've submitted" UI after a brief delay
        setTimeout(() => setSubmitted(true), 3000)
    }

    if (submitted) {
        return (
            <div className="rp__overlay">
                <div className="rp__thankyou">
                    <div className="rp__thankyou-icon">🎉</div>
                    <h2>Registration Submitted!</h2>
                    <p>Thank you for registering for <strong>SANKETIKA 2026</strong>.</p>
                    <p>Check your email for confirmation. See you on <strong>8th & 9th April</strong> at Lords Institute of Engineering & Technology!</p>
                    <button className="rp__btn-home" onClick={onBack}>
                        ← Back to Website
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="rp__overlay">
            <button className="rp__floating-back" onClick={onBack}>← Back</button>
            <div className="rp__launch-screen">
                <img src="/images/ace-logo.png" alt="ACE Logo" className="rp__launch-logo" />
                <h1 className="rp__launch-title">SANKETIKA 2026</h1>
                <p className="rp__launch-sub">Register for the National Level Tech Fest</p>
                <div className="rp__launch-dates">📅 8th & 9th April 2026 · Lords Institute of Engineering & Technology</div>
                <button className="rp__btn-open-form" onClick={openForm}>
                    📝 Open Registration Form
                </button>
                <p className="rp__launch-note">The form will open in a new tab. After submitting, come back here for confirmation.</p>
                <div className="rp__after-submit-row">
                    <span>Already submitted?</span>
                    <button className="rp__btn-submitted" onClick={() => setSubmitted(true)}>
                        Show Confirmation ✅
                    </button>
                </div>
            </div>
        </div>
    )
}
