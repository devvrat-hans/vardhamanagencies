// Homepage specific functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add loading class to body
    document.body.classList.add('page-loading');
    
    // Initialize immediately for better performance
    initializeHomePage();
    
    // Remove loading class after everything is initialized
    requestAnimationFrame(() => {
        document.body.classList.remove('page-loading');
        document.body.classList.add('page-loaded');
    });
});

function initializeHomePage() {
    // Initialize critical functionality first
    initializeSmoothScrolling();
    
    // Use requestAnimationFrame for non-critical animations
    requestAnimationFrame(() => {
        initializeScrollAnimations();
        initializeParallaxEffects();
        initializeStatsAnimation();
        initializeFAQ();
        
        // Initialize product filtering with a slight delay to ensure DOM is ready
        setTimeout(() => {
            initializeProductFiltering();
        }, 200);
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    // Use passive event listeners for better performance
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use requestAnimationFrame for smooth animations
                requestAnimationFrame(() => {
                    entry.target.classList.add('fade-in-up');
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation with delay
    setTimeout(() => {
        const animatedElements = document.querySelectorAll(
            '.feature, .product-card, .testimonial-card, .benefit, .section-header'
        );
        animatedElements.forEach(el => observer.observe(el));
    }, 100);
}

// Product Filtering
function initializeProductFiltering() {
    
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card[data-category]');
    
    
    if (categoryButtons.length === 0 || productCards.length === 0) {
        return;
    }
    
    categoryButtons.forEach((button, index) => {
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const category = button.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter products immediately
            filterProducts(category, productCards);
        });
    });
    
    productCards.forEach((card, index) => {
    });
}

function filterProducts(category, productCards) {
    
    productCards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
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

// Parallax Effects
function initializeParallaxEffects() {
    const heroParticles = document.querySelector('.hero__particles');
    const ctaParticles = document.querySelector('.cta__particles');
    
    if (heroParticles || ctaParticles) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (heroParticles) {
                heroParticles.style.transform = `translateY(${rate}px)`;
            }
            
            if (ctaParticles) {
                ctaParticles.style.transform = `translateY(${rate * 0.3}px)`;
            }
        });
    }
}

// Stats Animation
function initializeStatsAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statsObserver.observe(stat));
}

function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const number = parseInt(target.replace(/[^\d]/g, ''));
    const duration = 2000;
    const start = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * number);
        
        if (isPercentage) {
            element.textContent = current + '%';
        } else if (target.includes('+')) {
            element.textContent = current + '+';
        } else {
            element.textContent = current;
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
        <div class="toast__content">
            <span class="toast__icon">${getToastIcon(type)}</span>
            <span class="toast__message">${message}</span>
        </div>
        <button class="toast__close" onclick="closeToast(this.parentElement)">×</button>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getToastColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            closeToast(toast);
        }
    }, 5000);
}

function getToastIcon(type) {
    const icons = {
        success: '✓',
        error: '✗',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

function getToastColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

function closeToast(toast) {
    toast.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 300);
}

// Add click tracking for analytics
const ctaButtons = document.querySelectorAll('.btn');
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Add analytics tracking here if needed
    });
});

// Add CSS for toast animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .toast__content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
    }
    
    .toast__close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1.25rem;
        line-height: 1;
        opacity: 0.7;
        transition: opacity 0.2s;
    }
    
    .toast__close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// FAQ Functionality
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length === 0) {
        return;
    }
    
    
    faqQuestions.forEach((question, index) => {
        // Remove any existing event listeners
        question.replaceWith(question.cloneNode(true));
        const newQuestion = document.querySelectorAll('.faq-question')[index];
        
        newQuestion.addEventListener('click', (e) => {
            e.preventDefault();
            
            const faqId = newQuestion.getAttribute('data-faq');
            const answer = document.querySelector(`.faq-answer[data-faq="${faqId}"]`);
            const faqItem = newQuestion.closest('.faq-item');
            const isActive = newQuestion.classList.contains('active');
            
            
            // Close all other FAQs
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.closest('.faq-item').classList.remove('active');
            });
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('active');
            });
            
            // Toggle current FAQ
            if (!isActive) {
                newQuestion.classList.add('active');
                faqItem.classList.add('active');
                if (answer) {
                    answer.classList.add('active');
                } else {
                }
            }
        });
    });
}
