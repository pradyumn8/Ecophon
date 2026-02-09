document.addEventListener('DOMContentLoaded', () => {
    console.log('Ecophon Landing Page Loaded');

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission Handler (Mock) - Bottom Contact Form
    // Form Submission Handler - Bottom Contact Form
    const leadForm = document.getElementById('enquiry-form');
    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = leadForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            const formData = new FormData(leadForm);
            formData.append("access_key", "bb7fd0bd-1325-4bd0-a248-a475110975b9");

            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Success! Your enquiry has been sent.");
                    leadForm.reset();
                } else {
                    alert("Error: " + data.message);
                }
            } catch (error) {
                alert("Something went wrong. Please try again.");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Gallery Popup Functionality
    const galleryData = {
        corporate: {
            title: 'Corporate Offices',
            images: [
                'assets/gallery/corporate/corporate-1.webp',
                'assets/gallery/corporate/corporate-2.webp',
                'assets/gallery/corporate/corporate-3.webp',
                'assets/gallery/corporate/corporate-4.webp',
            ]
        },
        education: {
            title: 'Educational Institutions',
            images: [
                'assets/gallery/education/education-1.jpg',
                'assets/gallery/education/education-2.webp',
                'assets/gallery/education/education-3.webp',
                'assets/gallery/education/education-4.webp',
            ]
        },
        healthcare: {
            title: 'Healthcare Facilities',
            images: [
                'assets/gallery/healthcare/healthcare-1.webp',
                'assets/gallery/healthcare/healthcare-2.webp',
                'assets/gallery/healthcare/healthcare-3.webp',
                'assets/gallery/healthcare/healthcare-4.webp'
            ]
        },
        'infrastructure-project': {
            title: 'Infrastructure Projects',
            images: [
                'assets/gallery/infrastructure-project/infrastructure-project-1.webp',
                'assets/gallery/infrastructure-project/infrastructure-project-2.webp',
                'assets/gallery/infrastructure-project/infrastructure-project-3.webp',
                'assets/gallery/infrastructure-project/infrastructure-project-4.webp',
            ]
        }
    };

    const galleryPopup = document.getElementById('gallery-popup');
    const galleryTitle = document.querySelector('.gallery-title');
    const gallerySlidesContainer = document.querySelector('.gallery-slides');
    const galleryDotsContainer = document.querySelector('.gallery-dots');
    const galleryClose = document.querySelector('.gallery-close');
    const galleryPrev = document.querySelector('.gallery-prev');
    const galleryNext = document.querySelector('.gallery-next');

    let currentSlide = 0;
    let currentImages = [];

    // Open gallery popup
    document.querySelectorAll('.use-case-card[data-gallery]').forEach(card => {
        card.addEventListener('click', () => {
            const galleryKey = card.dataset.gallery;
            const gallery = galleryData[galleryKey];

            if (gallery) {
                openGallery(gallery.title, gallery.images);
            }
        });
    });

    function openGallery(title, images) {
        currentImages = images;
        currentSlide = 0;

        galleryTitle.textContent = title;
        gallerySlidesContainer.innerHTML = '';
        galleryDotsContainer.innerHTML = '';

        images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `${title} - Image ${index + 1}`;
            if (index === 0) img.classList.add('active');
            gallerySlidesContainer.appendChild(img);

            const dot = document.createElement('button');
            dot.classList.add('gallery-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            galleryDotsContainer.appendChild(dot);
        });

        galleryPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
        galleryPopup.classList.remove('active');
        document.body.style.overflow = '';
    }

    function goToSlide(index) {
        const slides = gallerySlidesContainer.querySelectorAll('img');
        const dots = galleryDotsContainer.querySelectorAll('.gallery-dot');

        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = index;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        if (currentSlide >= slides.length) currentSlide = 0;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Event listeners
    if (galleryClose) galleryClose.addEventListener('click', closeGallery);
    if (galleryPrev) galleryPrev.addEventListener('click', prevSlide);
    if (galleryNext) galleryNext.addEventListener('click', nextSlide);

    // Close on backdrop click
    if (galleryPopup) {
        galleryPopup.addEventListener('click', (e) => {
            if (e.target === galleryPopup) closeGallery();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!galleryPopup.classList.contains('active')) return;

        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Hero Slider Functionality
    const heroBanners = [
        {
            image: 'assets/banner/banner-1.jpeg',
            alignment: 'split',
            content: `
               <div class="hero-content" >
                    <h1>Modular Ceilings Designed for Acoustic Comfort</h1>
                    <p>A comprehensive range of modular ceiling systems that don’t just look good, they improve acoustic comfort, helping create quieter, calmer spaces.</p>
                    <ul class="benefits-list">
                        <li>Sound Absorption Class A</li>
                        <li>Clean modern aesthetics</li>
                        <li>Easy installation & maintenance</li>
                    </ul>
                    <a href="#contact" class="btn">Talk to an Expert</a>
                </div>
                <div class="hero-form-container">
                    <form id="hero-enquiry-form" class="hero-form">
                        <h3>Acoustic guidance for ceilings and wall solutions.</h3>
                        <div class="form-group">
                            <label for="hero-name">Name</label>
                            <input type="text" id="hero-name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="hero-company">Company</label>
                            <input type="text" id="hero-company" name="company" required>
                        </div>
                        <div class="form-group">
                            <label for="hero-email">Email Id</label>
                            <input type="email" id="hero-email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="hero-mobile">Mobile Number</label>
                            <input type="number" id="hero-mobile" name="mobile" required>
                        </div>
                        <button type="submit" class="btn warning-btn" style="width: 100%;">Talk to an Expert</button>
                    </form>
                </div>
            `
        },
        {
            image: 'assets/banner/banner-2.jpeg',
            alignment: 'left',
            content: ``
        },
        {
            image: 'assets/banner/banner-3.jpeg',
            alignment: 'left',
            content: ``
        },
        {
            image: 'assets/banner/banner-4.jpeg',
            alignment: 'left',
            content: ``
        },
        {
            image: 'assets/banner/banner-5.jpeg',
            alignment: 'left',
            content: ``
        }
    ];

    const heroSliderContainer = document.getElementById('hero-slider');
    const heroPrevBtn = document.getElementById('hero-prev');
    const heroNextBtn = document.getElementById('hero-next');
    let currentHeroSlide = 0;

    // Initialize Slider
    if (heroSliderContainer && heroBanners.length > 0) {
        // Clear existing content just in case
        heroSliderContainer.innerHTML = '';

        // Generate slides
        heroBanners.forEach((banner, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.classList.add('hero-slide');
            if (index === 0) slideDiv.classList.add('active');

            const img = document.createElement('img');
            img.src = banner.image;
            img.alt = `Hero Banner ${index + 1}`;
            slideDiv.appendChild(img);

            if (banner.content) {
                const contentDiv = document.createElement('div');
                contentDiv.classList.add('hero-slide-content');
                if (banner.alignment) {
                    contentDiv.classList.add(`align-${banner.alignment}`);
                }
                contentDiv.innerHTML = banner.content;
                slideDiv.appendChild(contentDiv);
            }

            heroSliderContainer.appendChild(slideDiv);
        });

        const heroSlides = heroSliderContainer.querySelectorAll('.hero-slide');

        // Hero Form Submission Logic
        const heroForm = document.getElementById('hero-enquiry-form');
        if (heroForm) {
            heroForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const submitBtn = heroForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;

                const formData = new FormData(heroForm);
                // Use a different access key if needed, or the same one
                formData.append("access_key", "bb7fd0bd-1325-4bd0-a248-a475110975b9");

                submitBtn.textContent = "Sending...";
                submitBtn.disabled = true;

                try {
                    const response = await fetch("https://api.web3forms.com/submit", {
                        method: "POST",
                        body: formData
                    });

                    const data = await response.json();

                    if (response.ok) {
                        alert("Success! Your enquiry has been sent.");
                        heroForm.reset();
                    } else {
                        alert("Error: " + data.message);
                    }
                } catch (error) {
                    alert("Something went wrong. Please try again.");
                } finally {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            });
        }

        function showHeroSlide(index) {
            heroSlides.forEach(slide => slide.classList.remove('active'));

            currentHeroSlide = index;
            if (currentHeroSlide < 0) currentHeroSlide = heroSlides.length - 1;
            if (currentHeroSlide >= heroSlides.length) currentHeroSlide = 0;

            heroSlides[currentHeroSlide].classList.add('active');
        }

        if (heroPrevBtn && heroNextBtn) {
            heroPrevBtn.addEventListener('click', () => {
                showHeroSlide(currentHeroSlide - 1);
            });

            heroNextBtn.addEventListener('click', () => {
                showHeroSlide(currentHeroSlide + 1);
            });
        }
    }

    // Brochure Download Popup Functionality
    const brochurePopup = document.getElementById('brochure-popup');
    const brochureForm = document.getElementById('brochure-form');
    const brochureClose = document.querySelector('.brochure-close');
    const brochureUrlInput = document.getElementById('brochure-url');
    const brochureProductInput = document.getElementById('brochure-product');
    const brochureProductName = document.getElementById('brochure-product-name');

    // Open brochure popup when clicking download buttons
    document.querySelectorAll('.btn-download[data-brochure]').forEach(btn => {
        btn.addEventListener('click', () => {
            const brochureUrl = btn.dataset.brochure;
            const productName = btn.dataset.product;

            if (brochureUrlInput) brochureUrlInput.value = brochureUrl;
            if (brochureProductInput) brochureProductInput.value = productName;
            if (brochureProductName) brochureProductName.textContent = productName;

            if (brochurePopup) {
                brochurePopup.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeBrochurePopup() {
        if (brochurePopup) {
            brochurePopup.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Close button
    if (brochureClose) {
        brochureClose.addEventListener('click', closeBrochurePopup);
    }

    // Close on backdrop click
    if (brochurePopup) {
        brochurePopup.addEventListener('click', (e) => {
            if (e.target === brochurePopup) closeBrochurePopup();
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && brochurePopup && brochurePopup.classList.contains('active')) {
            closeBrochurePopup();
        }
    });

    // Handle brochure form submission
    if (brochureForm) {
        brochureForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = brochureForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            const brochureUrl = brochureUrlInput.value;

            const formData = new FormData(brochureForm);
            formData.append("access_key", "bb7fd0bd-1325-4bd0-a248-a475110975b9");

            submitBtn.textContent = "Submitting...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    // Close popup
                    closeBrochurePopup();
                    brochureForm.reset();

                    // Trigger file download
                    const link = document.createElement('a');
                    link.href = brochureUrl;
                    link.download = '';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    alert("Thank you! Your brochure download will start shortly.");
                } else {
                    alert("Error: " + data.message);
                }
            } catch (error) {
                alert("Something went wrong. Please try again.");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // FAB Enquiry Popup Functionality
    const fabEnquiryBtn = document.getElementById('fab-enquiry-btn');
    const fabEnquiryPopup = document.getElementById('fab-enquiry-popup');
    const fabEnquiryForm = document.getElementById('fab-enquiry-form');
    const fabEnquiryClose = document.querySelector('.fab-enquiry-close');

    function openFabEnquiryPopup() {
        if (fabEnquiryPopup) {
            fabEnquiryPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeFabEnquiryPopup() {
        if (fabEnquiryPopup) {
            fabEnquiryPopup.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Open popup on FAB click
    if (fabEnquiryBtn) {
        fabEnquiryBtn.addEventListener('click', openFabEnquiryPopup);
    }

    // Close button
    if (fabEnquiryClose) {
        fabEnquiryClose.addEventListener('click', closeFabEnquiryPopup);
    }

    // Close on backdrop click
    if (fabEnquiryPopup) {
        fabEnquiryPopup.addEventListener('click', (e) => {
            if (e.target === fabEnquiryPopup) closeFabEnquiryPopup();
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fabEnquiryPopup && fabEnquiryPopup.classList.contains('active')) {
            closeFabEnquiryPopup();
        }
    });

    // Handle FAB enquiry form submission
    if (fabEnquiryForm) {
        fabEnquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = fabEnquiryForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            const formData = new FormData(fabEnquiryForm);
            formData.append("access_key", "bb7fd0bd-1325-4bd0-a248-a475110975b9");

            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    closeFabEnquiryPopup();
                    fabEnquiryForm.reset();
                    alert("Thank you! We will contact you shortly.");
                } else {
                    alert("Error: " + data.message);
                }
            } catch (error) {
                alert("Something went wrong. Please try again.");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Floating Buttons Visibility on Scroll
    const floatingButtons = document.querySelector('.floating-buttons');
    const heroSection = document.querySelector('.hero');

    if (floatingButtons) {
        const toggleFloatingButtons = () => {
            // Show buttons only after scrolling past the hero section
            const threshold = heroSection ? heroSection.offsetHeight : 500;
            if (window.scrollY > threshold) {
                floatingButtons.classList.add('visible');
            } else {
                floatingButtons.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', toggleFloatingButtons);
        toggleFloatingButtons(); // Initial check
    }

    // Number Counter Animation
    const counters = document.querySelectorAll('.counter');

    if (counters.length > 0) {
        const observerOptions = {
            root: null,
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    // Ensure we have a valid target
                    if (isNaN(target)) return;

                    const duration = 2000; // Animation duration in ms
                    const increment = target / (duration / 16); // 60fps roughly

                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    requestAnimationFrame(updateCounter);
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
});
