// Privacy Page specific functionality
document.addEventListener('DOMContentLoaded', () => {
    // Wait for templates to load
    setTimeout(initializePrivacyPage, 200);
});

function initializePrivacyPage() {
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
    const sections = document.querySelectorAll('.privacy-section');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                tocLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

// Section highlighting on scroll
function initializeSectionHighlighting() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('.privacy-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const correspondingLink = document.querySelector(`.toc-link[href="#${id}"]`);
                
                // Remove active class from all links
                tocLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current link
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
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
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
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
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
    
    // Observe all privacy sections and features
    const elementsToAnimate = document.querySelectorAll(`
        .privacy-section,
        .security-feature,
        .cookie-type,
        .user-right,
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

// Print functionality
function printPrivacyPolicy() {
    window.print();
}

// Add print button functionality if needed
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printPrivacyPolicy();
    }
});

// Enhanced accessibility
document.addEventListener('keydown', (e) => {
    // Skip to main content with Alt+M
    if (e.altKey && e.key === 'm') {
        e.preventDefault();
        const mainContent = document.querySelector('.privacy-main');
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
    tocToggle.innerHTML = '📑 Table of Contents';
    tocToggle.setAttribute('aria-label', 'Toggle table of contents');
    
    const tocContainer = document.querySelector('.privacy-sidebar');
    if (tocContainer && window.innerWidth <= 768) {
        tocContainer.parentNode.insertBefore(tocToggle, tocContainer);
        tocContainer.classList.add('toc-hidden');
        
        tocToggle.addEventListener('click', () => {
            tocContainer.classList.toggle('toc-hidden');
            const isHidden = tocContainer.classList.contains('toc-hidden');
            tocToggle.setAttribute('aria-expanded', !isHidden);
        });
    }
}

// Initialize mobile TOC on load and resize
window.addEventListener('load', initializeMobileTOC);
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const tocContainer = document.querySelector('.privacy-sidebar');
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