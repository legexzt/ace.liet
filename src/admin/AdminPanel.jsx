import { useState, useEffect, useMemo } from 'react'
import * as XLSX from 'xlsx'
import Papa from 'papaparse'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts'
import './AdminPanel.css'

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3001') + '/api'

const EVENTS = [
    'AI Prompt Engineering Challenge',
    'Poster Making',
    'Code in Chaos',
    'Instagram Reel Making'
]

const COLORS = ['#d4a017', '#1db954', '#00b4d8', '#ff4d4f', '#a020f0']

// Helper to safely format dates that might come from Google Forms regional formats
const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr; // fallback to raw string (like "28/02/2026 06:18:21")
    return d.toLocaleString();
};

const sortRegistrationDates = (aStr, bStr) => {
    const a = new Date(aStr);
    const b = new Date(bStr);
    if (isNaN(a.getTime()) || isNaN(b.getTime())) return bStr.localeCompare(aStr);
    return b - a;
};

export default function AdminPanel({ onExit }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [activeTab, setActiveTab] = useState('dashboard')
    const [loginData, setLoginData] = useState({ username: '', password: '' })
    const [registrations, setRegistrations] = useState([])
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [token, setToken] = useState(localStorage.getItem('adminToken') || '')
    const [selectedEventTable, setSelectedEventTable] = useState('All Events')

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
            // Fallback for Demo Mode if backend is unreachable
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
            // Real-Time Google Sheet CSV Endpoint
            const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTPeggNl2-_J0YWZ9r8bLZe4QLxVR_T4ePab3Y4hQ4rKXINi5UXf5fnyL4aIknRNHA0vQvgO4j0QHTU/pub?output=csv';

            const res = await fetch(CSV_URL);
            const csvText = await res.text();

            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const realData = results.data.map((row, index) => ({
                        id: (index + 1).toString().padStart(3, '0'),
                        createdAt: row['Timestamp'] || new Date().toISOString(),
                        event: row['Event'] || 'Unknown Event',
                        leaderName: row['Name'] || 'Unknown',
                        teamName: row['Team Name'] || 'N/A',
                        members: row['Members'] || 'None',
                        email: row['Email'] || 'N/A',
                        phone: row['Phone'] || 'N/A',
                        college: row['College'] || 'N/A',
                        branch: row['Branch'] || 'N/A',
                        year: row['Year'] || 'N/A'
                    }));

                    // Sort by newest registration first
                    realData.sort((a, b) => sortRegistrationDates(a.createdAt, b.createdAt));

                    setRegistrations(realData.length > 0 ? realData : loadDemoData(true));

                    // Keep mock contact requests since forms don't handle contacts yet
                    setContacts([
                        { id: 1, name: 'Sponsor Lead', email: 'sponsor@tech.com', subject: 'Sponsorship Inquiry', message: 'We want to sponsor the event. Let us know the packages.', createdAt: new Date().toISOString() },
                        { id: 2, name: 'Faculty Coordinator', email: 'coord@liet.in', subject: 'Lab Allocations', message: 'The labs for Code in Chaos are confirmed.', createdAt: new Date().toISOString() },
                    ]);
                },
                error: (error) => {
                    console.error("CSV Parse Error:", error);
                    loadDemoData();
                }
            });

        } catch (error) {
            console.error("Error fetching live data", error);
            loadDemoData();
        }
    }

    const loadDemoData = (returnOnly = false) => {
        const mockRegs = []
        const colleges = ['LIET', 'MJCET', 'Muffakham Jah', 'CBIT', 'Vasavi', 'SRM']

        for (let i = 1; i <= 85; i++) {
            const ev = EVENTS[Math.floor(Math.random() * EVENTS.length)]
            const coll = colleges[Math.floor(Math.random() * colleges.length)]
            mockRegs.push({
                id: i,
                event: ev,
                leaderName: `Participant ${i}`,
                teamName: Math.random() > 0.6 ? `Team Alpha ${i}` : 'N/A',
                email: `participant${i}@${coll.toLowerCase().replace(' ', '')}.edu.in`,
                phone: `9` + Math.floor(100000000 + Math.random() * 900000000),
                college: coll,
                createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
            })
        }

        // Sort newest first
        mockRegs.sort((a, b) => sortRegistrationDates(a.createdAt, b.createdAt))

        if (returnOnly) return mockRegs;

        setRegistrations(mockRegs)
        setContacts([
            { id: 1, name: 'Sponsor Lead', email: 'sponsor@tech.com', subject: 'Sponsorship Inquiry', message: 'We want to sponsor the event. Let us know the packages.', createdAt: new Date().toISOString() },
            { id: 2, name: 'Faculty Coordinator', email: 'coord@liet.in', subject: 'Lab Allocations', message: 'The labs for Code in Chaos are confirmed.', createdAt: new Date().toISOString() },
        ])
    }

    const handleLogout = () => {
        setToken('')
        localStorage.removeItem('adminToken')
        setIsLoggedIn(false)
    }

    // Chart Data Preparation
    const eventStats = useMemo(() => {
        return EVENTS.map(event => ({
            name: event,
            Registrations: registrations.filter(r => r.event === event).length
        }))
    }, [registrations])

    const collegeStats = useMemo(() => {
        const counts = registrations.reduce((acc, curr) => {
            acc[curr.college] = (acc[curr.college] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(counts).map(college => ({
            name: college,
            value: counts[college]
        })).sort((a, b) => b.value - a.value).slice(0, 5) // Top 5
    }, [registrations])

    // Filter registrations
    const filteredRegistrations = selectedEventTable === 'All Events'
        ? registrations
        : registrations.filter(r => r.event === selectedEventTable)

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredRegistrations.map(r => ({
            'Registration ID': r.id,
            'Name': r.leaderName,
            'Team Name': r.teamName,
            'Event': r.event,
            'College': r.college,
            'Email': r.email,
            'Phone': r.phone,
            'Date': formatDate(r.createdAt)
        })))
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations")

        // Auto-size columns loosely
        const wscols = [{ wch: 15 }, { wch: 20 }, { wch: 20 }, { wch: 30 }, { wch: 25 }, { wch: 30 }, { wch: 15 }, { wch: 20 }];
        worksheet['!cols'] = wscols;

        XLSX.writeFile(workbook, `Sanketika_Registrations_${selectedEventTable.replace(/\s+/g, '_')}.xlsx`)
    }

    if (!isLoggedIn) {
        return (
            <div className="admin-login">
                <div className="admin-login__card glass-card">
                    <div className="admin-login__header">
                        <div className="admin-login__shield">ACE</div>
                        <h2>Admin Portal</h2>
                        <p>Restricted Access Area</p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="admin-login__field">
                            <label>Username</label>
                            <input
                                type="text"
                                value={loginData.username}
                                onChange={e => setLoginData({ ...loginData, username: e.target.value })}
                                placeholder="Enter username"
                                required
                            />
                        </div>
                        <div className="admin-login__field">
                            <label>Security Code (Password)</label>
                            <input
                                type="password"
                                value={loginData.password}
                                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                                placeholder="Enter passcode"
                                required
                            />
                        </div>
                        {error && <p className="admin-login__error">{error}</p>}
                        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                            {loading ? 'Authenticating...' : 'Secure Login →'}
                        </button>
                    </form>
                    <button className="admin-login__back" onClick={onExit}>← Return to Website</button>
                    <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.75rem', opacity: 0.5 }}>Hint: admin / ace2026</p>
                </div>
            </div>
        )
    }

    return (
        <div className="admin">
            <aside className="admin__sidebar glass-card">
                <div className="admin__sidebar-header">
                    <div className="admin__sidebar-shield">ACE</div>
                    <span>Command Center</span>
                </div>
                <nav className="admin__sidebar-nav">
                    {[
                        { id: 'dashboard', label: '📊 Live Dashboard' },
                        { id: 'registrations', label: '📝 Data & Export' },
                        { id: 'contacts', label: '💌 Inquiries' },
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
                    <button className="admin__sidebar-btn" onClick={onExit}>🌐 Exit to Site</button>
                    <button className="admin__sidebar-btn admin__sidebar-btn--danger" onClick={handleLogout}>🚪 Lock Portal</button>
                </div>
            </aside>

            <main className="admin__content">
                {activeTab === 'dashboard' && (
                    <div className="admin__panel">
                        <h2>Analytics Dashboard</h2>
                        <div className="admin__stats-grid">
                            <div className="admin__stat-card glass-card reveal">
                                <span className="admin__stat-icon">📈</span>
                                <span className="admin__stat-value">{registrations.length}</span>
                                <span className="admin__stat-label">Total Registrations</span>
                            </div>
                            <div className="admin__stat-card glass-card reveal" style={{ animationDelay: "0.1s" }}>
                                <span className="admin__stat-icon">🎮</span>
                                <span className="admin__stat-value">{eventStats.length}</span>
                                <span className="admin__stat-label">Active Events</span>
                            </div>
                            <div className="admin__stat-card glass-card reveal" style={{ animationDelay: "0.2s" }}>
                                <span className="admin__stat-icon">🏫</span>
                                <span className="admin__stat-value">{collegeStats.length}</span>
                                <span className="admin__stat-label">Colleges Reached</span>
                            </div>
                            <div className="admin__stat-card glass-card reveal" style={{ animationDelay: "0.3s" }}>
                                <span className="admin__stat-icon">💎</span>
                                <span className="admin__stat-value">₹25K</span>
                                <span className="admin__stat-label">Prize Pool</span>
                            </div>
                        </div>

                        <div className="admin__charts-grid">
                            <div className="admin__chart-container glass-card">
                                <h3>Registrations per Event</h3>
                                <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <BarChart data={eventStats} margin={{ top: 20, right: 30, left: 0, bottom: 50 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                            <XAxis dataKey="name" stroke="#ccc" tick={{ fill: '#ccc', fontSize: 11 }} angle={-15} textAnchor="end" />
                                            <YAxis stroke="#ccc" />
                                            <Tooltip contentStyle={{ backgroundColor: '#111811', border: '1px solid #d4a017' }} />
                                            <Bar dataKey="Registrations" fill="url(#goldGradient)" radius={[4, 4, 0, 0]}>
                                                {eventStats.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="admin__chart-container glass-card">
                                <h3>Top Participating Colleges</h3>
                                <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <PieChart>
                                            <Pie
                                                data={collegeStats}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {collegeStats.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ backgroundColor: '#111811', border: '1px solid #d4a017' }} />
                                            <Legend verticalAlign="bottom" height={36} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'registrations' && (
                    <div className="admin__panel">
                        <div className="admin__panel-header">
                            <div>
                                <h2>Registration Logs</h2>
                                <p style={{ color: 'var(--text-muted)', marginTop: '5px' }}>View and download participant data for each event</p>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                <select
                                    className="admin__filter-select"
                                    value={selectedEventTable}
                                    onChange={(e) => setSelectedEventTable(e.target.value)}
                                >
                                    <option value="All Events">All Events</option>
                                    {EVENTS.map(ev => <option key={ev} value={ev}>{ev}</option>)}
                                </select>

                                <button className="btn-primary" onClick={downloadExcel} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    💾 Download Excel
                                </button>
                            </div>
                        </div>

                        <div className="admin__table-wrapper glass-card">
                            <div className="admin__table-stats">
                                Showing <strong>{filteredRegistrations.length}</strong> records for <strong>{selectedEventTable}</strong>
                            </div>

                            {filteredRegistrations.length === 0 ? (
                                <div className="admin__empty">No registrations found for this selection.</div>
                            ) : (
                                <div style={{ overflowX: 'auto' }}>
                                    <table className="admin__table">
                                        <thead>
                                            <tr>
                                                <th>Ref ID</th>
                                                <th>Participant Name</th>
                                                {selectedEventTable === 'All Events' && <th>Event Category</th>}
                                                <th>College</th>
                                                <th>Contact Info</th>
                                                <th>Date Registered</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredRegistrations.map((reg, idx) => (
                                                <tr key={idx} className="admin__table-row">
                                                    <td><span className="admin__badge">#ACE26-{reg.id}</span></td>
                                                    <td>
                                                        <strong>{reg.leaderName}</strong>
                                                        {reg.teamName !== 'N/A' && <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Team: {reg.teamName}</div>}
                                                    </td>
                                                    {selectedEventTable === 'All Events' && <td><span style={{ color: 'var(--gold)' }}>{reg.event}</span></td>}
                                                    <td>{reg.college}</td>
                                                    <td>
                                                        <div>{reg.email}</div>
                                                        <div style={{ opacity: 0.7, fontSize: '0.85rem' }}>+91 {reg.phone}</div>
                                                    </td>
                                                    <td style={{ opacity: 0.8, fontSize: '0.9rem' }}>{formatDate(reg.createdAt)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'contacts' && (
                    <div className="admin__panel">
                        <h2>Inquiries & Support</h2>
                        {contacts.length === 0 ? (
                            <div className="admin__empty-state glass-card">
                                <span style={{ fontSize: '3rem' }}>💌</span>
                                <h3>Inbox Empty</h3>
                            </div>
                        ) : (
                            <div className="admin__messages">
                                {contacts.map(msg => (
                                    <div key={msg.id} className="admin__message glass-card">
                                        <div className="admin__message-header">
                                            <strong>{msg.name}</strong>
                                            <span style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>{new Date(msg.createdAt).toLocaleString()}</span>
                                        </div>
                                        <p className="admin__message-subject">{msg.subject}</p>
                                        <p className="admin__message-body">{msg.message}</p>
                                        <p className="admin__message-email">Reply to: <a href={`mailto:${msg.email}`} style={{ color: 'var(--green-light)' }}>{msg.email}</a></p>
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
