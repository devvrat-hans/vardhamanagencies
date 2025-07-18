// Navbar functionality
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    setTimeout(() => {
        const menuToggle = document.querySelector('.header__menu-toggle');
        const nav = document.querySelector('.header__nav');
        
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.header__nav') && !e.target.closest('.header__menu-toggle')) {
                nav?.classList.remove('active');
                menuToggle?.classList.remove('active');
            }
        });
        
        // Close mobile menu when window is resized
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                nav?.classList.remove('active');
                menuToggle?.classList.remove('active');
            }
        });
    }, 100); // Small delay to ensure templates are loaded
});
