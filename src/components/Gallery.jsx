import { useState, useEffect, useRef } from 'react'
import './Gallery.css'

const GALLERY_ITEMS = [
    {
        id: 1,
        src: '/gallery/codestorm-poster.jpg',
        caption: 'CodeStorm 2026 — Technical Events, Workshops & Short Film Making',
        category: 'events',
        span: 'large',
    },
    {
        id: 2,
        src: '/gallery/prize-distribution.jpg',
        caption: 'Prize Distribution — Recognizing Talent & Achievement',
        category: 'ceremony',
        span: 'normal',
    },
    {
        id: 3,
        src: '/gallery/sanketika-fest.jpg',
        caption: 'Sanketika 2026 — The Grand Tech Fest Celebration',
        category: 'events',
        span: 'normal',
    },
    {
        id: 4,
        src: '/gallery/short-film-event.jpg',
        caption: 'Short Film Making — Creative Minds at Work',
        category: 'competitions',
        span: 'normal',
    },
    {
        id: 5,
        src: '/gallery/group-photo.jpg',
        caption: 'Team ACE — The Force Behind Sanketika',
        category: 'team',
        span: 'large',
    },
]

const CATEGORIES = ['all', 'events', 'ceremony', 'competitions', 'team']

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null)
    const [activeCategory, setActiveCategory] = useState('all')
    const [visibleItems, setVisibleItems] = useState([])
    const galleryRef = useRef(null)

    const filteredItems =
        activeCategory === 'all'
            ? GALLERY_ITEMS
            : GALLERY_ITEMS.filter((item) => item.category === activeCategory)

    // Intersection Observer for scroll-reveal animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = parseInt(entry.target.dataset.id)
                        setVisibleItems((prev) => [...new Set([...prev, id])])
                    }
                })
            },
            { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
        )

        const items = document.querySelectorAll('.gallery__item')
        items.forEach((item) => observer.observe(item))

        return () => observer.disconnect()
    }, [filteredItems])

    // Keyboard navigation in lightbox
    useEffect(() => {
        if (!selectedImage) return
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedImage(null)
            if (e.key === 'ArrowRight') {
                const idx = GALLERY_ITEMS.findIndex((i) => i.id === selectedImage.id)
                if (idx < GALLERY_ITEMS.length - 1) setSelectedImage(GALLERY_ITEMS[idx + 1])
            }
            if (e.key === 'ArrowLeft') {
                const idx = GALLERY_ITEMS.findIndex((i) => i.id === selectedImage.id)
                if (idx > 0) setSelectedImage(GALLERY_ITEMS[idx - 1])
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [selectedImage])

    return (
        <section id="gallery" className="gallery">
            <div className="container">
                <div className="reveal">
                    <h2 className="section-title">Gallery</h2>
                    <p className="section-subtitle">
                        Relive the moments from Sanketika — captured in frames
                    </p>
                </div>

                {/* Category Filter */}
                <div className="gallery__filters reveal">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            className={`gallery__filter-btn ${activeCategory === cat ? 'gallery__filter-btn--active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Masonry Gallery Grid */}
                <div className="gallery__grid reveal" ref={galleryRef}>
                    {filteredItems.map((item, i) => (
                        <div
                            key={item.id}
                            data-id={item.id}
                            className={`gallery__item ${item.span === 'large' ? 'gallery__item--large' : ''} ${visibleItems.includes(item.id) ? 'gallery__item--visible' : ''}`}
                            onClick={() => setSelectedImage(item)}
                            style={{ '--delay': `${i * 0.1}s` }}
                        >
                            <div className="gallery__item-img-wrapper">
                                <img
                                    src={item.src}
                                    alt={item.caption}
                                    className="gallery__item-img"
                                    loading="lazy"
                                />
                                <div className="gallery__item-shine" />
                            </div>
                            <div className="gallery__item-overlay">
                                <span className="gallery__item-category">{item.category}</span>
                                <p className="gallery__item-caption">{item.caption}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Instagram CTA */}
                <div className="gallery__cta reveal">
                    <a
                        href="https://www.instagram.com/ace_.liet/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gallery__cta-link"
                    >
                        <span className="gallery__cta-icon">📸</span>
                        <span>Follow us on Instagram for more!</span>
                        <span className="gallery__cta-arrow">→</span>
                    </a>
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div className="gallery__lightbox" onClick={() => setSelectedImage(null)}>
                    <div
                        className="gallery__lightbox-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="gallery__lightbox-close"
                            onClick={() => setSelectedImage(null)}
                        >
                            ✕
                        </button>

                        {/* Navigation arrows */}
                        {GALLERY_ITEMS.findIndex((i) => i.id === selectedImage.id) > 0 && (
                            <button
                                className="gallery__lightbox-nav gallery__lightbox-nav--prev"
                                onClick={() => {
                                    const idx = GALLERY_ITEMS.findIndex((i) => i.id === selectedImage.id)
                                    setSelectedImage(GALLERY_ITEMS[idx - 1])
                                }}
                            >
                                ‹
                            </button>
                        )}
                        {GALLERY_ITEMS.findIndex((i) => i.id === selectedImage.id) <
                            GALLERY_ITEMS.length - 1 && (
                                <button
                                    className="gallery__lightbox-nav gallery__lightbox-nav--next"
                                    onClick={() => {
                                        const idx = GALLERY_ITEMS.findIndex((i) => i.id === selectedImage.id)
                                        setSelectedImage(GALLERY_ITEMS[idx + 1])
                                    }}
                                >
                                    ›
                                </button>
                            )}

                        <img
                            src={selectedImage.src}
                            alt={selectedImage.caption}
                            className="gallery__lightbox-img"
                        />
                        <div className="gallery__lightbox-info">
                            <span className="gallery__lightbox-category">{selectedImage.category}</span>
                            <p className="gallery__lightbox-caption">{selectedImage.caption}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
