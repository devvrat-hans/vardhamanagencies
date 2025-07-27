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
        }
    }
    
    static async loadNavbar() {
        await this.loadTemplate('/assets/templates/shared/navbar.html', '#header');
        
        // Wait a bit for DOM to be fully updated
        setTimeout(() => {
            // Update active nav link based on current page
            this.updateActiveNavLink();
            
            // Dispatch custom event to notify that navbar is loaded
            document.dispatchEvent(new CustomEvent('navbarLoaded'));
        }, 100);
    }
    
    static async loadFooter() {
        await this.loadTemplate('/assets/templates/shared/footer.html', '#footer');
    }
    
    static async loadCTA() {
        await this.loadTemplate('/assets/templates/shared/cta.html', '#cta-placeholder');
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
        }
    }
    
    static updateActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            // Extract filename from href (remove ../ prefix)
            const linkPage = href.replace('../', '').replace('./', '');
            
            // Check for exact match
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
            // Check for index page (empty path or index.html)
            else if ((currentPage === '' || currentPage === 'index.html') && (linkPage === 'index.html' || linkPage === '')) {
                link.classList.add('active');
            }
            // Check for blogs page and blog posts
            else if (currentPage.includes('blog') && linkPage === 'blogs.html') {
                link.classList.add('active');
            }
        });
    }
}

// Initialize templates when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await TemplateLoader.loadNavbar();
    await TemplateLoader.loadCTA();
    await TemplateLoader.loadFooter();
    await TemplateLoader.loadScrollToTop();
    await TemplateLoader.loadChatbot();
});
