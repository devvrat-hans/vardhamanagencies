// Template loader utility
class TemplateLoader {
    static getBasePath() {
        // Get the base path for the current page
        const currentPath = window.location.pathname;
        const isInSubdirectory = currentPath.includes('/blogs/');
        return isInSubdirectory ? '../' : './';
    }
    
    static async loadTemplate(templatePath, targetElement) {
        try {
            console.log(`Loading template: ${templatePath}`);
            const response = await fetch(templatePath);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: Failed to load template: ${templatePath}`);
            }
            const html = await response.text();
            const element = document.querySelector(targetElement);
            if (element) {
                element.innerHTML = html;
                console.log(`Successfully loaded template: ${templatePath}`);
            } else {
                console.error(`Target element not found: ${targetElement}`);
                return false;
            }
            return true;
        } catch (error) {
            console.error('Template loading error:', error);
            // Try alternative paths if the primary fails
            if (templatePath.startsWith('./assets/')) {
                const altPath = templatePath.replace('./assets/', '/assets/');
                console.log(`Trying alternative path: ${altPath}`);
                try {
                    const altResponse = await fetch(altPath);
                    if (altResponse.ok) {
                        const html = await altResponse.text();
                        const element = document.querySelector(targetElement);
                        if (element) {
                            element.innerHTML = html;
                            console.log(`Successfully loaded template with alternative path: ${altPath}`);
                            return true;
                        }
                    }
                } catch (altError) {
                    console.error('Alternative path also failed:', altError);
                }
            }
            return false;
        }
    }
    
    static async loadNavbar() {
        // Determine the correct path based on current directory
        const basePath = this.getBasePath();
        const templatePath = `${basePath}assets/templates/shared/navbar.html`;
        
        const success = await this.loadTemplate(templatePath, '#header');
        
        if (success) {
            // Wait a bit for DOM to be fully updated
            setTimeout(() => {
                // Update active nav link based on current page
                this.updateActiveNavLink();
                
                // Update navbar links for subdirectory if needed
                const currentPath = window.location.pathname;
                const isInSubdirectory = currentPath.includes('/blogs/');
                if (isInSubdirectory) {
                    this.updateNavbarForSubdirectory();
                }
                
                // Dispatch custom event to notify that navbar is loaded
                document.dispatchEvent(new CustomEvent('navbarLoaded'));
            }, 100);
        } else {
            // Fallback: Create basic navbar if template loading fails
            console.warn('Navbar template failed to load, using fallback');
            this.createFallbackNavbar();
        }
        
        return success;
    }
    
    static createFallbackNavbar() {
        const header = document.querySelector('#header');
        if (header) {
            header.innerHTML = `
                <div class="container header__container">
                    <a href="./" class="header__logo">
                        <img src="./assets/images/logo/vardhamanagencies-logo-nobg.png" alt="Vardhaman Agencies" class="logo-image" onerror="this.style.display='none'">
                        <h1>Vardhaman Agencies</h1>
                    </a>
                    <nav class="header__nav">
                        <ul>
                            <li><a href="./" class="nav-link">Home</a></li>
                            <li><a href="./products.html" class="nav-link">Products</a></li>
                            <li><a href="./blogs.html" class="nav-link">Blog</a></li>
                            <li><a href="./about.html" class="nav-link">About Us</a></li>
                            <li><a href="./contact.html" class="nav-link">Contact</a></li>
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
            
            // Update active nav link
            setTimeout(() => {
                this.updateActiveNavLink();
                const currentPath = window.location.pathname;
                const isInSubdirectory = currentPath.includes('/blogs/');
                if (isInSubdirectory) {
                    this.updateNavbarForSubdirectory();
                }
                document.dispatchEvent(new CustomEvent('navbarLoaded'));
            }, 100);
        }
    }
    
    static async loadFooter() {
        // Determine the correct path based on current directory
        const basePath = this.getBasePath();
        const templatePath = `${basePath}assets/templates/shared/footer.html`;
        
        const success = await this.loadTemplate(templatePath, '#footer');
        
        if (success) {
            // Update footer links based on current directory
            const currentPath = window.location.pathname;
            const isInSubdirectory = currentPath.includes('/blogs/');
            if (isInSubdirectory) {
                this.updateFooterForSubdirectory();
            }
        } else {
            // Fallback: Create basic footer if template loading fails
            console.warn('Footer template failed to load, using fallback');
            this.createFallbackFooter();
        }
        
        return success;
    }
    
