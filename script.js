// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 48, 87, 0.98)';
    } else {
        header.style.background = 'rgba(0, 48, 87, 0.95)';
    }
});

// Species Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.species-card');
const totalSlides = slides.length;
const track = document.querySelector('.species-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function updateSlider() {
    // Move the track
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update active class
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-play slider
let autoPlay = setInterval(nextSlide, 5000);

// Pause auto-play on hover
const slider = document.querySelector('.species-slider');
slider.addEventListener('mouseenter', () => {
    clearInterval(autoPlay);
});

slider.addEventListener('mouseleave', () => {
    autoPlay = setInterval(nextSlide, 5000);
});

// Animated Counter for Conservation Stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Intersection Observer for counter animation
const statNumbers = document.querySelectorAll('.stat-number');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

statNumbers.forEach(stat => {
    observer.observe(stat);
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1000);
});

// Scroll-triggered animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.research-card, .species-card, .conservation-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize scroll animation styles
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.research-card, .conservation-content');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

window.addEventListener('scroll', animateOnScroll);

// CTA Button click handler
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('#research').scrollIntoView({
        behavior: 'smooth'
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Keyboard navigation for slider
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Touch/swipe support for mobile slider
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// Lazy loading for better performance
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    animateOnScroll();
}, 16));

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set initial slider state
    updateSlider();
    
    // Trigger initial scroll animation check
    animateOnScroll();
    
    // Add loading class removal after page load
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Reset slider position on resize
    updateSlider();
});

// Preload critical resources
const preloadResources = () => {
    // Preload any critical images or resources here
    const criticalImages = [
        // Add any image URLs you want to preload
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

// Call preload function
preloadResources();

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', () => {
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #4dd0e1';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
});

// Error handling for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', () => {
            img.style.display = 'none';
            console.warn('Image failed to load:', img.src);
        });
    });
});

// Page visibility API to pause animations when tab is not active
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(autoPlay);
    } else {
        autoPlay = setInterval(nextSlide, 5000);
    }
});

// Custom console message for developers
console.log('%c🌊 Ocean Research Institute Website', 'color: #4dd0e1; font-size: 16px; font-weight: bold;');
console.log('Built with vanilla JavaScript, CSS3, and HTML5. Marine biology education through web technology.');

// Export functions for potential testing (if needed)
window.MarineBiologyApp = {
    nextSlide,
    prevSlide,
    updateSlider,
    animateCounter
};