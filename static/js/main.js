document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        this.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Event Listeners
    nextBtn.addEventListener('click', function () {
        stopSlider();
        nextSlide();
        startSlider();
    });

    prevBtn.addEventListener('click', function () {
        stopSlider();
        prevSlide();
        startSlider();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            stopSlider();
            showSlide(index);
            startSlider();
        });
    });

    // Initialize slider
    showSlide(0);
    startSlider();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky header
    const header = document.querySelector('.header-top');
    const headerHeight = header.offsetHeight;
    const heroSection = document.querySelector('.hero-slider');

    window.addEventListener('scroll', function () {
        if (window.scrollY > heroSection.offsetHeight - headerHeight) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Add sticky class to header initially if needed
    if (window.scrollY > heroSection.offsetHeight - headerHeight) {
        header.classList.add('sticky');
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (email) {
                // Here you would typically send the email to your server
                console.log('Subscribed email:', email);
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
});