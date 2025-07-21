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
        await this.loadTemplate('assets/templates/shared/navbar.html', '#header');
        // Update active nav link based on current page
        this.updateActiveNavLink();
    }
    
    static async loadFooter() {
        await this.loadTemplate('assets/templates/shared/footer.html', '#footer');
    }
    
    static async loadCTA() {
        await this.loadTemplate('assets/templates/shared/cta.html', '#cta-placeholder');
    }
    
    static updateActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
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
});
