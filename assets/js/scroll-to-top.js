// Scroll to Top Button Functionality
class ScrollToTop {
    constructor() {
        this.button = null;
        this.scrollThreshold = 200; // Reduced threshold for faster appearance
        this.isScrolling = false;
        this.init();
    }
    
    init() {
        // Wait for templates to be loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.initializeComponents(), 300); // Increased delay for template loading
            });
        } else {
            setTimeout(() => this.initializeComponents(), 300); // Increased delay for template loading
        }
    }
    
    refresh() {
        // Re-initialize components if needed
        this.initializeComponents();
    }
    
    initializeComponents() {
        this.createButton();
        this.bindEvents();
        this.checkScrollPosition();
    }
    
    createButton() {
        // Check if button already exists (from template)
        this.button = document.getElementById('scrollToTop');
        
        if (this.button) {
            return; // Button already exists from template
        }
        
        // Create button if it doesn't exist
        this.button = document.createElement('button');
        this.button.id = 'scrollToTop';
        this.button.className = 'scroll-to-top';
        this.button.setAttribute('aria-label', 'Scroll to top');
        this.button.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
            </svg>
        `;
        
        // Append to body
        document.body.appendChild(this.button);
    }
    
    bindEvents() {
        if (!this.button) return;
        
        // Click event for scroll to top
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.scrollToTop();
        });
        
        // Optimized scroll event with throttling
        let ticking = false;
        let lastScrollY = 0;
        
        const handleScroll = () => {
            const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
            
            // Only update if scroll position changed significantly
            if (Math.abs(currentScrollY - lastScrollY) > 10) {
                this.checkScrollPosition();
                lastScrollY = currentScrollY;
            }
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
            }
        }, { passive: true }); // Use passive listener for better performance
        
        // Keyboard accessibility
        this.button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.scrollToTop();
            }
        });
        
        // Touch support for mobile devices
        this.button.addEventListener('touchstart', () => {
            this.button.style.transform = 'translateY(-1px) scale(0.98)';
        }, { passive: true });
        
        this.button.addEventListener('touchend', () => {
            this.button.style.transform = '';
        }, { passive: true });
    }
    
    checkScrollPosition() {
        if (!this.button) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Simple and fast check - just use the threshold
        if (scrollTop > this.scrollThreshold) {
            this.showButton();
        } else {
            this.hideButton();
        }
    }
    
    showButton() {
        if (!this.button) return;
        
        if (!this.button.classList.contains('visible')) {
            this.button.classList.add('visible');
            this.button.setAttribute('aria-hidden', 'false');
            // Add a small delay to ensure smooth animation
            requestAnimationFrame(() => {
                this.button.style.pointerEvents = 'auto';
            });
        }
    }
    
    hideButton() {
        if (!this.button) return;
        
        if (this.button.classList.contains('visible')) {
            this.button.classList.remove('visible');
            this.button.setAttribute('aria-hidden', 'true');
            this.button.style.pointerEvents = 'none';
        }
    }
    
    scrollToTop() {
        if (this.isScrolling) return;
        
        this.isScrolling = true;
        
        // Add scrolling animation class for visual feedback
        if (this.button) {
            this.button.classList.add('scrolling');
        }
        
        // Try modern smooth scroll first (fastest and smoothest)
        if ('scrollBehavior' in document.documentElement.style) {
            // Use native smooth scroll for best performance
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Check when scroll is complete
            let lastScrollTop = window.pageYOffset;
            const checkScrollComplete = () => {
                const currentScrollTop = window.pageYOffset;
                
                if (currentScrollTop === 0 || currentScrollTop === lastScrollTop) {
                    // Scroll is complete
                    this.isScrolling = false;
                    if (this.button) {
                        this.button.classList.remove('scrolling');
                    }
                    
                    // Enhanced focus management for accessibility
                    const focusTarget = document.querySelector('main h1') || 
                                      document.querySelector('h1') || 
                                      document.querySelector('.hero') ||
                                      document.querySelector('main') || 
                                      document.querySelector('header');
                                      
                    if (focusTarget) {
                        focusTarget.setAttribute('tabindex', '-1');
                        focusTarget.focus({ preventScroll: true });
                        setTimeout(() => {
                            focusTarget.removeAttribute('tabindex');
                        }, 100);
                    }
                } else {
                    lastScrollTop = currentScrollTop;
                    requestAnimationFrame(checkScrollComplete);
                }
            };
            
            requestAnimationFrame(checkScrollComplete);
            return;
        }
        
        // Fallback with enhanced custom animation for older browsers
        const startPosition = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = 0;
        const distance = startPosition - targetPosition;
        
        // Optimized duration - much faster and responsive
        const baseDuration = 300;  // Reduced from 400ms
        const maxDuration = 500;   // Reduced from 700ms
        const duration = Math.min(baseDuration + (distance / 15), maxDuration);
        
        let startTime = null;
        
        // Ultra-smooth easing function with fast start
        const easeOutCubic = (t) => {
            return 1 - Math.pow(1 - t, 3);
        };
        
        const animateScroll = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Apply smooth easing
            const easedProgress = easeOutCubic(progress);
            
            // Calculate current position with higher precision
            const currentPosition = startPosition - (distance * easedProgress);
            
            // Scroll to current position
            window.scrollTo(0, Math.max(currentPosition, 0));
            
            // Continue animation if not finished
            if (progress < 1 && currentPosition > 0) {
                requestAnimationFrame(animateScroll);
            } else {
                // Animation complete - ensure we're exactly at top
                window.scrollTo(0, 0);
                this.isScrolling = false;
                
                // Remove scrolling animation class
                if (this.button) {
                    this.button.classList.remove('scrolling');
                }
                
                // Enhanced focus management for accessibility
                const focusTarget = document.querySelector('main h1') || 
                                  document.querySelector('h1') || 
                                  document.querySelector('.hero') ||
                                  document.querySelector('main') || 
                                  document.querySelector('header');
                                  
                if (focusTarget) {
                    focusTarget.setAttribute('tabindex', '-1');
                    focusTarget.focus({ preventScroll: true });
                    setTimeout(() => {
                        focusTarget.removeAttribute('tabindex');
                    }, 100);
                }
            }
        };
        
        // Start the animation
        requestAnimationFrame(animateScroll);
    }
    
    // Public method to refresh button state
    refresh() {
        this.checkScrollPosition();
    }
    
    // Public method to destroy the button
    destroy() {
        if (this.button && this.button.parentNode) {
            this.button.parentNode.removeChild(this.button);
            this.button = null;
        }
        
        // Remove event listeners (they'll be cleaned up with the element)
        window.removeEventListener('scroll', this.checkScrollPosition);
    }
}

// Auto-initialize when DOM is loaded and templates are ready
function initializeScrollToTop() {
    // Only initialize if not already done
    if (!window.scrollToTopInstance) {
        window.scrollToTopInstance = new ScrollToTop();
    } else {
        // Re-initialize components if button was added by template
        window.scrollToTopInstance.initializeComponents();
    }
}

// Initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeScrollToTop);
} else {
    // DOM is already loaded, initialize immediately
    initializeScrollToTop();
}

// Handle dynamic content loading
document.addEventListener('templateLoaded', function(event) {
    if (event.detail?.template === 'scroll-to-top') {
        // Scroll-to-top template was loaded, initialize or refresh
        if (window.scrollToTopInstance) {
            window.scrollToTopInstance.initializeComponents();
        } else {
            // If instance doesn't exist, create it
            initializeScrollToTop();
        }
    }
});

// Also listen for general template loading
document.addEventListener('templateLoaded', function() {
    if (window.scrollToTopInstance) {
        window.scrollToTopInstance.refresh();
    } else {
        // If instance doesn't exist, create it
        setTimeout(() => {
            initializeScrollToTop();
        }, 100);
    }
});

// Also initialize after a small delay to ensure templates are loaded
setTimeout(() => {
    if (!window.scrollToTopInstance) {
        initializeScrollToTop();
    }
}, 500);

// Export for manual usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollToTop;
}

// Also make it available globally
window.ScrollToTop = ScrollToTop;
