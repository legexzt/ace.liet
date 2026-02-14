const https = require('https')
const fs = require('fs')
const path = require('path')

const galleryDir = path.join(__dirname, '..', 'public', 'gallery')
if (!fs.existsSync(galleryDir)) fs.mkdirSync(galleryDir, { recursive: true })

const images = [
    {
        name: 'codestorm-poster.jpg',
        url: 'https://instagram.fhyd5-2.fna.fbcdn.net/v/t51.75761-15/491432721_17852559492430342_17100971646883998_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=MzYxNTcwNzQ1MjAxMzcwNDU5Mw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEzNTB4MTY4OC5zZHIuQzMifQ%3D%3D&_nc_ohc=KZkzpv0dqQEQ7kNvwFjJDHQ&_nc_oc=AdnGCsq8e9fv3E1K7gMCuUw2yrOuJ1wO4XFRPBYPmiuwDP6CXRSgsZ2bkGTma_3FOos&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhyd5-2.fna&_nc_gid=cyqdDKiWnKS89wufvuWD_g&oh=00_AfutYOLjFi48nsBrDpEyqilqLB0J-8giLgGVa-LAY1GvMw&oe=6996B4D6'
    },
    {
        name: 'prize-distribution.jpg',
        url: 'https://instagram.fhyd5-2.fna.fbcdn.net/v/t51.75761-15/505110955_17854843113449543_1094980127284545851_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=110&ig_cache_key=MzY1MTAwNjI1MzA2NzIyMTQ4OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4ODEwLmhkci5DMyJ9&_nc_ohc=_XfdO0j12fcQ7kNvwHBpEsD&_nc_oc=AdktN5E9a5NHenjeXdXAaboJ23-rttceLOzjYrl-pq-Iy2IL38R9s43wxh2a-HnmECY&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhyd5-2.fna&_nc_gid=cyqdDKiWnKS89wufvuWD_g&oh=00_Afsy8-t1sOpS0oni4Y5SJ8VFQJI1KYiBSelt5OzQ3R5Umw&oe=6996A9B9'
    },
    {
        name: 'sanketika-fest.jpg',
        url: 'https://instagram.fhyd5-2.fna.fbcdn.net/v/t51.75761-15/505186815_17854842816449543_5272015612488798397_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=102&ig_cache_key=MzY1MTAwNDAwNjM2MzA3MDU4Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4ODEwLmhkci5DMyJ9&_nc_ohc=bth16xxTtY8Q7kNvwFlVJGj&_nc_oc=AdmEHFKN__bdU-nDmDL4KSG_-T47dHOl6iKsseHOYZ6tqW_6w9aqZpoHATXmwJVB-yM&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhyd5-2.fna&_nc_gid=cyqdDKiWnKS89wufvuWD_g&oh=00_Afu-5MNe9qnEF9M3XZtJhFLvrbOHL3HvMcFvWCJkw6Xplw&oe=6996D804'
    },
    {
        name: 'short-film-event.jpg',
        url: 'https://instagram.fhyd5-2.fna.fbcdn.net/v/t51.75761-15/496223318_17850351750449543_8257998212112997661_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=110&ig_cache_key=MzYyNTc4OTMzMTU4MTI1MzgwMw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4ODEwLmhkci5DMyJ9&_nc_ohc=21yFpiF7DkMQ7kNvwFV7XsW&_nc_oc=AdnecawfQET8FRRYJ82sDco6COIpTePRQdfpi6UHnc7ntnvAFjZg6HRDXboOFqpWd70&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhyd5-2.fna&_nc_gid=cyqdDKiWnKS89wufvuWD_g&oh=00_Aft1zUfkY6o-YVtmgJ0YO67BogdLGW5RfWvMoIkEkFIDZg&oe=6996B6DE'
    },
    {
        name: 'group-photo.jpg',
        url: 'https://instagram.fhyd5-2.fna.fbcdn.net/v/t51.75761-15/491901807_17849842908449543_4900464025086697414_n.jpg?stp=dst-jpegr_e35_tt6&_nc_cat=107&ig_cache_key=MzYyMjk4NzUwNjQ4NjU2MDc2Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTEyMy5oZHIuQzMifQ%3D%3D&_nc_ohc=cSTXsX2aySEQ7kNvwGxlyiV&_nc_oc=AdnqPoPW0n5Yy0ReDQxHXbsFjPNK89C9QNoC_q9oWEQoTrCShfq7sxIel9UZjpvuz9g&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhyd5-2.fna&_nc_gid=cyqdDKiWnKS89wufvuWD_g&oh=00_AftCwMjdavjt5WOv4KOnhnBzqBQVNvDBsrrIX27Y97lHNA&oe=6996CC0B'
    }
]

async function download(url, filename) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(galleryDir, filename)
        const file = fs.createWriteStream(filePath)

        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                // Follow redirect
                https.get(response.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res2) => {
                    res2.pipe(file)
                    file.on('finish', () => { file.close(); resolve(filePath) })
                }).on('error', reject)
            } else {
                response.pipe(file)
                file.on('finish', () => { file.close(); resolve(filePath) })
            }
        }).on('error', reject)
    })
}

async function main() {
    for (const img of images) {
        try {
            const p = await download(img.url, img.name)
            const stats = fs.statSync(p)
            console.log(`✅ ${img.name} — ${(stats.size / 1024).toFixed(1)} KB`)
        } catch (e) {
            console.log(`❌ ${img.name} — ${e.message}`)
        }
    }
    console.log('\nDone! Images saved to public/gallery/')
}

main()
