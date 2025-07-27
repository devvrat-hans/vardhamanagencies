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
        await this.loadTemplate('../assets/templates/shared/navbar.html', '#header');
        // Update active nav link based on current page
        this.updateActiveNavLink();
        
        // Dispatch custom event to notify that navbar is loaded
        document.dispatchEvent(new CustomEvent('navbarLoaded'));
    }
    
    static async loadFooter() {
        await this.loadTemplate('../assets/templates/shared/footer.html', '#footer');
    }
    
    static async loadCTA() {
        await this.loadTemplate('../assets/templates/shared/cta.html', '#cta-placeholder');
    }
    
    static async loadScrollToTop() {
        try {
            const response = await fetch('../assets/templates/shared/scroll-to-top.html');
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
        try {
            const response = await fetch('../assets/templates/shared/chatbot.html');
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
            if (href === 'blogs.html' || href === '../blogs.html') {
                link.classList.add('active');
            }
        });
    }
    
    static async loadAllTemplates() {
        // Load critical templates first (navbar, chatbot, and scroll-to-top for immediate functionality)
        const criticalTemplates = [
            this.loadNavbar(),
            this.loadChatbot(),
            this.loadScrollToTop()
        ];
        
        // Load non-critical templates after critical ones
        const nonCriticalTemplates = [
            this.loadFooter(),
            this.loadCTA()
        ];
        
        // Load critical templates immediately
        await Promise.all(criticalTemplates);
        
        // Load non-critical templates with slight delay
        setTimeout(() => {
            Promise.all(nonCriticalTemplates);
        }, 100);
    }
    
    static initScrollToTop() {
        // This method is now handled by scroll-to-top.js
        // Kept for backward compatibility
    }
}

// Export for manual usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TemplateBlogLoader;
}
