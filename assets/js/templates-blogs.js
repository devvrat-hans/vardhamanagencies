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
        await this.loadTemplate('/assets/templates/shared/navbar.html', '#header');
        
        // Update active nav link based on current page
        this.updateActiveNavLink();
        
        // Dispatch custom event to notify that navbar is loaded
        document.dispatchEvent(new CustomEvent('navbarLoaded'));
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
