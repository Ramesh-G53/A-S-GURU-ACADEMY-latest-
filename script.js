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

// Initialize slideshow immediately when DOM is ready
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
        
        // Set first slide as active and add zoom-out effect immediately
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

// Start slideshow as soon as DOM content is loaded (much faster than window.load)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slideshow immediately
    initializeSlideshow();
    
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');
    
    // Ensure smooth scrolling is enabled
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Show popup button after 1 second (reduced from 2 seconds)
    setTimeout(() => {
        showPopupButton();
    }, 2000);
});

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
        }, 500); // Reduced delay
        
        // Hide popup after 4 seconds
        setTimeout(() => {
            popupButton.classList.remove('show');
            popupButton.classList.add('hide');
        }, 4500);
    }
}

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

// Fade-in Animation Observer for Events, Videos, and Testimonials
function initializeFadeInAnimations() {
    const fadeInObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const sectionId = entry.target.id;
                
                if (entry.isIntersecting) {
                    // Fade in when section comes into view
                    if (sectionId === 'Events') {
                        const eventsHeader = entry.target.querySelector('.events-header');
                        const eventsContainer = entry.target.querySelector('.events-scroll-container');
                        
                        if (eventsHeader) {
                            eventsHeader.classList.add('fade-in');
                        }
                        if (eventsContainer) {
                            setTimeout(() => {
                                eventsContainer.classList.add('fade-in');
                            }, 200);
                        }
                    }
                    
                    if (sectionId === 'Videos') {
                        const videosHeader = entry.target.querySelector('.videos-header');
                        const videosCards = entry.target.querySelector('.videos-cards');
                        
                        if (videosHeader) {
                            videosHeader.classList.add('fade-in');
                        }
                        if (videosCards) {
                            setTimeout(() => {
                                videosCards.classList.add('fade-in');
                            }, 200);
                        }
                    }
                    
                    if (sectionId === 'Testimonials') {
                        const testimonialsHeader = entry.target.querySelector('.testimonials-header');
                        const testimonialsCards = entry.target.querySelector('.testimonials-cards');
                        
                        if (testimonialsHeader) {
                            testimonialsHeader.classList.add('fade-in');
                        }
                        if (testimonialsCards) {
                            setTimeout(() => {
                                testimonialsCards.classList.add('fade-in');
                            }, 200);
                        }
                    }
                }
            });
        },
        {
            root: null,
            rootMargin: '-50px',
            threshold: 0.2
        }
    );

    // Observe the three sections
    const sectionsToAnimate = ['Events', 'Videos', 'Testimonials'];
    sectionsToAnimate.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            fadeInObserver.observe(section);
        }
    });
}

// Initialize everything when DOM is ready (moved from window.load for faster execution)
document.addEventListener('DOMContentLoaded', function() {
    // Start observing Popular Programs section
    const programsSection = document.getElementById('Programs');
    if (programsSection) {
        programsObserver.observe(programsSection);
    }
    
    // Initialize fade-in animations for Events, Videos, and Testimonials
    initializeFadeInAnimations();
});

// Keep window.load only for non-critical operations that need all resources loaded
window.addEventListener('load', function() {
    // Clear will-change properties after animations complete
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.hero-logo, .hero-text, .hero-description, .hero-slideshow');
        animatedElements.forEach(el => {
            el.style.willChange = 'auto';
        });
    }, 1000); // Reduced from 2000ms
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

// Event Section Starts - Initialize asynchronously to not block main thread
// Initialize Supabase client for events
const eventsSupabaseUrl = "https://csmiziefiecrtxdmahef.supabase.co";
const eventsSupabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbWl6aWVmaWVjcnR4ZG1haGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MzI4MjYsImV4cCI6MjA2NjUwODgyNn0.foiIv2NTxY60h9uKOtvGA3g1mhkA_8bPormy6_ml_KM";

// Only initialize Supabase after critical content is loaded
let eventsSupabaseClient;

