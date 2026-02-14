import { useState, useEffect } from 'react'
import './AdminPanel.css'

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3001') + '/api'

export default function AdminPanel({ onExit }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [activeTab, setActiveTab] = useState('dashboard')
    const [loginData, setLoginData] = useState({ username: '', password: '' })
    const [registrations, setRegistrations] = useState([])
    const [contacts, setContacts] = useState([])
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [token, setToken] = useState(localStorage.getItem('adminToken') || '')

    // Check existing token
    useEffect(() => {
        if (token) {
            setIsLoggedIn(true)
            loadData()
        }
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const res = await fetch(`${API_BASE}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            })
            const data = await res.json()
            if (data.token) {
                setToken(data.token)
                localStorage.setItem('adminToken', data.token)
                setIsLoggedIn(true)
                loadData()
            } else {
                setError(data.message || 'Invalid credentials')
            }
        } catch {
            // Demo mode — let admin in with default credentials
            if (loginData.username === 'admin' && loginData.password === 'ace2026') {
                setToken('demo-token')
                localStorage.setItem('adminToken', 'demo-token')
                setIsLoggedIn(true)
                loadDemoData()
            } else {
                setError('Invalid credentials. Default: admin / ace2026')
            }
        }
        setLoading(false)
    }

    const loadData = async () => {
        try {
            const headers = { Authorization: `Bearer ${token}` }
            const [regRes, contactRes] = await Promise.all([
                fetch(`${API_BASE}/registrations`, { headers }),
                fetch(`${API_BASE}/contacts`, { headers }),
            ])
            if (regRes.ok) setRegistrations(await regRes.json())
            if (contactRes.ok) setContacts(await contactRes.json())
        } catch {
            loadDemoData()
        }
    }

    const loadDemoData = () => {
        setRegistrations([
            { id: 1, event: 'CodeStorm Challenge', leaderName: 'Demo User', email: 'demo@test.com', phone: '9876543210', college: 'LIET', createdAt: new Date().toISOString() },
        ])
        setContacts([
            { id: 1, name: 'Test User', email: 'test@test.com', subject: 'Inquiry', message: 'Sample message', createdAt: new Date().toISOString() },
        ])
    }

    const handleLogout = () => {
        setToken('')
        localStorage.removeItem('adminToken')
        setIsLoggedIn(false)
    }

    if (!isLoggedIn) {
        return (
            <div className="admin-login">
                <div className="admin-login__card glass-card">
                    <div className="admin-login__header">
                        <div className="admin-login__shield">ACE</div>
                        <h2>Admin Panel</h2>
                        <p>Sanketika 2026 Management</p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="admin-login__field">
                            <label>Username</label>
                            <input
                                type="text"
                                value={loginData.username}
                                onChange={e => setLoginData({ ...loginData, username: e.target.value })}
                                placeholder="Enter username"
                            />
                        </div>
                        <div className="admin-login__field">
                            <label>Password</label>
                            <input
                                type="password"
                                value={loginData.password}
                                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                                placeholder="Enter password"
                            />
                        </div>
                        {error && <p className="admin-login__error">{error}</p>}
                        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <button className="admin-login__back" onClick={onExit}>← Back to Website</button>
                </div>
            </div>
        )
    }

    return (
        <div className="admin">
            <aside className="admin__sidebar glass-card">
                <div className="admin__sidebar-header">
                    <div className="admin__sidebar-shield">ACE</div>
                    <span>Admin Panel</span>
                </div>
                <nav className="admin__sidebar-nav">
                    {[
                        { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
                        { id: 'registrations', label: '📝 Registrations', icon: '📝' },
                        { id: 'events', label: '🎪 Events', icon: '🎪' },
                        { id: 'contacts', label: '💌 Messages', icon: '💌' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            className={`admin__sidebar-btn ${activeTab === tab.id ? 'admin__sidebar-btn--active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
                <div className="admin__sidebar-footer">
                    <button className="admin__sidebar-btn" onClick={onExit}>🌐 View Website</button>
                    <button className="admin__sidebar-btn admin__sidebar-btn--danger" onClick={handleLogout}>🚪 Logout</button>
                </div>
            </aside>

            <main className="admin__content">
                {activeTab === 'dashboard' && (
                    <div className="admin__panel">
                        <h2>Dashboard</h2>
                        <div className="admin__stats-grid">
                            <div className="admin__stat-card glass-card">
                                <span className="admin__stat-icon">📝</span>
                                <span className="admin__stat-value">{registrations.length}</span>
                                <span className="admin__stat-label">Registrations</span>
                            </div>
                            <div className="admin__stat-card glass-card">
                                <span className="admin__stat-icon">🎪</span>
                                <span className="admin__stat-value">6</span>
                                <span className="admin__stat-label">Events</span>
                            </div>
                            <div className="admin__stat-card glass-card">
                                <span className="admin__stat-icon">💌</span>
                                <span className="admin__stat-value">{contacts.length}</span>
                                <span className="admin__stat-label">Messages</span>
                            </div>
                            <div className="admin__stat-card glass-card">
                                <span className="admin__stat-icon">🏆</span>
                                <span className="admin__stat-value">₹20K</span>
                                <span className="admin__stat-label">Prize Pool</span>
                            </div>
                        </div>
                        <div className="admin__recent glass-card">
                            <h3>Recent Registrations</h3>
                            {registrations.length === 0 ? (
                                <p className="admin__empty">No registrations yet</p>
                            ) : (
                                <table className="admin__table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Event</th>
                                            <th>Email</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {registrations.slice(0, 5).map(reg => (
                                            <tr key={reg.id}>
                                                <td>{reg.leaderName}</td>
                                                <td>{reg.event}</td>
                                                <td>{reg.email}</td>
                                                <td>{new Date(reg.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'registrations' && (
                    <div className="admin__panel">
                        <div className="admin__panel-header">
                            <h2>All Registrations</h2>
                            <span className="admin__panel-count">{registrations.length} total</span>
                        </div>
                        {registrations.length === 0 ? (
                            <div className="admin__empty-state glass-card">
                                <span style={{ fontSize: '3rem' }}>📝</span>
                                <h3>No Registrations Yet</h3>
                                <p>Registrations will appear here as participants sign up</p>
                            </div>
                        ) : (
                            <div className="admin__table-wrapper glass-card">
                                <table className="admin__table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Event</th>
                                            <th>College</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {registrations.map((reg, i) => (
                                            <tr key={reg.id}>
                                                <td>{i + 1}</td>
                                                <td>{reg.leaderName}</td>
                                                <td>{reg.event}</td>
                                                <td>{reg.college}</td>
                                                <td>{reg.email}</td>
                                                <td>{reg.phone}</td>
                                                <td>{new Date(reg.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'events' && (
                    <div className="admin__panel">
                        <h2>Manage Events</h2>
                        <p className="admin__panel-note">Events can be managed via Supabase dashboard or API when backend is connected.</p>
                        <div className="admin__events-grid">
                            {[
                                { name: 'Static Web Page Designing', category: 'Technical', status: 'Active' },
                                { name: 'Prompt-to-PIXEL', category: 'Technical', status: 'Active' },
                                { name: 'LangChain & RAG Workshop', category: 'Workshop', status: 'Active' },
                                { name: 'Short Film Making', category: 'Non-Technical', status: 'Active' },
                                { name: 'Speaker Sessions', category: 'Special', status: 'Active' },
                                { name: 'CodeStorm Challenge', category: 'Technical', status: 'Active' },
                            ].map(event => (
                                <div key={event.name} className="admin__event-card glass-card">
                                    <div className="admin__event-card-header">
                                        <h4>{event.name}</h4>
                                        <span className={`admin__event-status admin__event-status--${event.status.toLowerCase()}`}>
                                            {event.status}
                                        </span>
                                    </div>
                                    <p>Category: {event.category}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'contacts' && (
                    <div className="admin__panel">
                        <h2>Contact Messages</h2>
                        {contacts.length === 0 ? (
                            <div className="admin__empty-state glass-card">
                                <span style={{ fontSize: '3rem' }}>💌</span>
                                <h3>No Messages Yet</h3>
                                <p>Contact form submissions will appear here</p>
                            </div>
                        ) : (
                            <div className="admin__messages">
                                {contacts.map(msg => (
                                    <div key={msg.id} className="admin__message glass-card">
                                        <div className="admin__message-header">
                                            <strong>{msg.name}</strong>
                                            <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <p className="admin__message-subject">{msg.subject}</p>
                                        <p className="admin__message-body">{msg.message}</p>
                                        <p className="admin__message-email">📧 {msg.email}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    )
}
