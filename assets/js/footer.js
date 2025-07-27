// Footer functionality
document.addEventListener('DOMContentLoaded', () => {
    // Newsletter form submission
    setTimeout(() => {
        const newsletterForm = document.querySelector('.footer__newsletter-form');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = newsletterForm.querySelector('.footer__newsletter-input');
                const email = emailInput.value.trim();
                
                if (email) {
                    // Simulate newsletter subscription
                    alert('Thank you for subscribing to our newsletter!');
                    emailInput.value = '';
                } else {
                    alert('Please enter a valid email address.');
                }
            });
        }
        
        // Social media link tracking (optional)
        const socialLinks = document.querySelectorAll('.footer__social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // You can add actual social media links here
            });
        });
    }, 100); // Small delay to ensure templates are loaded
});
