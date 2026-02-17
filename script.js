document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // 1. INITIALIZE LUCIDE ICONS
    // ============================================
    lucide.createIcons();

    // ============================================
    // 2. SCROLL REVEAL ANIMATION
    // ============================================
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
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ============================================
    // 4. MOBILE MENU TOGGLE
    // ============================================
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
    // 6. ACTIVE NAV LINK HIGHLIGHTING
    // ============================================
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
    // 7. COLLECTIONS - Pillars + Gallery System
    // ============================================
    const categoryImages = {
        newborn: [
            'assets/images/newborn/1-45da4fdb-1000.jpg',
            'assets/images/newborn/3.1-b76dcd28-1000.jpg',
            'assets/images/newborn/4-48ce8281-1000.jpg',
            'assets/images/newborn/64-7694e869-1000.jpg',
            'assets/images/newborn/69-ad18d5c0-1000.jpg',
            'assets/images/newborn/71-d1d561d4-1000.jpg',
            'assets/images/newborn/73-5b55e942-1000.jpg',
            'assets/images/newborn/74-08272da1-1000.jpg',
            'assets/images/newborn/76-4aaca081-1000.jpg',
            'assets/images/newborn/9.1-61a03e72-1000.jpg',
            'assets/images/newborn/LittleImage_Braun_6-2223d33b-1000.jpg',
            'assets/images/newborn/LittleImage_Drezner_4-af714b0e-1000.jpg',
            'assets/images/newborn/LittleImage_Greenfeld_2.0-45b9a5c6-1000.jpg',
            'assets/images/newborn/LittleImage_Grunbaum_2-ccf049bc-1000.jpg',
            'assets/images/newborn/LittleImage_Guttman_3-f0bbda0b-1000.jpg',
            'assets/images/newborn/Littleimage_Klein_1-1bbc4662-1000.jpg'
        ],
        child: [
            'assets/images/child/22-f4468cd2-1500.jpg',
            'assets/images/child/23-9d67bdc8-1500.jpg',
            'assets/images/child/500-3bbd6787-1500.jpg',
            'assets/images/child/LittleImage_Pollak_1-3db683b3-1500.jpg',
            'assets/images/child/LittleImage_Mauskopf_1-f736b7d9-1500.jpg',
            'assets/images/child/LittleImage_Mauskopf_2-56f3f1c9-1500.jpg',
            'assets/images/child/LittleImage_Scher_1-d92a6d54-1500.jpg',
            'assets/images/child/LittleImage_Weberman_1-f167101e-1500.jpg',
            'assets/images/child/LittleImage_Weissberg_2-6b43eb27-1500.jpg',
            'assets/images/child/LittleImagePhotography_Cohen_1-0400d0e8-1500.jpg',
            'assets/images/child/LittleImagePhotography_Deutsch_5-7eb0ffb7-1500.jpg',
            'assets/images/child/LittleImagePhotography_Kaufman_2-1cdb7143-1500.jpg'
        ],
        outdoor: [
            'assets/images/outdoor/13-7343e297-2500.jpg',
            'assets/images/outdoor/2-6ea104f9-2500.jpg',
            'assets/images/outdoor/Littleimage_Grunhut_2-70c61d27-2500.jpg',
            'assets/images/outdoor/Littleimage_Grunhut_4-82719fd4-2500.jpg',
            'assets/images/outdoor/LittleImage_Klein_2-686b05cd-2500.jpg',
            'assets/images/outdoor/LittleImage_Photography_1-4c27a018-2500.jpg',
            'assets/images/outdoor/LittleImage_Wertzberger_3-646092d1-2500.jpg',
            'assets/images/outdoor/LittleImage_Wertzberger_4-72b815c5-2500.jpg'
        ],
        milestone: [
            'assets/images/three_year_milestone/10-52b89603-1500.jpg',
            'assets/images/three_year_milestone/11-a00f14f0-1500.jpg',
            'assets/images/three_year_milestone/12-a8773ce8-1500.jpg',
            'assets/images/three_year_milestone/13-5ac0be1b-1500.jpg',
            'assets/images/three_year_milestone/15-bc8af62f-1500.jpg',
            'assets/images/three_year_milestone/16-4e3d74dc-1500.jpg',
            'assets/images/three_year_milestone/3.1-5342156c-1500.jpg',
            'assets/images/three_year_milestone/4-aa2dadf3-1500.jpg',
            'assets/images/three_year_milestone/LittleImage_Indig_3-e488ccbe-1500.jpg',
            'assets/images/three_year_milestone/LittleImage_Landau_3-389ced6e-1500.jpg',
            'assets/images/three_year_milestone/LittleImage_Weberman_3-46e50748-1500.jpg',
            'assets/images/three_year_milestone/Srulupsherin1-50f93272-1500.jpg'
        ],
        special: [
            'assets/images/special_occasion/2-899f6b4b-1000.jpg',
            'assets/images/special_occasion/3.-68e150c7-1000.jpg',
            'assets/images/special_occasion/11-215ff55c-1000.jpg',
            'assets/images/special_occasion/LittleImage_Hershkowitz_1-b66e1d7f-1000.jpg',
            'assets/images/special_occasion/LittleImage_Hershkowitz_2-e51cd99c-1000.jpg',
            'assets/images/special_occasion/LittleImage_Katz_1-321511af-1000.jpg',
            'assets/images/special_occasion/LittleImage_Katz_3-6167d54c-1000.jpg',
            'assets/images/special_occasion/LittleImage_Lieberman_2-fcbd90b7-1000.jpg'
        ]
    };

    const categoryNames = {
        newborn: 'Newborn',
        child: 'Personality',
        outdoor: 'Adventure',
        milestone: 'Tradition',
        special: 'Celebrations'
    };

    const pillars = document.getElementById('collectionPillars');
    const gallery = document.getElementById('collectionGallery');
    const galleryGrid = document.getElementById('collectionGrid');
    const galleryTitle = document.getElementById('collectionTitle');
    const backBtn = document.getElementById('collectionBack');

    if (pillars && gallery && galleryGrid) {
        // Click on a collection card to open gallery
        document.querySelectorAll('.collection-card[data-category]').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                openCategoryGallery(category);

                // Mark active card
                document.querySelectorAll('.collection-card').forEach(c => c.classList.remove('active-pillar'));
                card.classList.add('active-pillar');
            });
        });

        // Back button
        backBtn.addEventListener('click', () => {
            closeCategoryGallery();
        });

        function openCategoryGallery(category) {
            const images = categoryImages[category] || [];
            const title = categoryNames[category] || category;

            // Collapse pillars
            pillars.classList.add('collapsed');

            // Set title
            galleryTitle.textContent = title;

            // Populate grid
            galleryGrid.innerHTML = '';
            images.forEach(src => {
                const thumb = document.createElement('div');
                thumb.className = 'gallery-thumb';
                thumb.setAttribute('data-lightbox-src', src);
                thumb.innerHTML = `<img src="${src}" alt="${title} photography" loading="lazy">`;
                galleryGrid.appendChild(thumb);
            });

            // Show gallery
            gallery.classList.add('open');

            // Re-init lightbox for new images
            initLightbox();
            lucide.createIcons();

            // Scroll to gallery
            setTimeout(() => {
                gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }

        function closeCategoryGallery() {
            pillars.classList.remove('collapsed');
            gallery.classList.remove('open');
            document.querySelectorAll('.collection-card').forEach(c => c.classList.remove('active-pillar'));

            // Scroll back to collections grid
            setTimeout(() => {
                pillars.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }

    // ============================================
    // 8. PACKAGE TAB SWITCHER
    // ============================================
    const pkgTabs = document.querySelectorAll('.pkg-tab');
    const pkgPanels = document.querySelectorAll('.pkg-panel');

    pkgTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.pkg;
            pkgTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            pkgPanels.forEach(p => p.classList.remove('active'));
            const targetPanel = document.querySelector(`.pkg-panel[data-pkg-panel="${target}"]`);
            if (targetPanel) {
                targetPanel.classList.add('active');
                lucide.createIcons();
            }
        });
    });

    // ============================================
    // 9. FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const wasOpen = item.classList.contains('open');
            faqItems.forEach(i => i.classList.remove('open'));
            if (!wasOpen) item.classList.add('open');
        });
    });

    // ============================================
    // 10. LIGHTBOX GALLERY
    // ============================================
    const lightboxOverlay = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxCounter = document.getElementById('lightboxCounter');

    let lightboxImages = [];
    let lightboxIndex = 0;

    function initLightbox() {
        // Remove old click listeners by cloning (simple approach for dynamic content)
        document.querySelectorAll('[data-lightbox-src]').forEach(item => {
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);
        });

        // Re-attach listeners
        document.querySelectorAll('[data-lightbox-group]').forEach(container => {
            const items = container.querySelectorAll('[data-lightbox-src]');
            const srcs = Array.from(items).map(i => i.dataset.lightboxSrc);
            items.forEach((item, idx) => {
                item.style.cursor = 'pointer';
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    openLightbox(srcs, idx);
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

    if (lightboxOverlay && lightboxImg) {
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
        if (lightboxNext) lightboxNext.addEventListener('click', nextImage);

        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) closeLightbox();
        });

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
