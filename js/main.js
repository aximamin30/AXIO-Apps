/**
 * AXIO Apps Website JavaScript Logic
 * Implements smooth page interactions, animations, menu toggles, and hover glows.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Sticky Header scroll behavior
    // ==========================================
    const header = document.getElementById('main-header');
    const handleScrollHeader = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScrollHeader);
    handleScrollHeader(); // Run on init in case page is refreshed while scrolled

    // ==========================================
    // 2. Mobile Navigation Toggle Drawer
    // ==========================================
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu-container');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Prevent body scrolling when mobile menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'initial';
        });

        // Close menu when links are clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'initial';
            });
        });
    }

    // ==========================================
    // 3. Dynamic Card Glow Effect (Mouse Tracker)
    // ==========================================
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Calculate mouse coordinates relative to the card bounds
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set custom properties on the card element
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // ==========================================
    // 4. Scroll Reveal Animations (IntersectionObserver)
    // ==========================================
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    // Stop observing once animated in
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of element is visible
            rootMargin: '0px 0px -50px 0px' // Offset trigger point slightly for cleaner reveals
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('reveal-active'));
    }

    // ==========================================
    // 5. Active Link Highlight on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-link');

    const handleScrollActiveLink = () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Highlight a little early as user enters section
            if (window.scrollY >= (sectionTop - 200)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === '#' && (currentSectionId === 'home' || currentSectionId === 'main-header')) {
                item.classList.add('active');
            } else if (href === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScrollActiveLink);
    handleScrollActiveLink(); // Initial check on load
});
