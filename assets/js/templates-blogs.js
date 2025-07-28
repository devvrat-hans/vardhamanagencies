// Template loader utility for blog posts
class TemplateBlogLoader {
    static async loadTemplate(templatePath, targetElement) {
        try {
            const response = await fetch(templatePath);
            if (!response.ok) {
                throw new Error(`Failed to load template: ${templatePath}`);
            }
            const html = await response.text();
            const element = document.querySelector(targetElement);
            if (element) {
                element.innerHTML = html;
            }
        } catch (error) {
        }
    }
    
    static async loadNavbar() {
        try {
            await this.loadTemplate('/assets/templates/shared/navbar.html', '#header');
            
            // Update active nav link based on current page
            this.updateActiveNavLink();
            
            // Dispatch custom event to notify that navbar is loaded
            document.dispatchEvent(new CustomEvent('navbarLoaded'));
        } catch (error) {
            // Fallback navbar if template loading fails
            this.createFallbackNavbar();
        }
    }
    
    static createFallbackNavbar() {
        const header = document.querySelector('#header');
        if (header) {
            // Fallback navbar with search modal for blog pages
            header.innerHTML = `
                <div class="container header__container">
                    <a href="../" class="header__logo">
                        <h1>Vardhaman Agencies</h1>
                    </a>
                    <nav class="header__nav">
                        <ul>
                            <li><a href="../" class="nav-link">Home</a></li>
                            <li><a href="../products.html" class="nav-link">Products</a></li>
                            <li><a href="../blogs.html" class="nav-link active">Blog</a></li>
                            <li><a href="../about.html" class="nav-link">About Us</a></li>
                            <li><a href="../contact.html" class="nav-link">Contact</a></li>
                        </ul>
                    </nav>
                    <div class="header__actions">
                        <button class="header__action-btn search-toggle" aria-label="Search">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                            </svg>
                        </button>
                        <button class="header__menu-toggle" aria-label="Open menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>

                <!-- Search Modal -->
                <div class="search-modal" id="searchModal">
                    <div class="search-modal__backdrop"></div>
                    <div class="search-modal__content">
                        <div class="search-modal__header">
                            <div class="search-input-container">
                                <svg class="search-input-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                </svg>
                                <input type="text" class="search-input" placeholder="Search products..." autocomplete="off" spellcheck="false">
                                <button class="search-close" aria-label="Close search">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="search-modal__body">
                            <div class="search-results" id="searchResults">
                                <div class="search-placeholder">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                    </svg>
                                    <h3>Search Products</h3>
                                    <p>Start typing to search for bubble wrap rolls, stretch films, and packaging materials.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Update active nav link
            this.updateActiveNavLink();
            
            // Dispatch custom event to notify that navbar is loaded
            document.dispatchEvent(new CustomEvent('navbarLoaded'));
        }
    }
    
    static async loadFooter() {
        await this.loadTemplate('/assets/templates/shared/footer.html', '#footer');
    }
    
    static async loadCTA() {
        await this.loadTemplate('/assets/templates/shared/cta.html', '#cta-placeholder');
    }
    
    static async loadScrollToTop() {
        try {
            const response = await fetch('/assets/templates/shared/scroll-to-top.html');
            if (response.ok) {
                const html = await response.text();
                // Only add if not already present
                if (!document.getElementById('scrollToTop')) {
                    document.body.insertAdjacentHTML('beforeend', html);
                }
                
                // Dispatch event to notify that scroll-to-top template is loaded
                document.dispatchEvent(new CustomEvent('templateLoaded', {
                    detail: { template: 'scroll-to-top' }
                }));
            }
        } catch (error) {
            console.error('ScrollToTop loading error:', error);
        }
    }
    
    static async loadChatbot() {
        try {
            const response = await fetch('/assets/templates/shared/chatbot.html');
            if (response.ok) {
                const html = await response.text();
                // Only add if not already present
                if (!document.getElementById('chatbot')) {
                    document.body.insertAdjacentHTML('beforeend', html);
                } else {
                }
                
                // Dispatch event to notify that chatbot template is loaded
                document.dispatchEvent(new CustomEvent('templateLoaded', {
                    detail: { template: 'chatbot' }
                }));
            } else {
            }
        } catch (error) {
        }
    }
    
    static updateActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            // For blog posts, highlight the blog nav link
            if (href === '/blogs' || href === '/blogs.html' || href === '../blogs.html') {
                link.classList.add('active');
            }
        });
    }
    
    static async loadAllTemplates() {
        // Load critical templates first (navbar, footer for immediate functionality)
        const criticalTemplates = [
            this.loadNavbar(),
            this.loadFooter()
        ];
        
        // Load non-critical templates after critical ones
        const nonCriticalTemplates = [
            this.loadCTA(),
            this.loadScrollToTop(),
            this.loadChatbot()
        ];
        
        // Load critical templates immediately
        await Promise.all(criticalTemplates);
        
        // Load non-critical templates with slight delay
        setTimeout(async () => {
            await Promise.all(nonCriticalTemplates);
        }, 100);
    }
    
    static initScrollToTop() {
        // This method is now handled by scroll-to-top.js
        // Kept for backward compatibility
    }
    
    static updateNavbarForSubdirectory() {
        // Update all navigation links for subdirectory pages
        const navLinks = document.querySelectorAll('nav a[href^="./"]');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('./')) {
                link.setAttribute('href', '../' + href.substring(2));
            }
        });
        
        // Update logo link
        const logoLink = document.querySelector('.header__logo');
        if (logoLink && logoLink.getAttribute('href') === './index.html') {
            logoLink.setAttribute('href', '../index.html');
        }
        
        // Update logo image src
        const logoImg = document.querySelector('.header__logo img');
        if (logoImg && logoImg.src.includes('./assets/')) {
            logoImg.src = logoImg.src.replace('./assets/', '../assets/');
        }
    }
    
    static updateFooterForSubdirectory() {
        // Update all footer links for subdirectory pages
        const footerLinks = document.querySelectorAll('footer a[href^="./"]');
        footerLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('./')) {
                link.setAttribute('href', '../' + href.substring(2));
            }
        });
    }
}

// Export for manual usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TemplateBlogLoader;
}
