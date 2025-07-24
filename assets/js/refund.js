// Refund Policy Page specific functionality
document.addEventListener('DOMContentLoaded', () => {
    // Wait for templates to load
    setTimeout(initializeRefundPage, 200);
});

function initializeRefundPage() {
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize table of contents functionality
    initializeTableOfContents();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize section highlighting
    initializeSectionHighlighting();
}

// Table of Contents functionality
function initializeTableOfContents() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('.refund-section');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Remove active class from all links
                tocLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');
                
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Section highlighting on scroll
function initializeSectionHighlighting() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('.refund-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                const correspondingLink = document.querySelector(`.toc-link[href="#${targetId}"]`);
                
                // Remove active class from all links
                tocLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, {
        rootMargin: '-20% 0px -60% 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
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

// Scroll animations for elements
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all refund sections and features
    const elementsToAnimate = document.querySelectorAll(`
        .refund-section,
        .qa-feature,
        .timeline-feature,
        .contact-method
    `);
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Contact method interactions
document.addEventListener('click', (e) => {
    const contactMethod = e.target.closest('.contact-method');
    if (contactMethod) {
        contactMethod.style.transform = 'scale(0.98)';
        setTimeout(() => {
            contactMethod.style.transform = '';
        }, 150);
    }
});

// Process step hover effects
document.addEventListener('mouseenter', (e) => {
    const processStep = e.target.closest('.process-step');
    if (processStep) {
        processStep.style.transform = 'translateY(-4px)';
    }
}, true);

document.addEventListener('mouseleave', (e) => {
    const processStep = e.target.closest('.process-step');
    if (processStep) {
        processStep.style.transform = '';
    }
}, true);

// Print functionality
function printRefundPolicy() {
    window.print();
}

// Add print button functionality if needed
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printRefundPolicy();
    }
});

// Enhanced accessibility
document.addEventListener('keydown', (e) => {
    // Skip to main content with Alt+M
    if (e.altKey && e.key === 'm') {
        e.preventDefault();
        const mainContent = document.querySelector('.refund-main');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Navigate TOC with Alt+T
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        const firstTocLink = document.querySelector('.toc-link');
        if (firstTocLink) {
            firstTocLink.focus();
        }
    }
});

// Mobile TOC toggle
function initializeMobileTOC() {
    const tocToggle = document.createElement('button');
    tocToggle.className = 'toc-toggle';
    tocToggle.innerHTML = '💰 Table of Contents';
    tocToggle.setAttribute('aria-label', 'Toggle table of contents');
    
    const tocContainer = document.querySelector('.refund-sidebar');
    if (tocContainer && window.innerWidth <= 768) {
        tocContainer.parentNode.insertBefore(tocToggle, tocContainer);
        tocContainer.classList.add('toc-hidden');
        
        tocToggle.addEventListener('click', () => {
            tocContainer.classList.toggle('toc-hidden');
            const isHidden = tocContainer.classList.contains('toc-hidden');
            tocToggle.innerHTML = isHidden ? '💰 Table of Contents' : '❌ Hide Contents';
        });
    }
}

// Initialize mobile TOC on load and resize
window.addEventListener('load', initializeMobileTOC);
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const tocContainer = document.querySelector('.refund-sidebar');
        const tocToggle = document.querySelector('.toc-toggle');
        if (tocContainer) {
            tocContainer.classList.remove('toc-hidden');
        }
        if (tocToggle) {
            tocToggle.remove();
        }
    } else {
        initializeMobileTOC();
    }
});

// Refund calculator helper (if needed in future)
function calculateRefundTimeline(orderDate, returnDate) {
    const orderTime = new Date(orderDate);
    const returnTime = new Date(returnDate);
    const daysDifference = Math.floor((returnTime - orderTime) / (1000 * 60 * 60 * 24));
    
    return {
        eligible: daysDifference <= 7,
        daysRemaining: Math.max(0, 7 - daysDifference),
        daysPassed: daysDifference
    };
}

// Form validation for return requests (if form is added later)
function validateReturnForm(formData) {
    const required = ['orderNumber', 'returnReason', 'contactEmail'];
    const missing = required.filter(field => !formData[field]);
    
    return {
        isValid: missing.length === 0,
        missingFields: missing
    };
}
