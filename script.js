// Init Icons
        lucide.createIcons();

        // =============================================
        // SCROLL REVEAL ANIMATION
        // =============================================
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.slide, .anatomy-section').forEach(section => {
            section.classList.add('reveal');
            observer.observe(section);
        });

        document.querySelectorAll('.demo-window').forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });

        document.querySelectorAll('.stagger-reveal').forEach(el => {
            observer.observe(el);
        });

        // =============================================
        // NAVIGATION DOTS
        // =============================================
        const navDots = document.querySelectorAll('.nav-dot');
        const allSections = document.querySelectorAll('.slide, .anatomy-section');

        navDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const target = document.getElementById(dot.dataset.target);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Update active dot on scroll
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navDots.forEach(d => d.classList.remove('active'));
                    const dot = document.querySelector(`.nav-dot[data-target="${entry.target.id}"]`);
                    if (dot) dot.classList.add('active');
                }
            });
        }, { threshold: 0.3 });

        allSections.forEach(section => {
            if (section.id) navObserver.observe(section);
        });

        // =============================================
        // CATEGORY GALLERY SWITCHER
        // =============================================
        const categoryCircles = document.querySelectorAll('.category-circle');
        const categoryGalleries = document.querySelectorAll('.category-gallery');

        categoryCircles.forEach(circle => {
            circle.addEventListener('click', () => {
                const category = circle.dataset.category;

                categoryCircles.forEach(c => c.classList.remove('active'));
                circle.classList.add('active');

                categoryGalleries.forEach(g => g.classList.remove('active'));
                const target = document.querySelector(`.category-gallery[data-gallery="${category}"]`);
                if (target) {
                    target.classList.add('active');
                    // Re-init lucide icons for the newly shown content
                    lucide.createIcons();
                }
            });
        });

        // =============================================
        // GALLERY LAB TAB SWITCHER
        // =============================================
        const galleryTabs = document.querySelectorAll('.gallery-tab');
        const galleryPanels = document.querySelectorAll('.gallery-panel');

        galleryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const panel = tab.dataset.panel;

                galleryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                galleryPanels.forEach(p => p.classList.remove('active'));
                const target = document.querySelector(`.gallery-panel[data-panel-id="${panel}"]`);
                if (target) {
                    target.classList.add('active');
                    lucide.createIcons();
                }
            });
        });

        // =============================================
        // COLLECTION STYLE TABS
        // =============================================
        const collectionTabs = document.querySelectorAll('.collection-style-tab');
        const collectionPanels = document.querySelectorAll('.collection-panel');

        collectionTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const panel = tab.dataset.collectionPanel;

                collectionTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                collectionPanels.forEach(p => p.classList.remove('active'));
                const target = document.querySelector(`.collection-panel[data-collection-panel-id="${panel}"]`);
                if (target) {
                    target.classList.add('active');
                }
            });
        });

        // =============================================
        // PACKAGE LAB TAB SWITCHER
        // =============================================
        const packageTabs = document.querySelectorAll('.package-tab');
        const packagePanels = document.querySelectorAll('.package-panel');

        packageTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const panel = tab.dataset.pkgPanel;

                packageTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                packagePanels.forEach(p => p.classList.remove('active'));
                const target = document.querySelector(`.package-panel[data-pkg-panel-id="${panel}"]`);
                if (target) {
                    target.classList.add('active');
                    lucide.createIcons();
                }
            });
        });

        // =============================================
        // LAYOUT SWITCHERS (HERO, ABOUT)
        // =============================================
        const layoutTabs = document.querySelectorAll('.layout-tab[data-tab-group]');
        const layoutPanels = document.querySelectorAll('.layout-panel[data-panel-group]');

        layoutTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const group = tab.dataset.tabGroup;
                const id = tab.dataset.tabId;

                // Update Tabs
                document.querySelectorAll(`.layout-tab[data-tab-group="${group}"]`).forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Update Panels
                document.querySelectorAll(`.layout-panel[data-panel-group="${group}"]`).forEach(p => p.classList.remove('active'));
                const target = document.querySelector(`.layout-panel[data-panel-group="${group}"][data-panel-id="${id}"]`);
                if (target) {
                    target.classList.add('active');
                    lucide.createIcons();
                }
            });
        });

        // =============================================
        // GLOBAL PREVIEW STYLE SWITCHER
        // =============================================
        const previewStyleTabs = document.querySelectorAll('[data-style-id]');
        const mainPreview = document.getElementById('mainWebsitePreview');

        previewStyleTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const styleId = tab.dataset.styleId;

                // Update Tabs
                previewStyleTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Update Preview Class
                mainPreview.className = 'preview-browser'; // Reset
                if (styleId !== 'style-default') mainPreview.classList.add(styleId);
                
                // Scroll to top of preview when style changes
                const scrollArea = mainPreview.querySelector('.preview-scroll-area');
                if (scrollArea) scrollArea.scrollTop = 0;
            });
        });

        // =============================================
        // CAROUSEL
        // =============================================
        const carouselTrack = document.getElementById('carouselTrack');
        const carouselPrev = document.getElementById('carouselPrev');
        const carouselNext = document.getElementById('carouselNext');
        const dotsContainer = document.getElementById('carouselDots');
        let currentSlide = 0;

        if (carouselTrack) {
            const slides = carouselTrack.querySelectorAll('.carousel-slide');
            const totalSlides = slides.length;

            // Create dots
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }

            function goToSlide(index) {
                currentSlide = index;
                carouselTrack.style.transform = `translateX(-${index * 100}%)`;
                document.querySelectorAll('.carousel-dot').forEach((d, i) => {
                    d.classList.toggle('active', i === index);
                });
            }

            carouselPrev.addEventListener('click', () => {
                goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
            });

            carouselNext.addEventListener('click', () => {
                goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
            });
        }

        // =============================================
        // LIGHTBOX
        // =============================================
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const lightboxClose = document.getElementById('lightboxClose');
        const lightboxPrev = document.getElementById('lightboxPrev');
        const lightboxNext = document.getElementById('lightboxNext');
        const lightboxCaption = document.getElementById('lightboxCaption');
        const lightboxCounter = document.getElementById('lightboxCounter');

        let lightboxImages = [];
        let lightboxIndex = 0;

        function openLightbox(images, index) {
            lightboxImages = images;
            lightboxIndex = index;
            updateLightbox();
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }

        function updateLightbox() {
            const item = lightboxImages[lightboxIndex];
            lightboxImg.src = item.src;
            lightboxCaption.textContent = item.alt || '';
            lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
        }

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            lightboxIndex = lightboxIndex === 0 ? lightboxImages.length - 1 : lightboxIndex - 1;
            updateLightbox();
        });

        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            lightboxIndex = lightboxIndex === lightboxImages.length - 1 ? 0 : lightboxIndex + 1;
            updateLightbox();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('open')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') {
                lightboxIndex = lightboxIndex === 0 ? lightboxImages.length - 1 : lightboxIndex - 1;
                updateLightbox();
            }
            if (e.key === 'ArrowRight') {
                lightboxIndex = lightboxIndex === lightboxImages.length - 1 ? 0 : lightboxIndex + 1;
                updateLightbox();
            }
        });

        // Attach lightbox to all clickable gallery items
        function initLightboxGroups() {
            const groups = document.querySelectorAll('[data-lightbox-group]');
            groups.forEach(group => {
                const items = group.querySelectorAll('[data-lightbox-src]');
                items.forEach((item, idx) => {
                    item.addEventListener('click', () => {
                        const images = Array.from(items).map(i => ({
                            src: i.dataset.lightboxSrc,
                            alt: i.querySelector('img') ? i.querySelector('img').alt : ''
                        }));
                        openLightbox(images, idx);
                    });
                });
            });

            // Also handle floating-img in dreamscape
            const floatingItems = document.querySelectorAll('.floating-img[data-lightbox-src]');
            if (floatingItems.length > 0) {
                floatingItems.forEach((item, idx) => {
                    item.style.cursor = 'pointer';
                    item.addEventListener('click', () => {
                        const images = Array.from(floatingItems).map(i => ({
                            src: i.dataset.lightboxSrc,
                            alt: i.querySelector('img') ? i.querySelector('img').alt : ''
                        }));
                        openLightbox(images, idx);
                    });
                });
            }
        }

        initLightboxGroups();

        // =============================================
        // PARALLAX REEL INTERACTION
        // =============================================
        const parallaxReel = document.getElementById('parallaxReel');
        if (parallaxReel) {
            parallaxReel.addEventListener('mousemove', (e) => {
                const rect = parallaxReel.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percent = x / rect.width;

                // Move images slightly differently for parallax effect
                const images = parallaxReel.querySelectorAll('.p-img');
                images.forEach((img, index) => {
                    const moveAmount = (percent - 0.5) * 40 * (index + 1);
                    img.style.transform = `translateX(${moveAmount}px) scale(1.1)`;
                });
            });

            // Smooth scroll on wheel (horizontal)
            parallaxReel.addEventListener('wheel', (e) => {
                if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
                    e.preventDefault();
                    parallaxReel.scrollLeft += e.deltaY;
                }
            });
        }
