// DOM Elements
const hamburger = document.getElementById('hamburger');
const moreBtn = document.getElementById('moreBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

// Hamburger toggle (works for both mobile hamburger and desktop dropdown)
hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    dropdownMenu.classList.toggle('show');
});

// Desktop dropdown toggle
moreBtn.addEventListener('click', function(e) {
    e.preventDefault();
    dropdownMenu.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !moreBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
        hamburger.classList.remove('active');
    }
});

// Close dropdown when clicking on dropdown items
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', function() {
        dropdownMenu.classList.remove('show');
        hamburger.classList.remove('active');
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    dropdownMenu.classList.remove('show');
    hamburger.classList.remove('active');
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        dropdownMenu.classList.remove('show');
        hamburger.classList.remove('active');
    }
});

// Hover effects for desktop dropdown
const dropdown = document.querySelector('.dropdown');

dropdown.addEventListener('mouseenter', function() {
    if (window.innerWidth > 768) {
        dropdownMenu.classList.add('show');
    }
});

dropdown.addEventListener('mouseleave', function() {
    if (window.innerWidth > 768) {
        dropdownMenu.classList.remove('show');
    }
});

// Prevent dropdown from closing when clicking inside it
dropdownMenu.addEventListener('click', function(e) {
    e.stopPropagation();
});

// Smooth scrolling for anchor links
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

// Enhanced logo hover effects
const heroLogoCircle = document.querySelector('.hero-logo-circle');

if (heroLogoCircle) {
    heroLogoCircle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 8px 16px rgba(255, 107, 53, 0.4)';
    });
    
    heroLogoCircle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 8px rgba(255, 107, 53, 0.2)';
    });
}

// Image Slideshow Functionality
let currentSlide = 0;
let slides = [];
let totalSlides = 0;
let slideshowInterval;

function initializeSlideElements() {
    slides = document.querySelectorAll('.slide-image');
    totalSlides = slides.length;
    // console.log(`Found ${totalSlides} slides:`, Array.from(slides).map(slide => slide.src));
}

function showNextSlide() {
    if (totalSlides === 0) return;
    
    // Remove active and zoom-out classes from current slide
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].classList.remove('zoom-out');
    
    // Move to next slide (loop back to first if at end)
    currentSlide = (currentSlide + 1) % totalSlides;
    
    // console.log(`Showing slide ${currentSlide + 1} of ${totalSlides}`);
    
    // Add active class to new slide and start zoom-out effect
    slides[currentSlide].classList.add('active');
    
    // Add zoom-out class after a brief delay to ensure smooth transition
    setTimeout(() => {
        slides[currentSlide].classList.add('zoom-out');
    }, 50);
}

// Initialize slideshow
function initializeSlideshow() {
    initializeSlideElements();
    
    if (totalSlides > 0) {
        // console.log(`Initializing slideshow with ${totalSlides} slides`);
        
        // Clear any existing interval
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
        }
        
        // Reset to first slide
        currentSlide = 0;
        
        // Remove active class from all slides first
        slides.forEach(slide => {
            slide.classList.remove('active', 'zoom-out');
        });
        
        // Set first slide as active and add zoom-out effect
        slides[0].classList.add('active');
        setTimeout(() => {
            slides[0].classList.add('zoom-out');
        }, 100);
        
        // Start automatic slideshow every 4 seconds
        slideshowInterval = setInterval(showNextSlide, 4000);
    } else {
        console.warn('No slides found for slideshow');
    }
}

