const https = require('https');
const fs = require('fs');
const path = require('path');

const sponsorDir = path.join(__dirname, '..', 'public', 'sponsors');
if (!fs.existsSync(sponsorDir)) fs.mkdirSync(sponsorDir, { recursive: true });

const images = [
    { name: 'osmania.png', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Osmania_University_Logo.svg/512px-Osmania_University_Logo.svg.png' },
    { name: 'iic.png', url: 'https://iic.mic.gov.in/assets/img/iic-logo.png' },
    { name: 'nirf.png', url: 'https://www.nirfindia.org/Images/nirf-logo-new.png' },
    { name: 'aicte.png', url: 'https://upload.wikimedia.org/wikipedia/en/e/eb/All_India_Council_for_Technical_Education_logo.png' },
    { name: 'ugc.png', url: 'https://upload.wikimedia.org/wikipedia/en/1/15/University_Grants_Commission_%28India%29_logo.png' },
    { name: 'naac.png', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Logo_of_NAAC.png/320px-Logo_of_NAAC.png' },
    { name: 'nba.png', url: 'https://www.nbaind.org/assets/img/nba_logo.png' },
    { name: 'lords-skill.png', url: 'https://lords.ac.in/wp-content/uploads/2021/11/Lords-Skill-Academy.png' } // Assuming this exists or will fail gracefully
];

async function download(url, filename) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(sponsorDir, filename);
        if (fs.existsSync(filePath)) return resolve(filePath);

        const file = fs.createWriteStream(filePath);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                https.get(response.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
                    res2.pipe(file);
                    file.on('finish', () => { file.close(); resolve(filePath) });
                }).on('error', reject);
            } else {
                response.pipe(file);
                file.on('finish', () => { file.close(); resolve(filePath) });
            }
        }).on('error', reject);
    });
}

async function main() {
    for (const img of images) {
        try {
            const p = await download(img.url, img.name);
            const stats = fs.statSync(p);
            console.log(`✅ ${img.name} — ${(stats.size / 1024).toFixed(1)} KB`);
        } catch (e) {
            console.log(`❌ ${img.name} — ${e.message}`);
        }
    }
}

main();
