const https = require('https');
const fs = require('fs');
const path = require('path');

const sponsorDir = path.join(__dirname, '..', 'public', 'sponsors');

const clearbitImages = [
    { name: 'osmania.png', url: 'https://logo.clearbit.com/osmania.ac.in' },
    { name: 'nirf.png', url: 'https://logo.clearbit.com/nirfindia.org' },
    { name: 'ugc.png', url: 'https://logo.clearbit.com/ugc.gov.in' },
    { name: 'naac.png', url: 'https://logo.clearbit.com/naac.gov.in' },
    { name: 'nba.png', url: 'https://logo.clearbit.com/nbaind.org' },
    { name: 'lords-skill.png', url: 'https://logo.clearbit.com/lords.ac.in' }
];

async function downloadClearbit() {
    for (const img of clearbitImages) {
        const filePath = path.join(sponsorDir, img.name);
        try {
            const res = await fetch(img.url);
            if (res.ok) {
                const buffer = await res.arrayBuffer();
                fs.writeFileSync(filePath, Buffer.from(buffer));
                console.log(`✅ ${img.name}`);
            } else {
                console.log(`❌ ${img.name} - ${res.status}`);
            }
        } catch (e) {
            console.log(`❌ ${img.name} - ${e.message}`);
        }
    }
}

downloadClearbit();
