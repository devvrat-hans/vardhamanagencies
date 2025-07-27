// About page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Wait for templates to load
    setTimeout(initializeAboutPage, 200);
});

function initializeAboutPage() {
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize counter animations
    initializeCounterAnimations();
    
    // Initialize team card interactions
    initializeTeamCards();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.mv-card, .feature-card, .team-card, .story-text, .story-stats'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Counter Animations
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const numericValue = parseInt(text.replace(/[^\d]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    let current = 0;
    const increment = numericValue / 60; // Animation duration roughly 1 second at 60fps
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current).toString();
        if (hasPlus) displayValue += '+';
        if (hasPercent) displayValue += '%';
        
        element.textContent = displayValue;
        element.classList.add('animate');
    }, 16); // ~60fps
}

// Team Card Interactions
function initializeTeamCards() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add subtle animation or effect when hovering
            const image = card.querySelector('.team-image-placeholder');
            if (image) {
                image.style.transform = 'scale(1.05)';
                image.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.team-image-placeholder');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax Effect for Hero Section
function initializeParallaxEffect() {
    const hero = document.querySelector('.about-hero');
    const heroImage = document.querySelector('.hero-image-placeholder');
    
    if (!hero || !heroImage) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled < hero.offsetHeight) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize parallax effect
initializeParallaxEffect();

// Add click tracking for CTA buttons
function trackCTAClicks() {
    const ctaButtons = document.querySelectorAll('.cta-actions .btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = button.textContent.trim();
            
            // Add analytics tracking here if needed
            // gtag('event', 'click', {
            //     event_category: 'CTA',
            //     event_label: buttonText,
            //     page_title: 'About Us'
            // });
        });
    });
}

// Initialize CTA tracking
trackCTAClicks();

// Feature card hover effects
function initializeFeatureCardEffects() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.feature-card__icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.feature-card__icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Initialize feature card effects
initializeFeatureCardEffects();

// Mission & Vision card interactions
function initializeMVCardEffects() {
    const mvCards = document.querySelectorAll('.mv-card');
    
    mvCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add a subtle pulse effect when clicked
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Initialize MV card effects
initializeMVCardEffects();

// Lazy loading for better performance
function initializeLazyLoading() {
    const lazyElements = document.querySelectorAll('.story-stats, .team-grid, .features-grid');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                lazyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });
}

// Initialize lazy loading
initializeLazyLoading();

// Add scroll progress indicator
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    });
}

// Initialize scroll progress
// initializeScrollProgress(); // Disabled as per user request