    static createFallbackFooter() {
        const footer = document.querySelector('#footer');
        if (footer) {
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
                                <li><a href="./">Home</a></li>
                                <li><a href="./products.html">Our Products</a></li>
                                <li><a href="./about.html">About Us</a></li>
                                <li><a href="./contact.html">Contact Us</a></li>
                            </ul>
                        </div>
                        <div class="footer__column">
                            <h4 class="footer__heading">Products</h4>
                            <ul>
                                <li><a href="./products.html#bubble-wrap">Bubble Wrap Rolls</a></li>
                                <li><a href="./products.html#stretch-film">Stretch Films</a></li>
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
                                <a href="./privacy.html">Privacy Policy</a>
                                <span>|</span>
                                <a href="./terms.html">Terms & Conditions</a>
                                <span>|</span>
                                <a href="./refund.html">Refund Policy</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Update footer links for subdirectory if needed
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
        // Load the scroll-to-top button into the body
        try {
            const basePath = this.getBasePath();
            const templatePath = `${basePath}assets/templates/shared/scroll-to-top.html`;
            console.log(`Loading scroll-to-top: ${templatePath}`);
            
            const response = await fetch(templatePath);
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
                console.log('Successfully loaded scroll-to-top template');
                return true;
            } else {
                // Try alternative path
                const altPath = `/assets/templates/shared/scroll-to-top.html`;
                const altResponse = await fetch(altPath);
                if (altResponse.ok) {
                    const html = await altResponse.text();
                    if (!document.getElementById('scrollToTop')) {
                        document.body.insertAdjacentHTML('beforeend', html);
                    }
                    document.dispatchEvent(new CustomEvent('templateLoaded', {
                        detail: { template: 'scroll-to-top' }
                    }));
                    console.log('Successfully loaded scroll-to-top template with alternative path');
                    return true;
                }
            }
        } catch (error) {
            console.error('ScrollToTop loading error:', error);
        }
        return false;
    }
    
    static async loadChatbot() {
        // Load the chatbot into the body
        try {
            const basePath = this.getBasePath();
            const templatePath = `${basePath}assets/templates/shared/chatbot.html?v=${Date.now()}`;
            console.log(`Loading chatbot: ${templatePath}`);
            
            const response = await fetch(templatePath);
            if (response.ok) {
                const html = await response.text();
                // Only add if not already present
                if (!document.getElementById('chatbot')) {
                    document.body.insertAdjacentHTML('beforeend', html);
                }
                
                // Dispatch event to notify that chatbot template is loaded
                document.dispatchEvent(new CustomEvent('templateLoaded', {
                    detail: { template: 'chatbot' }
                }));
                console.log('Successfully loaded chatbot template');
                return true;
            } else {
                // Try alternative path
                const altPath = `/assets/templates/shared/chatbot.html?v=${Date.now()}`;
                const altResponse = await fetch(altPath);
                if (altResponse.ok) {
                    const html = await altResponse.text();
                    if (!document.getElementById('chatbot')) {
                        document.body.insertAdjacentHTML('beforeend', html);
                    }
                    document.dispatchEvent(new CustomEvent('templateLoaded', {
                        detail: { template: 'chatbot' }
                    }));
                    console.log('Successfully loaded chatbot template with alternative path');
                    return true;
                }
            }
        } catch (error) {
            console.error('Chatbot loading error:', error);
        }
        return false;
    }
    
    static updateActiveNavLink() {
        const currentPage = window.location.pathname;
        const currentFile = currentPage.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            const linkFile = href.split('/').pop().replace('.html', '') || 'index';
            const currentFileClean = currentFile.replace('.html', '') || 'index';
            
            // Handle different page matches
            if (linkFile === currentFileClean) {
                link.classList.add('active');
            }
            // Handle root/home page specifically
            else if ((currentFileClean === 'index' || currentFileClean === '') && (linkFile === 'index' || href === './')) {
                link.classList.add('active');
            }
            // Handle blogs page and blog posts
            else if (currentPage.includes('/blogs') && linkFile === 'blogs') {
                link.classList.add('active');
            }
        });
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
        if (logoLink && logoLink.getAttribute('href') === './') {
            logoLink.setAttribute('href', '../');
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

// Export TemplateLoader for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TemplateLoader;
}
