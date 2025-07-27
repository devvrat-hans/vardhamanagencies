// CTA Section JavaScript
class CTASection {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupAnimations();
        this.setupContactTracking();
    }

    setupIntersectionObserver() {
        const ctaSection = document.querySelector('.cta');
        if (!ctaSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateOnView(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });

        observer.observe(ctaSection);
    }

    animateOnView(section) {
        section.classList.add('cta--animated');
        
        // Animate elements sequentially
        const elements = [
            section.querySelector('.cta__badge'),
            section.querySelector('.cta__title'),
            section.querySelector('.cta__description'),
            section.querySelector('.cta__actions'),
            section.querySelector('.cta__contact-info'),
            section.querySelector('.cta__visual')
        ];

        elements.forEach((element, index) => {
            if (element) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }

    setupAnimations() {
        const ctaSection = document.querySelector('.cta');
        if (!ctaSection) return;

        // Add initial animation states
        const animatedElements = ctaSection.querySelectorAll('.cta__badge, .cta__title, .cta__description, .cta__actions, .cta__contact-info, .cta__visual');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease-out';
        });

        // Button hover effects
        this.setupButtonEffects();
        
        // Parallax effect for background elements
        this.setupParallaxEffect();
    }

    setupButtonEffects() {
        const buttons = document.querySelectorAll('.cta__btn-primary, .cta__btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e);
            });

            button.addEventListener('click', (e) => {
                this.createClickEffect(e);
            });
        });
    }

    createRippleEffect(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    createClickEffect(e) {
        const button = e.currentTarget;
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    setupParallaxEffect() {
        const bgElements = document.querySelectorAll('.cta__bg-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            bgElements.forEach((element, index) => {
                const speed = (index + 1) * 0.3;
                element.style.transform = `translateY(${rate * speed}px) rotate(${rate * 0.1}deg)`;
            });
        });
    }

    setupContactTracking() {
        const contactButtons = document.querySelectorAll('.cta__btn-primary, .cta__btn-secondary');
        const contactInfo = document.querySelectorAll('.cta__contact-item');

        contactButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = button.querySelector('span').textContent;
                this.trackEvent('CTA Button Click', {
                    button: buttonText,
                    page: window.location.pathname
                });
            });
        });

        contactInfo.forEach(item => {
            item.addEventListener('click', () => {
                const contactType = item.querySelector('.cta__contact-label').textContent;
                this.trackEvent('Contact Info Click', {
                    type: contactType,
                    page: window.location.pathname
                });
            });
        });
    }

    trackEvent(eventName, properties) {
        // Analytics tracking (integrate with your analytics service)
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
        
    }
}

// Add ripple animation CSS if not already added
if (!document.querySelector('#cta-styles')) {
    const style = document.createElement('style');
    style.id = 'cta-styles';
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .cta--animated .cta__bubble-effect .bubble {
            animation-play-state: running;
        }
        
        .cta__btn-primary, .cta__btn-secondary {
            position: relative;
            overflow: hidden;
        }
        
        .cta__contact-item {
            cursor: pointer;
            transition: transform 0.2s ease;
        }
        
        .cta__contact-item:hover {
            transform: translateX(5px);
        }
        
        .cta__contact-icon {
            transition: all 0.3s ease;
        }
        
        .cta__contact-item:hover .cta__contact-icon {
            background: rgba(255, 255, 255, 0.25);
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);
}

// Initialize CTA section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CTASection();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CTASection;
}
