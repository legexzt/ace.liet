require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { createClient } = require('@supabase/supabase-js')

const app = express()
const PORT = process.env.PORT || 3001

// Supabase client (uses HTTPS REST API — no IPv6 issues)
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
let supabase = null

if (supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project')) {
    supabase = createClient(supabaseUrl, supabaseKey)
    console.log('✅ Supabase connected:', supabaseUrl)
} else {
    console.log('⚠️  Supabase not configured — running in demo mode')
}

// Middleware
app.use(cors())
app.use(express.json())

// JWT Auth middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) return res.status(401).json({ message: 'No token provided' })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ace-sanketika-2026-secret-key')
        req.admin = decoded
        next()
    } catch {
        return res.status(401).json({ message: 'Invalid token' })
    }
}

// In-memory store for demo mode
const demoStore = {
    registrations: [],
    contacts: [],
}

// ========================
// PUBLIC ROUTES
// ========================

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        supabase: supabase ? 'connected' : 'demo-mode',
        timestamp: new Date().toISOString(),
    })
})

// Register for event
app.post('/api/register', async (req, res) => {
    try {
        const { event, teamName, leaderName, members, college, email, phone, branch, year } = req.body

        if (!event || !leaderName || !email || !phone) {
            return res.status(400).json({ message: 'Missing required fields: event, leaderName, email, phone' })
        }

        const registration = {
            event,
            team_name: teamName || null,
            leader_name: leaderName,
            members: members || null,
            college: college || null,
            email,
            phone,
            branch: branch || null,
            year: year || null,
        }

        if (supabase) {
            const { data, error } = await supabase
                .from('registrations')
                .insert([registration])
                .select()

            if (error) throw error
            console.log(`📝 New registration: ${leaderName} → ${event}`)
            return res.json({ success: true, registration: data[0] })
        }

        // Demo mode
        registration.id = demoStore.registrations.length + 1
        registration.created_at = new Date().toISOString()
        demoStore.registrations.push(registration)
        console.log(`📝 [DEMO] New registration: ${leaderName} → ${event}`)
        res.json({ success: true, registration })
    } catch (err) {
        console.error('Registration error:', err.message)
        res.status(500).json({ message: 'Registration failed', error: err.message })
    }
})

// Contact form
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Missing required fields: name, email, message' })
        }

        const contact = {
            name,
            email,
            subject: subject || 'General Inquiry',
            message,
        }

        if (supabase) {
            const { data, error } = await supabase
                .from('contacts')
                .insert([contact])
                .select()

            if (error) throw error
            console.log(`💌 New contact: ${name} — ${subject}`)
            return res.json({ success: true, contact: data[0] })
        }

        contact.id = demoStore.contacts.length + 1
        contact.created_at = new Date().toISOString()
        demoStore.contacts.push(contact)
        console.log(`💌 [DEMO] New contact: ${name} — ${subject}`)
        res.json({ success: true, contact })
    } catch (err) {
        console.error('Contact error:', err.message)
        res.status(500).json({ message: 'Contact submission failed', error: err.message })
    }
})

// ========================
// ADMIN ROUTES
// ========================

// Admin login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body
    const adminUser = process.env.ADMIN_USERNAME || 'admin'
    const adminPass = process.env.ADMIN_PASSWORD || 'ace2026'

    if (username === adminUser && password === adminPass) {
        const token = jwt.sign(
            { username, role: 'admin' },
            process.env.JWT_SECRET || 'ace-sanketika-2026-secret-key',
            { expiresIn: '24h' }
        )
        console.log(`🔐 Admin logged in: ${username}`)
        return res.json({ token, username })
    }

    res.status(401).json({ message: 'Invalid credentials' })
})

// Get all registrations (admin)
app.get('/api/registrations', authMiddleware, async (req, res) => {
    try {
        if (supabase) {
            const { data, error } = await supabase
                .from('registrations')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            return res.json(data)
        }

        res.json(demoStore.registrations)
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch registrations', error: err.message })
    }
})

// Get all contacts (admin)
app.get('/api/contacts', authMiddleware, async (req, res) => {
    try {
        if (supabase) {
            const { data, error } = await supabase
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            return res.json(data)
        }

        res.json(demoStore.contacts)
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch contacts', error: err.message })
    }
})

// Delete registration (admin)
app.delete('/api/registrations/:id', authMiddleware, async (req, res) => {
    try {
        if (supabase) {
            const { error } = await supabase
                .from('registrations')
                .delete()
                .eq('id', req.params.id)

            if (error) throw error
            return res.json({ success: true })
        }

        demoStore.registrations = demoStore.registrations.filter(r => r.id !== parseInt(req.params.id))
        res.json({ success: true })
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete', error: err.message })
    }
})

// ========================
// START SERVER
// ========================
app.listen(PORT, () => {
    console.log('')
    console.log('  ╔═══════════════════════════════════════╗')
    console.log('  ║   🏆 ACE SANKETIKA 2026 BACKEND 🏆   ║')
    console.log('  ╠═══════════════════════════════════════╣')
    console.log(`  ║   Server:  http://localhost:${PORT}      ║`)
    console.log(`  ║   Mode:    ${supabase ? 'Supabase' : 'Demo     '}              ║`)
    console.log('  ║   Admin:   admin / ace2026            ║')
    console.log('  ╚═══════════════════════════════════════╝')
    console.log('')
})
