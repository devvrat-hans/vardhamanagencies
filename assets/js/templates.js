// Template Loader for Vardhaman Agencies - Optimized for vardhamanagencies.in
(function() {
    'use strict';
    
    // Prevent redeclaration
    if (window.TemplateLoader) {
        return;
    }
    
    window.TemplateLoader = class TemplateLoader {
        // Cache for loaded templates
        static templateCache = new Map();
        static loadingPromises = new Map();
        
        // Template configuration for all shared templates
        static templates = {
            navbar: {
                path: '/assets/templates/shared/navbar.html',
                target: '#header, header[id="header"], .header[id="header"]',
                critical: true
            },
            footer: {
                path: '/assets/templates/shared/footer.html',
                target: '#footer, footer[id="footer"], .footer[id="footer"]',
                critical: true
            },
            cta: {
                path: '/assets/templates/shared/cta.html',
                target: '#cta-placeholder, .cta-placeholder, .cta-section',
                critical: false
            },
            'scroll-to-top': {
                path: '/assets/templates/shared/scroll-to-top.html',
                target: 'body',
                append: true,
                critical: false
            },
            chatbot: {
                path: '/assets/templates/shared/chatbot.html',
                target: 'body',
                append: true,
                critical: false
            }
        };
    
        static getBasePath() {
            const hostname = window.location.hostname;
            const currentPath = window.location.pathname;
            
            // For production deployment on vardhamanagencies.in
            if (hostname === 'vardhamanagencies.in' || hostname === 'www.vardhamanagencies.in') {
                return '';
            }
            
            // For other deployed sites, use absolute paths
            if (hostname !== 'localhost' && hostname !== '127.0.0.1' && !hostname.includes('192.168')) {
                return '';
            }
            
            // For local development - handle subdirectories
            const isInSubdirectory = currentPath.includes('/blogs/');
            return isInSubdirectory ? '../' : './';
        }
        
        static async loadTemplate(templateName, options = {}) {
            // Use predefined template config or custom options
            const config = this.templates[templateName] || options;
            
            if (!config.path && !options.path) {
                console.warn(`TemplateLoader: No path defined for template '${templateName}'`);
                return false;
            }
            
            const templatePath = config.path || options.path;
            const targetSelector = config.target || options.target;
            
            // Return existing promise if already loading
            if (this.loadingPromises.has(templateName)) {
                return await this.loadingPromises.get(templateName);
            }
            
            // Check cache first
            if (this.templateCache.has(templatePath)) {
                const element = document.querySelector(targetSelector);
                if (element) {
                    const html = this.templateCache.get(templatePath);
                    
                    if (config.append) {
                        // Check if already appended
                        const existingId = this.extractIdFromHtml(html);
                        if (existingId && document.getElementById(existingId)) {
                            return true;
                        }
                        element.insertAdjacentHTML('beforeend', html);
                    } else {
                        element.innerHTML = html;
                    }
                    
                    this.postLoadProcessing(templateName, config);
                    return true;
                }
            }
            
            // Create loading promise
            const loadingPromise = this.fetchAndLoadTemplate(templateName, config);
            this.loadingPromises.set(templateName, loadingPromise);
            
            try {
                const result = await loadingPromise;
                return result;
            } finally {
                this.loadingPromises.delete(templateName);
            }
        }
        
        static async fetchAndLoadTemplate(templateName, config) {
            const basePath = this.getBasePath();
            let templatePath = config.path;
            
            // For production deployment, ensure proper absolute paths
            const hostname = window.location.hostname;
            const isProduction = hostname === 'vardhamanagencies.in' || hostname === 'www.vardhamanagencies.in';
            
            if (isProduction) {
                // On production, always use absolute paths starting with /
                if (!templatePath.startsWith('/')) {
                    templatePath = '/' + templatePath;
                }
            } else {
                // For development, adjust paths based on current location
                if (!templatePath.startsWith('http') && !templatePath.startsWith('/')) {
                    templatePath = basePath + templatePath;
                } else if (templatePath.startsWith('/') && basePath !== '') {
                    templatePath = basePath + templatePath.substring(1);
                }
            }
            
            try {
                // Add cache busting for production to ensure latest templates
                const cacheBuster = isProduction ? `?v=${Date.now()}` : '';
                
                const response = await fetch(templatePath + cacheBuster);
                
                if (!response.ok) {
                    console.warn(`TemplateLoader: HTTP error ${response.status} for ${templatePath}`);
                    return false;
                }
                
                const html = await response.text();
                const element = document.querySelector(config.target);
                
                if (!element) {
                    console.warn(`TemplateLoader: Target element not found: ${config.target}`);
                    return false;
                }
                
                // Cache the template
                this.templateCache.set(config.path, html);
                
                // Insert HTML
                if (config.append) {
                    // Check if already appended
                    const existingId = this.extractIdFromHtml(html);
                    if (existingId && document.getElementById(existingId)) {
                        return true;
                    }
                    element.insertAdjacentHTML('beforeend', html);
                } else {
                    element.innerHTML = html;
                }
                
                // Post-load processing
                this.postLoadProcessing(templateName, config);
                
                return true;
                
            } catch (error) {
                console.warn(`TemplateLoader: Failed to load ${templateName}:`, error);
                return false;
            }
        }
        
        static extractIdFromHtml(html) {
            const match = html.match(/id="([^"]+)"/);
            return match ? match[1] : null;
        }
        
        static postLoadProcessing(templateName, config) {
            // Handle subdirectory path updates
            const currentPath = window.location.pathname;
            const isInSubdirectory = currentPath.includes('/blogs/');
            
            if (isInSubdirectory) {
                if (templateName === 'navbar') {
                    this.updateNavbarForSubdirectory();
                } else if (templateName === 'footer') {
                    this.updateFooterForSubdirectory();
                }
            }
            
            // Update active nav links for navbar
            if (templateName === 'navbar') {
                this.updateActiveNavLink();
            }
            
            // Dispatch events for component initialization
            document.dispatchEvent(new CustomEvent('templateLoaded', {
                detail: { template: templateName }
            }));
            
            if (templateName === 'navbar') {
                document.dispatchEvent(new CustomEvent('navbarLoaded'));
            }
        }        
        // Modern template loading methods
        static async loadNavbar() {
            return await this.loadTemplate('navbar');
        }
        
        static async loadFooter() {
            return await this.loadTemplate('footer');
        }
        
        static async loadCTA() {
            return await this.loadTemplate('cta');
        }
        
        static async loadScrollToTop() {
            return await this.loadTemplate('scroll-to-top');
        }
        
        static async loadChatbot() {
            return await this.loadTemplate('chatbot');
        }
        
        // Load all templates - useful for initialization
        static async loadAllTemplates() {
            try {
                // Load critical templates first
                const criticalTemplates = Object.entries(this.templates)
                    .filter(([name, config]) => config.critical)
                    .map(([name]) => this.loadTemplate(name));
                
                await Promise.all(criticalTemplates);
                
                // Load non-critical templates
                const nonCriticalTemplates = Object.entries(this.templates)
                    .filter(([name, config]) => !config.critical)
                    .map(([name]) => this.loadTemplate(name));
                
                await Promise.all(nonCriticalTemplates);
                
                return true;
            } catch (error) {
                console.warn('TemplateLoader: Error loading all templates:', error);
                return false;
            }
        }
        
        // Load critical templates only (navbar, footer)
        static async loadCriticalTemplates() {
            try {
                const criticalTemplates = Object.entries(this.templates)
                    .filter(([name, config]) => config.critical)
                    .map(([name]) => this.loadTemplate(name));
                
                await Promise.all(criticalTemplates);
                return true;
            } catch (error) {
                console.warn('TemplateLoader: Error loading critical templates:', error);
                return false;
            }
        }
        
        // Fallback methods for when template loading fails
        static createFallbackNavbar() {
            const header = document.querySelector('#header, header[id="header"], .header[id="header"]');
            if (header) {
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
                
                this.updateActiveNavLink();
                const currentPath = window.location.pathname;
                const isInSubdirectory = currentPath.includes('/blogs/');
                if (isInSubdirectory) {
                    this.updateNavbarForSubdirectory();
                }
                document.dispatchEvent(new CustomEvent('navbarLoaded'));
            }
        }
        
        static createFallbackFooter() {
            const footer = document.querySelector('#footer, footer[id="footer"], .footer[id="footer"]');
            if (footer) {
                footer.innerHTML = `
                    <div class="container">
                        <div class="footer__grid">
                            <div class="footer__column footer__company-info">
                                <h4 class="footer__heading">Vardhaman Agencies</h4>
                                <p>Established in 2006, we are a distinguished wholesaler and trader offering premium bubble wrap packaging solutions for B2B and B2C markets.</p>
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
        
        // Utility methods for navigation and path handling
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
    };
    
    // Initialize templates as soon as the script loads
    (function initTemplateLoader() {
        // Fast template initialization
        function loadCriticalTemplates() {
            if (typeof window.TemplateLoader !== 'undefined') {
                // Load critical templates first (navbar and footer)
                window.TemplateLoader.loadCriticalTemplates().then((success) => {
                    if (success) {
                        console.log('✅ Critical templates loaded successfully');
                        
                        // Load non-critical templates after critical ones with small delays
                        setTimeout(() => window.TemplateLoader.loadCTA(), 100);
                        setTimeout(() => window.TemplateLoader.loadScrollToTop(), 200);
                        setTimeout(() => window.TemplateLoader.loadChatbot(), 300);
                        
                        // Dispatch event when all templates are loaded
                        Promise.all([
                            window.TemplateLoader.loadCTA(),
                            window.TemplateLoader.loadScrollToTop(),
                            window.TemplateLoader.loadChatbot()
                        ]).then(() => {
                            document.dispatchEvent(new CustomEvent('allTemplatesLoaded'));
                            console.log('✅ All templates loaded successfully');
                        });
                        
                    } else {
                        console.warn('⚠️ Critical templates failed to load, using fallbacks');
                        // Try fallback methods
                        window.TemplateLoader.createFallbackNavbar();
                        window.TemplateLoader.createFallbackFooter();
                    }
                }).catch(error => {
                    console.warn('❌ Template loading error:', error);
                    // Try fallback methods
                    window.TemplateLoader.createFallbackNavbar();
                    window.TemplateLoader.createFallbackFooter();
                });
            }
        }
        
        // Load templates based on document state
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadCriticalTemplates);
        } else {
            loadCriticalTemplates();
        }
        
        // Performance optimization: Preload templates after page load
        window.addEventListener('load', () => {
            // Preload any templates that might be needed later
            if (window.TemplateLoader && window.TemplateLoader.templateCache.size < 5) {
                setTimeout(() => {
                    window.TemplateLoader.loadAllTemplates();
                }, 1000);
            }
        });
    })();
    
})();

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.TemplateLoader;
}
