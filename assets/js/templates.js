// Template loader utility
class TemplateLoader {
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
            console.error('Template loading error:', error);
        }
    }
    
    static async loadNavbar() {
        // Determine the correct path based on current directory
        const currentPath = window.location.pathname;
        const isInSubdirectory = currentPath.includes('/blogs/');
        const templatePath = isInSubdirectory ? '../assets/templates/shared/navbar.html' : '/assets/templates/shared/navbar.html';
        
        await this.loadTemplate(templatePath, '#header');
        
        // Wait a bit for DOM to be fully updated
        setTimeout(() => {
            // Update active nav link based on current page
            this.updateActiveNavLink();
            
            // Update navbar links for subdirectory if needed
            if (isInSubdirectory) {
                this.updateNavbarForSubdirectory();
            }
            
            // Dispatch custom event to notify that navbar is loaded
            document.dispatchEvent(new CustomEvent('navbarLoaded'));
        }, 100);
    }
    
    static async loadFooter() {
        // Determine the correct path based on current directory
        const currentPath = window.location.pathname;
        const isInSubdirectory = currentPath.includes('/blogs/');
        const templatePath = isInSubdirectory ? '../assets/templates/shared/footer.html' : '/assets/templates/shared/footer.html';
        
        await this.loadTemplate(templatePath, '#footer');
        
        // Update footer links based on current directory
        if (isInSubdirectory) {
            this.updateFooterForSubdirectory();
        }
    }
    
    static async loadCTA() {
        const currentPath = window.location.pathname;
        const isInSubdirectory = currentPath.includes('/blogs/');
        const templatePath = isInSubdirectory ? '../assets/templates/shared/cta.html' : '/assets/templates/shared/cta.html';
        
        await this.loadTemplate(templatePath, '#cta-placeholder');
    }
    
    static async loadScrollToTop() {
        // Load the scroll-to-top button into the body
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
        // Load the chatbot into the body
        try {
            const response = await fetch(`/assets/templates/shared/chatbot.html?v=${Date.now()}`);
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
            }
        } catch (error) {
            console.error('Chatbot loading error:', error);
        }
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
            else if ((currentPage === '/' || currentPage === '/index' || currentPage === '/index.html') && href === '/') {
                link.classList.add('active');
            }
            // Handle blogs page and blog posts
            else if ((currentPage === '/blogs' || currentPage === '/blogs.html' || currentPage.includes('/blogs/')) && href === '/blogs') {
                link.classList.add('active');
            }
            // Handle other pages
            else if (currentPage.includes(href.replace('/', '')) && href !== '/') {
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

// Export TemplateLoader for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TemplateLoader;
}
