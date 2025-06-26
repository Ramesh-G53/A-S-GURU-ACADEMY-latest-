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

// Hero Section Start - Image Slideshow Functionality
let currentSlide = 0;
let slides = [];
let totalSlides = 0;
let slideshowInterval;

function initializeSlideElements() {
    slides = document.querySelectorAll('.slide-image');
    totalSlides = slides.length;
}

function showNextSlide() {
    if (totalSlides === 0) return;
    
    // Remove active and zoom-out classes from current slide
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].classList.remove('zoom-out');
    
    // Move to next slide (loop back to first if at end)
    currentSlide = (currentSlide + 1) % totalSlides;
    
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

// Popup Button Functionality
let popupShown = false;

function showPopupButton() {
    if (popupShown) return;
    
    const popupButton = document.getElementById('popupButton');
    if (popupButton) {
        setTimeout(() => {
            popupButton.classList.add('show');
            popupShown = true;
        }, 1000);
        
        
        // Hide popup after 4 seconds
        setTimeout(() => {
            popupButton.classList.remove('show');
            popupButton.classList.add('hide');
        }, 5000);
    }
}
// Hero Section End

// About Section Start - Enhanced slide animations with fade in/out functionality
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
// About Section End

// Programs Section Start - Popular Programs Section Functionality
let programsAnimated = false;
let textTranslationIntervals = [];

// Translation data for program cards
const translations = {
    'programCard1': {
        name: { en: 'Art of Speech', ta: 'பேச்சுக் கலை' },
        points: [
            { en: 'Political Speech', ta: 'அரசியல் பேச்சு' },
            { en: 'Spiritual Speech', ta: 'ஆன்மீக பேச்சு' },
            { en: 'Debate Speech', ta: 'பட்டிமன்ற பேச்சு' },
            { en: 'Humorous Speech', ta: 'நகைச்சுவை பேச்சு' }
        ]
    },
    'programCard2': {
        name: { en: 'Law of Attraction', ta: 'பிரபஞ்ச ஈர்ப்பு விதி' },
        points: [
            { en: 'Foundational Mindset Shift', ta: 'அடிப்படை மனமாற்றம்' },
            { en: 'Miracle Morning Routine', ta: 'அற்புதமான காலை நடைமுறை' },
            { en: 'Mind Tuning', ta: 'எண்ணங்கள் மறுசீரமைப்பு' },
            { en: 'Practicing Gratitude', ta: 'நன்றி உணர்தல் பயிற்சி' }
        ]
    }
};

function animatePrograms() {
    if (programsAnimated) return;
    
    const programsHeader = document.querySelector('.programs-header');
    const programCard1 = document.getElementById('programCard1');
    const programCard2 = document.getElementById('programCard2');
    
    if (programsHeader && programCard1 && programCard2) {
        // Fade in header
        programsHeader.classList.add('fade-in');
        
        // Animate cards with delay
        setTimeout(() => {
            programCard1.classList.add('slide-left');
        }, 500);
        
        setTimeout(() => {
            programCard2.classList.add('slide-right');
        }, 800);
        
        programsAnimated = true;
        
        // Start text translation after cards are visible
        setTimeout(() => {
            startTextTranslation();
        }, 1500);
    }
}

function startTextTranslation() {
    Object.keys(translations).forEach(cardId => {
        const card = document.getElementById(cardId);
        if (!card) return;
        
        const programName = card.querySelector('.program-name');
        const points = card.querySelectorAll('.program-point');
        const cardTranslations = translations[cardId];
        
        // Handle program name translation with improved timing
        if (programName && cardTranslations.name) {
            let isEnglish = true;
            let isTransitioning = false;
            
            const nameInterval = setInterval(() => {
                if (isTransitioning) return;
                
                isTransitioning = true;
                programName.style.opacity = '0';
                
                setTimeout(() => {
                    if (isEnglish) {
                        programName.textContent = cardTranslations.name.ta;
                    } else {
                        programName.textContent = cardTranslations.name.en;
                    }
                    programName.style.opacity = '1';
                    isEnglish = !isEnglish;
                    isTransitioning = false;
                }, 300);
            }, 3000);
            
            textTranslationIntervals.push(nameInterval);
        }
        
        // Handle points translation with improved timing
        points.forEach((point, index) => {
            if (cardTranslations.points[index]) {
                let isEnglish = true;
                let isTransitioning = false;
                
                const interval = setInterval(() => {
                    if (isTransitioning) return;
                    
                    isTransitioning = true;
                    point.style.opacity = '0';
                    
                    setTimeout(() => {
                        if (isEnglish) {
                            point.textContent = cardTranslations.points[index].ta;
                        } else {
                            point.textContent = cardTranslations.points[index].en;
                        }
                        point.style.opacity = '1';
                        isEnglish = !isEnglish;
                        isTransitioning = false;
                    }, 300);
                }, 3000);
                
                textTranslationIntervals.push(interval);
            }
        });
    });
}

function resetLanguageToEnglish() {
    // Clear all translation intervals
    textTranslationIntervals.forEach(interval => clearInterval(interval));
    textTranslationIntervals = [];
    
    // Reset all text back to English
    Object.keys(translations).forEach(cardId => {
        const card = document.getElementById(cardId);
        if (!card) return;
        
        const programName = card.querySelector('.program-name');
        const points = card.querySelectorAll('.program-point');
        const cardTranslations = translations[cardId];
        
        // Reset program name to English
        if (programName && cardTranslations.name) {
            programName.textContent = cardTranslations.name.en;
            programName.style.opacity = '1';
        }
        
        // Reset all points to English
        points.forEach((point, index) => {
            if (cardTranslations.points[index]) {
                point.textContent = cardTranslations.points[index].en;
                point.style.opacity = '1';
            }
        });
    });
}

// Intersection Observer for Popular Programs section
const programsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target.id === 'Programs') {
                animatePrograms();
            } else if (!entry.isIntersecting && entry.target.id === 'Programs') {
                // Reset language to English when scrolling out
                resetLanguageToEnglish();
                
                // Slide out cards when scrolling away
                const programCard1 = document.getElementById('programCard1');
                const programCard2 = document.getElementById('programCard2');
                
                if (programCard1 && programCard2) {
                    programCard1.classList.remove('slide-left');
                    programCard2.classList.remove('slide-right');
                    programCard1.classList.add('slide-out-left');
                    programCard2.classList.add('slide-out-right');
                    
                    // Reset animation state
                    setTimeout(() => {
                        programsAnimated = false;
                        programCard1.classList.remove('slide-out-left');
                        programCard2.classList.remove('slide-out-right');
                    }, 800);
                }
            }
        });
    },
    {
        root: null,
        rootMargin: '-20px',
        threshold: 0.2
    }
);
// Programs Section End

// Page load initialization
window.addEventListener('load', function() {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Initialize slideshow
    initializeSlideshow();
    
    // Show popup button after hero elements arrange themselves (2 seconds)
    setTimeout(() => {
        showPopupButton();
    }, 2000);
    
    // Start observing Popular Programs section
    const programsSection = document.getElementById('Programs');
    if (programsSection) {
        programsObserver.observe(programsSection);
    }
    
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

// Cleanup function for intervals when page unloads
window.addEventListener('beforeunload', function() {
    textTranslationIntervals.forEach(interval => {
        clearInterval(interval);
    });
    
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
});