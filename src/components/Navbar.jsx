import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Mail } from 'lucide-react';

const NAV_ITEMS = [
    { label: 'About',      href: '#about' },
    { label: 'Skills',     href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects',   href: '#projects' },
    { label: 'Education',  href: '#education' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const scrollEl = document.querySelector('.r3f-scroll-container') || window;

        const handleScroll = (e) => {
            const target = e.target || window;
            const scrollTop = target.scrollTop !== undefined ? target.scrollTop : window.scrollY;
            setScrolled(scrollTop > 40);
        };

        // R3F ScrollControls renders into a div with overflow-y: scroll inside the canvas
        // Try to find that element
        const findScrollEl = () => {
            // The ScrollControls inner scroll div is a sibling of the canvas
            const canvasEl = document.querySelector('canvas');
            if (canvasEl) {
                const parent = canvasEl.parentElement;
                if (parent) {
                    // The scroll container is a div inside the same parent
                    const divs = parent.querySelectorAll('div[style]');
                    for (const d of divs) {
                        if (d.style.overflowY === 'scroll' || getComputedStyle(d).overflowY === 'scroll') {
                            return d;
                        }
                    }
                }
            }
            return null;
        };

        // Fallback to window scroll
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Try to find R3F scroll div
        const timer = setTimeout(() => {
            const el = findScrollEl();
            if (el) {
                el.addEventListener('scroll', handleScroll, { passive: true });
            }
        }, 1500);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavClick = (href) => {
        setIsOpen(false);
        // The R3F ScrollControls uses its own scroll div — normal anchor links won't work
        // Instead, scroll the R3F scroll container to the target element
        setTimeout(() => {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    return (
        <>
            <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
                {/* Logo */}
                <div className="navbar-logo">
                    <div className="logo-dot" />
                    DP<span style={{ color: 'rgba(148,163,184,0.5)', fontWeight: 400 }}>.dev</span>
                </div>

                {/* Desktop Nav Links */}
                <div className="navbar-links">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.href}
                            className="nav-link"
                            style={{ background: 'none', border: 'none', cursor: 'none' }}
                            onClick={() => handleNavClick(item.href)}
                        >
                            {item.label}
                        </button>
                    ))}
                    <a href="mailto:damiduprasad.jayarathna@gmail.com" className="nav-cta">
                        <Mail size={14} style={{ display: 'inline', marginRight: '6px' }} />
                        Hire Me
                    </a>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className={`nav-hamburger ${isOpen ? 'open' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                    style={{ cursor: 'pointer' }}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </nav>

            {/* Mobile Dropdown Menu */}
            <div className={`nav-mobile-menu ${isOpen ? 'open' : ''}`}>
                {NAV_ITEMS.map((item) => (
                    <button
                        key={item.href}
                        className="nav-mobile-link"
                        style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', color: 'inherit', fontFamily: 'inherit' }}
                        onClick={() => handleNavClick(item.href)}
                    >
                        {item.label}
                    </button>
                ))}
                <a
                    href="mailto:damiduprasad.jayarathna@gmail.com"
                    className="btn-primary"
                    style={{ marginTop: '0.5rem', justifyContent: 'center' }}
                    onClick={() => setIsOpen(false)}
                >
                    <Mail size={15} />
                    Hire Me
                </a>
            </div>
        </>
    );
};

export default Navbar;
