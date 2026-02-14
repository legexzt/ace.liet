const { Pool } = require('pg')

const regions = [
    'ap-south-1', 'us-east-1', 'us-west-1', 'us-west-2', 'us-east-2',
    'eu-west-1', 'eu-west-2', 'eu-central-1', 'eu-north-1',
    'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'sa-east-1',
    'ap-northeast-2', 'ca-central-1', 'me-south-1', 'af-south-1'
]

async function test() {
    // Try session mode port 5432
    console.log('=== Testing port 5432 (session mode) ===')
    for (const r of regions) {
        try {
            const pool = new Pool({
                connectionString: `postgresql://postgres.tojdosncdfyastnqunpv:iamlegezt099@aws-0-${r}.pooler.supabase.com:5432/postgres`,
                ssl: { rejectUnauthorized: false },
                connectionTimeoutMillis: 5000,
            })
            const c = await pool.connect()
            console.log('SUCCESS! Region:', r, '(port 5432)')
            c.release()
            await pool.end()
            return
        } catch (e) {
            const msg = e.message.substring(0, 50)
            if (!msg.includes('Tenant')) console.log(r, ':5432 ->', msg)
        }
    }

    // Try transaction mode port 6543
    console.log('=== Testing port 6543 (transaction mode) ===')
    for (const r of regions) {
        try {
            const pool = new Pool({
                connectionString: `postgresql://postgres.tojdosncdfyastnqunpv:iamlegezt099@aws-0-${r}.pooler.supabase.com:6543/postgres`,
                ssl: { rejectUnauthorized: false },
                connectionTimeoutMillis: 5000,
            })
            const c = await pool.connect()
            console.log('SUCCESS! Region:', r, '(port 6543)')
            c.release()
            await pool.end()
            return
        } catch (e) {
            const msg = e.message.substring(0, 50)
            if (!msg.includes('Tenant')) console.log(r, ':6543 ->', msg)
        }
    }

    console.log('No region matched. Project may be paused.')
}

test()