// Delay Supabase initialization to not block critical rendering
setTimeout(() => {
    if (typeof supabase !== 'undefined') {
        eventsSupabaseClient = supabase.createClient(eventsSupabaseUrl, eventsSupabaseKey);
    }
}, 100);

// Events horizontal scroll functionality
class EventsHorizontalScroll {
    constructor() {
        this.events = [];
        this.container = null;
        this.track = null;
        this.prevBtn = null;
        this.nextBtn = null;
        
        // Initialize with delay to not block main thread
        setTimeout(() => this.init(), 500);
    }
    
    async init() {
        try {
            await this.loadEvents();
            this.setupElements();
            this.renderEvents();
            this.setupNavigation();
        } catch (error) {
            console.error('Failed to initialize events scroll:', error);
            this.showError();
        }
    }
    
    async loadEvents() {
        if (!eventsSupabaseClient) {
            throw new Error('Supabase client not initialized');
        }
        
        const { data, error } = await eventsSupabaseClient
            .from('events')
            .select('*')
            .order('start_date', { ascending: true });
        
        if (error) throw error;
        
        // Sort events by proximity to current date
        const now = new Date();
        this.events = (data || []).sort((a, b) => {
            const dateA = new Date(a.start_date);
            const dateB = new Date(b.start_date);
            
            const relevantDateA = dateA >= now ? dateA : new Date(a.end_date);
            const relevantDateB = dateB >= now ? dateB : new Date(b.end_date);
            
            const diffA = Math.abs(relevantDateA - now);
            const diffB = Math.abs(relevantDateB - now);
            
            return diffA - diffB;
        });
    }
    
    setupElements() {
        this.container = document.querySelector('.events-scroll-container');
        this.track = document.getElementById('eventsScrollTrack');
        this.eventsSection = document.querySelector('.events-section');
    }
    
