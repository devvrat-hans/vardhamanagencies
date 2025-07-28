// Fast Template loader utility - Optimized for speed
class TemplateLoader {
    // Cache for loaded templates to avoid re-fetching
    static templateCache = new Map();
    
    static getBasePath() {
        // Simplified path resolution for better performance
        const currentPath = window.location.pathname;
        const isInSubdirectory = currentPath.includes('/blogs/');
        
        // Always use absolute paths for deployed sites for better performance
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            return '/';
        }
        
        return isInSubdirectory ? '../' : './';
    }
    
    static async loadTemplate(templatePath, targetElement) {
        // Check cache first for instant loading
        if (this.templateCache.has(templatePath)) {
            const element = document.querySelector(targetElement);
            if (element) {
                element.innerHTML = this.templateCache.get(templatePath);
                return true;
            }
        }
        
        // Optimized single path resolution - no multiple attempts
        let finalPath;
        if (templatePath.startsWith('/')) {
            finalPath = templatePath;
        } else {
            const basePath = this.getBasePath();
            finalPath = basePath + templatePath;
        }
        
        try {
            const response = await fetch(finalPath);
            if (response.ok) {
                const html = await response.text();
                const element = document.querySelector(targetElement);
                if (element) {
                    element.innerHTML = html;
                    // Cache the template for future use
                    this.templateCache.set(templatePath, html);
                    return true;
                } else {
                    return false;
                }
            }
        } catch (error) {
            // Silent fail for better performance
        }
        
        return false;
    }
    
    static async loadNavbar() {
        const basePath = this.getBasePath();
        const templatePath = `${basePath}assets/templates/shared/navbar.html`;
        
        const success = await this.loadTemplate(templatePath, '#header');
        
        if (success) {
            // Immediate execution without setTimeout for faster rendering
            this.updateActiveNavLink();
            const currentPath = window.location.pathname;
            const isInSubdirectory = currentPath.includes('/blogs/');
            if (isInSubdirectory) {
                this.updateNavbarForSubdirectory();
            }
            document.dispatchEvent(new CustomEvent('navbarLoaded'));
        } else {
            // Fast fallback without console warnings
            this.createFallbackNavbar();
        }
        
        return success;
    }
    
    static createFallbackNavbar() {
        const header = document.querySelector('#header');
        if (header) {
            // Optimized inline HTML - no external image dependencies for faster loading
            header.innerHTML = `
                <div class="container header__container">
                    <a href="/" class="header__logo">
                        <h1>Vardhaman Agencies</h1>
                    </a>
                    <nav class="header__nav">
                        <ul>
                            <li><a href="/" class="nav-link">Home</a></li>
                            <li><a href="/products.html" class="nav-link">Products</a></li>
                            <li><a href="/blogs.html" class="nav-link">Blog</a></li>
                            <li><a href="/about.html" class="nav-link">About Us</a></li>
                            <li><a href="/contact.html" class="nav-link">Contact</a></li>
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
            `;
            
            // Immediate execution
            this.updateActiveNavLink();
            const currentPath = window.location.pathname;
            const isInSubdirectory = currentPath.includes('/blogs/');
            if (isInSubdirectory) {
                this.updateNavbarForSubdirectory();
            }
            document.dispatchEvent(new CustomEvent('navbarLoaded'));
        }
    }
    
    static async loadFooter() {
        const basePath = this.getBasePath();
        const templatePath = `${basePath}assets/templates/shared/footer.html`;
        
        const success = await this.loadTemplate(templatePath, '#footer');
        
        if (success) {
            const currentPath = window.location.pathname;
            const isInSubdirectory = currentPath.includes('/blogs/');
            if (isInSubdirectory) {
                this.updateFooterForSubdirectory();
            }
        } else {
            // Fast fallback
            this.createFallbackFooter();
        }
        
        return success;
    }
    
    static createFallbackFooter() {
        const footer = document.querySelector('#footer');
        if (footer) {
            // Optimized footer HTML for faster loading
            footer.innerHTML = `
                <div class="container">
                    <div class="footer__grid">
                        <div class="footer__column footer__company-info">
                            <h4 class="footer__heading">Vardhaman Agencies</h4>
                            <p>Established in 2006, we are a distinguished wholesaler and trader offering premium bubble wrap packaging solutions for B2B and C2B markets.</p>
                        </div>
                        <div class="footer__column">
                            <h4 class="footer__heading">Quick Links</h4>
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="/products.html">Our Products</a></li>
                                <li><a href="/about.html">About Us</a></li>
                                <li><a href="/contact.html">Contact Us</a></li>
                            </ul>
                        </div>
                        <div class="footer__column">
                            <h4 class="footer__heading">Products</h4>
                            <ul>
                                <li><a href="/products.html#bubble-wrap">Bubble Wrap Rolls</a></li>
                                <li><a href="/products.html#stretch-film">Stretch Films</a></li>
                            </ul>
                        </div>
                        <div class="footer__column">
                            <h4 class="footer__heading">Contact Info</h4>
                            <div class="footer__contact-info">
                                <p>No. 563, Ganesh Peth, Pune-411002, Maharashtra, India</p>
                                <p>+91-8043864029 Ext. 7822</p>
                                <p>info@vardhamanagencies.in</p>
                            </div>
                        </div>
                    </div>
                    <div class="footer__bottom">
                        <div class="footer__bottom-content">
                            <p>&copy; 2025 Vardhaman Agencies. All Rights Reserved.</p>
                            <div class="footer__bottom-links">
                                <a href="/privacy.html">Privacy Policy</a>
                                <span>|</span>
                                <a href="/terms.html">Terms & Conditions</a>
                                <span>|</span>
                                <a href="/refund.html">Refund Policy</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            const currentPath = window.location.pathname;
            const isInSubdirectory = currentPath.includes('/blogs/');
            if (isInSubdirectory) {
                this.updateFooterForSubdirectory();
            }
        }
    }
    
    static async loadCTA() {
        const basePath = this.getBasePath();
        const templatePath = `${basePath}assets/templates/shared/cta.html`;
        
        return await this.loadTemplate(templatePath, '#cta-placeholder');
    }
    
    static async loadScrollToTop() {
        const basePath = this.getBasePath();
        const templatePath = `${basePath}assets/templates/shared/scroll-to-top.html`;
        
        // Fast single path attempt
        try {
            const response = await fetch(templatePath);
            if (response.ok) {
                const html = await response.text();
                if (!document.getElementById('scrollToTop')) {
                    document.body.insertAdjacentHTML('beforeend', html);
                }
                
                document.dispatchEvent(new CustomEvent('templateLoaded', {
                    detail: { template: 'scroll-to-top' }
                }));
                return true;
            }
        } catch (error) {
            // Silent fail for better performance
        }
        
        return false;
    }
    
    static async loadChatbot() {
        const basePath = this.getBasePath();
        const templatePath = `${basePath}assets/templates/shared/chatbot.html`;
        
        // Fast single path attempt without cache-busting for better performance
        try {
            const response = await fetch(templatePath);
            if (response.ok) {
                const html = await response.text();
                if (!document.getElementById('chatbot')) {
                    document.body.insertAdjacentHTML('beforeend', html);
                }
                
                document.dispatchEvent(new CustomEvent('templateLoaded', {
                    detail: { template: 'chatbot' }
                }));
                return true;
            }
        } catch (error) {
            // Silent fail for better performance
        }
        
        return false;
    }
    
    static updateActiveNavLink() {
        const currentPage = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            // Handle different page matches
            if (href === currentPage) {
                link.classList.add('active');
            }
            // Handle root/home page
            else if ((currentPage === '/' || currentPage === '/index.html' || currentPage.endsWith('/')) && href === '/') {
                link.classList.add('active');
            }
            // Handle blogs page and blog posts
            else if (currentPage.includes('/blogs') && href === '/blogs.html') {
                link.classList.add('active');
            }
            // Handle other pages by checking if current page contains the href filename
            else if (href !== '/' && currentPage.includes(href.replace('/', ''))) {
                link.classList.add('active');
            }
        });
    }
    
    static updateNavbarForSubdirectory() {
        // Update all navigation links for subdirectory pages
        const navLinks = document.querySelectorAll('nav a[href^="/"]');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('/') && !href.startsWith('//')) {
                // Convert absolute paths to relative for subdirectory pages
                const relativePath = '../' + href.substring(1);
                link.setAttribute('href', relativePath);
            }
        });
        
        // Update logo link
        const logoLink = document.querySelector('.header__logo');
        if (logoLink && logoLink.getAttribute('href') === '/') {
            logoLink.setAttribute('href', '../');
        }
        
        // Update logo image src
        const logoImg = document.querySelector('.header__logo img');
        if (logoImg && logoImg.src.includes('/assets/')) {
            logoImg.src = logoImg.src.replace('/assets/', '../assets/');
        }
    }
    
    static updateFooterForSubdirectory() {
        // Update all footer links for subdirectory pages
        const footerLinks = document.querySelectorAll('footer a[href^="/"]');
        footerLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('/') && !href.startsWith('//')) {
                // Convert absolute paths to relative for subdirectory pages
                const relativePath = '../' + href.substring(1);
                link.setAttribute('href', relativePath);
            }
        });
    }
}

// Export TemplateLoader for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TemplateLoader;
}
