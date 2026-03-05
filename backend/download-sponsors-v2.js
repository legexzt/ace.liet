const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream/promises');

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
    { name: 'lords-skill.png', url: 'https://lords.ac.in/wp-content/uploads/2021/11/Lords-Skill-Academy.png' }
];

const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://en.wikipedia.org/',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none'
};

async function download(url, filename) {
    const filePath = path.join(sponsorDir, filename);
    const res = await fetch(url, { headers, redirect: 'follow' });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
        throw new Error(`Not an image: Content-Type is ${contentType}`);
    }

    const fileStream = fs.createWriteStream(filePath);
    await pipeline(res.body, fileStream);
    return filePath;
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