    setupNavigation() {
        this.prevBtn = document.getElementById('eventsPrevBtn');
        this.nextBtn = document.getElementById('eventsNextBtn');
        
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.addEventListener('click', () => this.scrollLeft());
            this.nextBtn.addEventListener('click', () => this.scrollRight());
            
            // Update button states on scroll
            this.container.addEventListener('scroll', () => this.updateNavButtons());
            
            // Initial button state
            setTimeout(() => this.updateNavButtons(), 100);
        }
    }
    
    scrollLeft() {
        if (this.container) {
            this.container.scrollBy({
                left: -380, // Card width + gap
                behavior: 'smooth'
            });
        }
    }
    
    scrollRight() {
        if (this.container) {
            this.container.scrollBy({
                left: 380, // Card width + gap
                behavior: 'smooth'
            });
        }
    }
    
    updateNavButtons() {
        if (!this.container || !this.prevBtn || !this.nextBtn) return;
        
        const scrollLeft = this.container.scrollLeft;
        const scrollWidth = this.container.scrollWidth;
        const clientWidth = this.container.clientWidth;
        
        // Update prev button
        this.prevBtn.disabled = scrollLeft <= 0;
        
        // Update next button
        this.nextBtn.disabled = scrollLeft >= (scrollWidth - clientWidth - 1);
    }
    
    renderEvents() {
        if (!this.track) return;
        
        if (this.events.length === 0) {
            this.showNoEvents();
            return;
        }
        
        // Clear existing content
        this.track.innerHTML = '';
        this.track.classList.remove('no-events');
        this.container.classList.remove('no-events');
        this.eventsSection.classList.remove('no-events');
        
        // Create event cards
        this.events.forEach((event) => {
            const card = this.createEventCard(event);
            this.track.appendChild(card);
        });
        
        // Update navigation buttons after rendering
        setTimeout(() => this.updateNavButtons(), 100);
    }
    
    createEventCard(event) {
        const card = document.createElement('div');
        card.className = 'events-card';
        
        const startDate = new Date(event.start_date);
        const endDate = new Date(event.end_date);
        const formatDate = (date) => {
            return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        };
        
        const modeText = event.mode === 'online' ? 'Online Event' : 'Offline Event';
        
        card.innerHTML = `
            <div class="events-card-image">
                <img src="${event.poster_url || '/api/placeholder/350/200'}" 
                     alt="${event.event_name}" 
                     onerror="this.src='/api/placeholder/350/200'"
                     loading="lazy">
            </div>
            <div class="events-card-content">
                <h3 class="events-card-title">${event.event_name}</h3>
                <p class="events-card-mode">${modeText}</p>
                <p class="events-card-dates">From: ${formatDate(startDate)} To: ${formatDate(endDate)}</p>
                <p class="events-card-location">Location: ${event.location}</p>
                <div class="events-card-buttons">
                    <button class="events-card-btn view-poster-btn" onclick="eventsHorizontalScroll.viewPoster('${event.poster_url}', '${event.event_name}')">
                        <span>View Poster</span>
                        <div class="shine-effect"></div>
                    </button>
                    <a href="${event.registration_link}" target="_blank" class="events-card-btn">
                        <span>Register</span>
                        <div class="shine-effect"></div>
                    </a>
                </div>
            </div>
        `;
        
        return card;
    }
    
    showNoEvents() {
        if (this.track) {
            this.track.innerHTML = '<div class="events-no-data">No events yet</div>';
            this.track.classList.add('no-events');
        }
        
        this.container.classList.add('no-events');
        this.eventsSection.classList.add('no-events');
        
        // Hide navigation buttons when no events
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.style.display = 'none';
            this.nextBtn.style.display = 'none';
        }
    }
    
    showError() {
        if (this.track) {
            this.track.innerHTML = '<div class="events-no-data">Error loading events</div>';
            this.track.classList.add('no-events');
        }
        
        this.container.classList.add('no-events');
        this.eventsSection.classList.add('no-events');
        
        // Hide navigation buttons on error
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.style.display = 'none';
            this.nextBtn.style.display = 'none';
        }
    }
    
    viewPoster(posterUrl, eventName) {
        if (!posterUrl) return;
        
        let modal = document.getElementById('eventsModal');
        if (!modal) {
            modal = this.createModal();
        }
        
        const modalImg = document.getElementById('eventsModalImg');
        modalImg.src = posterUrl;
        modalImg.alt = eventName;
        modal.style.display = 'block';
    }
    
    createModal() {
        const modal = document.createElement('div');
        modal.id = 'eventsModal';
        modal.style.cssText = `
            display: none;
            position: fixed;
            z-index: 2000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            cursor: pointer;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            position: relative;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            max-width: 95%;
            max-height: 95%;
        `;
        
        const modalImg = document.createElement('img');
        modalImg.id = 'eventsModalImg';
        modalImg.style.cssText = `
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        `;
        
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: 15px;
            right: 25px;
            color: white;
            font-size: 60px;
            font-weight: bold;
            cursor: pointer;
            z-index: 2001;
        `;
        
        modalContent.appendChild(modalImg);
        modal.appendChild(closeBtn);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Event listeners
        modal.addEventListener('click', () => this.closeModal());
        closeBtn.addEventListener('click', () => this.closeModal());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
        
        return modal;
    }
    
    closeModal() {
        const modal = document.getElementById('eventsModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
}

// Initialize horizontal scroll when DOM is loaded (with delay)
let eventsHorizontalScroll;

document.addEventListener('DOMContentLoaded', () => {
    // Delay events initialization to not block main thread
    setTimeout(() => {
        eventsHorizontalScroll = new EventsHorizontalScroll();
    }, 1000);
});

// Videos and Testimonials Sections Start
class VideosTestimonialsLoader {
    constructor() {
        this.videos = [];
        this.testimonials = [];
        
        // Initialize with delay to not block main thread
        setTimeout(() => this.init(), 1500);
    }
    
    async init() {
        try {
            await this.loadVideos();
            await this.loadTestimonials();
            this.renderVideos();
            this.renderTestimonials();
        } catch (error) {
            console.error('Failed to initialize videos/testimonials:', error);
        }
    }
    
    async loadVideos() {
        try {
            if (!eventsSupabaseClient) {
                throw new Error('Supabase client not initialized');
            }
            
            const { data, error } = await eventsSupabaseClient
                .from('videos')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(3);
                
            if (error) throw error;
            this.videos = data || [];
        } catch (error) {
            console.error('Error loading videos:', error);
            this.videos = [];
        }
    }
    
    async loadTestimonials() {
        try {
            if (!eventsSupabaseClient) {
                throw new Error('Supabase client not initialized');
            }
            
            const { data, error } = await eventsSupabaseClient
                .from('testimonials')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(3);
                
            if (error) throw error;
            this.testimonials = data || [];
        } catch (error) {
            console.error('Error loading testimonials:', error);
            this.testimonials = [];
        }
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    
    renderVideos() {
        const videosCards = document.getElementById('videosCards');
        if (!videosCards) return;
        
        if (this.videos.length === 0) {
            videosCards.innerHTML = '<div class="no-content">No videos available</div>';
            return;
        }
        
        videosCards.innerHTML = this.videos.map(video => `
            <div class="video-card" onclick="window.open('${video.video_link.replace('/embed/', '/watch?v=')}', '_blank')">
                <div class="video-thumbnail">
                    <iframe src="${video.video_link}" allowfullscreen loading="lazy"></iframe>
                </div>
                <div class="video-title-section">
                    <h3 class="video-title">${video.title}</h3>
                </div>
            </div>
        `).join('');
    }
    
    renderTestimonials() {
        const testimonialsCards = document.getElementById('testimonialsCards');
        if (!testimonialsCards) return;
        
        if (this.testimonials.length === 0) {
            testimonialsCards.innerHTML = '<div class="no-content">No testimonials available</div>';
            return;
        }
        
        testimonialsCards.innerHTML = this.testimonials.map(testimonial => `
            <div class="testimonial-card" onclick="window.open('${testimonial.testimonial_link.replace('/embed/', '/watch?v=')}', '_blank')">
                <div class="testimonial-thumbnail">
                    <iframe src="${testimonial.testimonial_link}" allowfullscreen loading="lazy"></iframe>
                </div>
                <div class="testimonial-content">
                    <h3 class="testimonial-title">${testimonial.title}</h3>
                    <p class="testimonial-date">Posted at: ${this.formatDate(testimonial.created_at)}</p>
                </div>
            </div>
        `).join('');
    }
}

// Initialize videos and testimonials loader when DOM is loaded (with delay)
let videosTestimonialsLoader;

document.addEventListener('DOMContentLoaded', () => {
    // Delay videos/testimonials initialization to not block main thread
    setTimeout(() => {
        videosTestimonialsLoader = new VideosTestimonialsLoader();
    }, 2000);
});

/* Maps Section Starts */
document.addEventListener('DOMContentLoaded', function() {
    const mapButton = document.getElementById('mapButton');
    
    if (mapButton) {
        mapButton.addEventListener('click', function(e) {
            // Optional: Add click analytics or custom behavior here
            // console.log('Map button clicked');
        });
    }
});
/* Maps Section Ends */

// WhatsApp button pulsing effect
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    
    // Add subtle pulse animation
    function addPulseEffect() {
        whatsappButton.classList.add('pulse-effect');
        setTimeout(() => {
            whatsappButton.classList.remove('pulse-effect');
        }, 1000);
    }
    
    // Pulse effect every 5 seconds
    setInterval(addPulseEffect, 5000);
    
    // Initial pulse after 2 seconds
    setTimeout(addPulseEffect, 2000);
});
// whatsapp ends