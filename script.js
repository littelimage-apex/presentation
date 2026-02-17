document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // 1. INITIALIZE LUCIDE ICONS
    // ============================================
    lucide.createIcons();

    // ============================================
    // 2. SCROLL REVEAL ANIMATION
    // ============================================
    // Use IntersectionObserver with threshold 0.1
    // Select all '.reveal' elements
    // When intersecting, add 'active' class
    // The CSS handles the animation (opacity 0->1, translateY 30px->0)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ============================================
    // 3. NAVBAR SCROLL EFFECT
    // ============================================
    // Add 'scrolled' class to #navbar when window.scrollY > 50
    // This adds a subtle box-shadow
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ============================================
    // 4. MOBILE MENU TOGGLE
    // ============================================
    // Toggle 'open' class on #navLinks when #mobileMenuBtn is clicked
    // Swap the lucide icon between 'menu' and 'x'
    // Close menu when a nav link is clicked
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const icon = mobileBtn.querySelector('[data-lucide]');
        const isOpen = navLinks.classList.contains('open');
        icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        lucide.createIcons();
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            const icon = mobileBtn.querySelector('[data-lucide]');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });

    // ============================================
    // 5. SMOOTH SCROLL FOR NAV LINKS
    // ============================================
    // All anchor links with href starting with '#'
    // Calculate offset for fixed navbar height
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // 6. ACTIVE NAV LINK HIGHLIGHTING (scroll spy)
    // ============================================
    // Use IntersectionObserver to track which section is visible
    // Update active class on corresponding nav link
    const sections = document.querySelectorAll('section[id]');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
                const activeLink = navLinks.querySelector(`a[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });
    sections.forEach(section => navObserver.observe(section));

    // ============================================
    // 7. PACKAGE TAB SWITCHER
    // ============================================
    // Click on .pkg-tab buttons switches active tab and corresponding .pkg-panel
    // Uses data-pkg and data-pkg-panel attributes
    const pkgTabs = document.querySelectorAll('.pkg-tab');
    const pkgPanels = document.querySelectorAll('.pkg-panel');

    pkgTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.pkg;
            // Update active tab
            pkgTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // Update active panel
            pkgPanels.forEach(p => p.classList.remove('active'));
            const targetPanel = document.querySelector(`.pkg-panel[data-pkg-panel="${target}"]`);
            if (targetPanel) {
                targetPanel.classList.add('active');
                // Re-initialize Lucide icons for newly visible content
                lucide.createIcons();
            }
        });
    });

    // ============================================
    // 8. FAQ ACCORDION
    // ============================================
    // Click on .faq-question toggles 'open' class on parent .faq-item
    // Only one item open at a time (close others when opening)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const wasOpen = item.classList.contains('open');
            // Close all items
            faqItems.forEach(i => i.classList.remove('open'));
            // Toggle the clicked item
            if (!wasOpen) {
                item.classList.add('open');
            }
        });
    });

    // ============================================
    // 9. REVIEW CAROUSEL
    // ============================================
    // translateX-based sliding carousel
    // Prev/Next buttons, dot indicators, auto-rotate every 5s
    // Pause auto-rotate on hover
    const reviewTrack = document.getElementById('reviewTrack');
    const reviewPrev = document.getElementById('reviewPrev');
    const reviewNext = document.getElementById('reviewNext');
    const reviewDots = document.getElementById('reviewDots');
    const reviewCarousel = document.getElementById('reviewCarousel');

    if (reviewTrack && reviewPrev && reviewNext && reviewDots) {
        const slides = reviewTrack.querySelectorAll('.review-slide');
        const totalReviews = slides.length;
        let currentReview = 0;
        let autoRotateTimer;

        // Create dot indicators
        for (let i = 0; i < totalReviews; i++) {
            const dot = document.createElement('button');
            dot.classList.add('review-dot');
            dot.setAttribute('aria-label', `Go to review ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToReview(i));
            reviewDots.appendChild(dot);
        }

        function goToReview(index) {
            currentReview = index;
            reviewTrack.style.transform = `translateX(-${index * 100}%)`;
            // Update dots
            reviewDots.querySelectorAll('.review-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        reviewPrev.addEventListener('click', () => {
            goToReview(currentReview === 0 ? totalReviews - 1 : currentReview - 1);
        });

        reviewNext.addEventListener('click', () => {
            goToReview(currentReview === totalReviews - 1 ? 0 : currentReview + 1);
        });

        // Auto-rotate
        function startAutoRotate() {
            autoRotateTimer = setInterval(() => {
                goToReview(currentReview === totalReviews - 1 ? 0 : currentReview + 1);
            }, 5000);
        }
        startAutoRotate();

        // Pause on hover
        if (reviewCarousel) {
            reviewCarousel.addEventListener('mouseenter', () => clearInterval(autoRotateTimer));
            reviewCarousel.addEventListener('mouseleave', () => startAutoRotate());
        }
    }

    // ============================================
    // 10. LIGHTBOX GALLERY
    // ============================================
    // Full-screen image viewer with prev/next navigation
    // Works with data-lightbox-group and data-lightbox-src attributes
    // Supports keyboard navigation (ArrowLeft, ArrowRight, Escape)
    const lightboxOverlay = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxCounter = document.getElementById('lightboxCounter');

    if (lightboxOverlay && lightboxImg) {
        let lightboxImages = [];
        let lightboxIndex = 0;

        // Initialize lightbox groups
        function initLightbox() {
            const groups = {};
            document.querySelectorAll('[data-lightbox-group]').forEach(container => {
                const groupName = container.dataset.lightboxGroup;
                const items = container.querySelectorAll('[data-lightbox-src]');
                if (!groups[groupName]) groups[groupName] = [];
                items.forEach(item => {
                    groups[groupName].push(item.dataset.lightboxSrc);
                    item.addEventListener('click', (e) => {
                        e.preventDefault();
                        openLightbox(groups[groupName], groups[groupName].indexOf(item.dataset.lightboxSrc));
                    });
                });
            });
        }

        function openLightbox(images, index) {
            lightboxImages = images;
            lightboxIndex = index;
            updateLightbox();
            lightboxOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightboxOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        function updateLightbox() {
            lightboxImg.src = lightboxImages[lightboxIndex];
            if (lightboxCounter) {
                lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
            }
            // Show/hide nav buttons
            if (lightboxPrev) lightboxPrev.style.display = lightboxImages.length > 1 ? 'flex' : 'none';
            if (lightboxNext) lightboxNext.style.display = lightboxImages.length > 1 ? 'flex' : 'none';
        }

        function prevImage() {
            lightboxIndex = lightboxIndex === 0 ? lightboxImages.length - 1 : lightboxIndex - 1;
            updateLightbox();
        }

        function nextImage() {
            lightboxIndex = lightboxIndex === lightboxImages.length - 1 ? 0 : lightboxIndex + 1;
            updateLightbox();
        }

        // Event listeners
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
        if (lightboxNext) lightboxNext.addEventListener('click', nextImage);

        // Close on overlay click (not on image)
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) closeLightbox();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightboxOverlay.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        });

        initLightbox();
    }

    // ============================================
    // 11. CONTACT FORM HANDLER
    // ============================================
    // Prevent default form submission
    // Show success feedback on button
    // Reset form after 3 seconds
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Message Sent!';
            btn.style.background = 'var(--color-secondary)';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 3000);
        });
    }

});