// Performance optimization: Throttle scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Navbar scroll effects with parallax
const throttledScroll = throttle(function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroLogo = document.querySelector('.hero-logo');
    
    // Navbar effects
    if (navbar) {
        if (scrolled > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    // Subtle parallax effects (only when hero is visible and elements exist)
    if (hero && heroLogo && scrolled < window.innerHeight) {
        const rate = scrolled * -0.3;
        // Limit the transform to prevent layout issues
        if (Math.abs(rate) < 200) {
            // hero.style.transform = `translateY(${rate}px)`;
        }
        
        const logoRate = scrolled * -0.1;
        if (Math.abs(logoRate) < 100) {
            // heroLogo.style.transform = `translateY(${logoRate}px) scale(1)`;
        }
    }
}, 16); // ~60fps

// Apply throttled scroll listener
window.addEventListener('scroll', throttledScroll, { passive: true });

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Close dropdown when resizing
    dropdownMenu.classList.remove('show');
    hamburger.classList.remove('active');
});

// Page load initialization
window.addEventListener('load', function() {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Initialize slideshow
    initializeSlideshow();
    
    // Clear will-change properties after animations complete
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.hero-logo, .hero-text, .hero-description, .hero-slideshow');
        animatedElements.forEach(el => {
            el.style.willChange = 'auto';
        });
    }, 2000);
});

// DOM Content Loaded for immediate setup
document.addEventListener('DOMContentLoaded', function() {
    // Ensure smooth scrolling is enabled
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Preload critical animations
    const criticalElements = document.querySelectorAll('.hero-logo, .hero-text, .get-started-btn');
    criticalElements.forEach(el => {
        el.style.willChange = 'transform, opacity';
    });
});

// Touch event optimization for mobile
if ('ontouchstart' in window) {
    // Add touch-specific optimizations
    document.body.style.webkitTouchCallout = 'none';
    document.body.style.webkitUserSelect = 'none';
    
    // Optimize touch scrolling
    document.body.style.webkitOverflowScrolling = 'touch';
}

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

// Enhanced error handling for slideshow
function safeInitializeSlideshow() {
    try {
        const slideContainer = safeQuerySelector('.slideshow-container');
        if (slideContainer && slides.length > 0) {
            initializeSlideshow();
        }
    } catch (error) {
        console.warn('Slideshow initialization failed:', error);
    }
}

// Replace direct slideshow initialization
window.addEventListener('load', function() {
    safeInitializeSlideshow();
});

// about starts

// About section - Enhanced slide animations with fade in/out functionality
document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.getElementById('About');
    
    // Intersection Observer for section visibility
    const observerOptions = {
        root: null,
        rootMargin: '-20px',
        threshold: 0.2
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const slideElements = entry.target.querySelectorAll('.slide-left, .slide-right');
            
            if (entry.isIntersecting) {
                // Slide in when section comes into view
                slideElements.forEach(element => {
                    // Remove any slide-out classes and reset
                    element.classList.remove('slide-out-left', 'slide-out-right');
                    element.style.animation = 'none';
                    
                    // Force reflow
                    element.offsetHeight;
                    
                    // Start slide-in animation
                    if (element.classList.contains('slide-left')) {
                        element.style.animation = 'slideInLeft 1s ease-out forwards';
                    } else if (element.classList.contains('slide-right')) {
                        element.style.animation = 'slideInRight 1s ease-out forwards';
                    }
                });
            } else {
                // Slide out when section goes out of view
                slideElements.forEach(element => {
                    // Reset any existing animations
                    element.style.animation = 'none';
                    
                    // Force reflow
                    element.offsetHeight;
                    
                    // Start slide-out animation
                    if (element.classList.contains('slide-left')) {
                        element.style.animation = 'slideOutLeft 0.8s ease-in forwards';
                    } else if (element.classList.contains('slide-right')) {
                        element.style.animation = 'slideOutRight 0.8s ease-in forwards';
                    }
                });
            }
        });
    }, observerOptions);
    
    // Start observing the About section
    if (aboutSection) {
        sectionObserver.observe(aboutSection);
    }
    
    // Smooth scrolling for scrollable content
    const scrollableContent = document.getElementById('scrollableContent');
    if (scrollableContent) {
        scrollableContent.addEventListener('wheel', function(e) {
            e.preventDefault();
            this.scrollTop += e.deltaY;
        });
    }
});

//about ends