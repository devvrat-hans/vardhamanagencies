// Contact page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize FAQ functionality immediately since it's in main HTML
    initializeFAQ();
    
    // Wait for templates to load for other functionality
    setTimeout(initializeContactPage, 200);
});

function initializeContactPage() {
    // Initialize form validation and submission
    initializeContactForm();
    
    // Re-initialize FAQ functionality to ensure it works
    initializeFAQ();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Check for product parameter from URL
    checkProductParameter();
    
    // Initialize form reset functionality
    initializeFormReset();
}

// Contact Form Handling
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('.form-submit');
    
    if (!form) return;
    
    // Real-time validation
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
    
    // Checkbox validation
    const checkboxes = form.querySelectorAll('.form-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => validateCheckbox(checkbox));
    });
    
    // Form submission
    form.addEventListener('submit', handleFormSubmission);
}

function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    
    clearFieldError(field);
    
    // Required field validation
    if (isRequired && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation (optional but if provided should be valid)
    if (fieldName === 'phone' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    // Name validation
    if ((fieldName === 'firstName' || fieldName === 'lastName') && value) {
        if (value.length < 2) {
            showFieldError(field, 'Name must be at least 2 characters long');
            return false;
        }
    }
    
    // Subject validation
    if (fieldName === 'subject' && value) {
        if (value.length < 5) {
            showFieldError(field, 'Subject must be at least 5 characters long');
            return false;
        }
    }
    
    // Message validation
    if (fieldName === 'message' && value) {
        if (value.length < 10) {
            showFieldError(field, 'Message must be at least 10 characters long');
            return false;
        }
    }
    
    showFieldSuccess(field);
    return true;
}

function validateCheckbox(checkbox) {
    const fieldName = checkbox.name;
    const isRequired = checkbox.hasAttribute('required');
    
    clearFieldError(checkbox);
    
    if (isRequired && !checkbox.checked) {
        showFieldError(checkbox, 'Please accept the terms and conditions');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group') || field.closest('.checkbox-label').parentElement;
    const errorElement = formGroup.querySelector('.form-error');
    
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('visible');
    }
}

function showFieldSuccess(field) {
    const formGroup = field.closest('.form-group');
    if (formGroup) {
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
    }
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group') || field.closest('.checkbox-label').parentElement;
    const errorElement = formGroup.querySelector('.form-error');
    
    formGroup.classList.remove('error', 'success');
    
    if (errorElement) {
        errorElement.classList.remove('visible');
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.form-submit');
    const formData = new FormData(form);
    
    // Validate all fields
    let isValid = true;
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    const checkboxes = form.querySelectorAll('.form-checkbox[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    checkboxes.forEach(checkbox => {
        if (!validateCheckbox(checkbox)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showToast('Please fix the errors in the form before submitting.', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate form submission
    submitForm(formData)
        .then(response => {
            showToast('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
            form.reset();
            clearAllFieldStates(form);
        })
        .catch(error => {
            showToast('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
        })
        .finally(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        });
}

function submitForm(formData) {
    // Simulate API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success (in real implementation, this would be an actual API call)
            const success = Math.random() > 0.1; // 90% success rate for demo
            
            if (success) {
                resolve({ status: 'success', message: 'Form submitted successfully' });
            } else {
                reject(new Error('Submission failed'));
            }
        }, 2000);
    });
}

function clearAllFieldStates(form) {
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error', 'success');
        const errorElement = group.querySelector('.form-error');
        if (errorElement) {
            errorElement.classList.remove('visible');
        }
    });
}

// FAQ Functionality
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length === 0) {
        console.log('No FAQ questions found');
        return;
    }
    
    console.log('Initializing FAQ with', faqQuestions.length, 'questions');
    
    faqQuestions.forEach((question, index) => {
        // Remove any existing event listeners
        question.replaceWith(question.cloneNode(true));
        const newQuestion = document.querySelectorAll('.faq-question')[index];
        
        newQuestion.addEventListener('click', (e) => {
            e.preventDefault();
            
            const faqId = newQuestion.getAttribute('data-faq');
            const answer = document.querySelector(`.faq-answer[data-faq="${faqId}"]`);
            const faqItem = newQuestion.closest('.faq-item');
            const isActive = newQuestion.classList.contains('active');
            
            console.log('FAQ clicked:', faqId, 'Active:', isActive);
            
            // Close all other FAQs
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.closest('.faq-item').classList.remove('active');
            });
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('active');
            });
            
            // Toggle current FAQ
            if (!isActive) {
                newQuestion.classList.add('active');
                faqItem.classList.add('active');
                if (answer) {
                    answer.classList.add('active');
                    console.log('FAQ opened:', faqId);
                } else {
                    console.log('Answer not found for FAQ:', faqId);
                }
            }
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.contact-method, .sidebar-card, .faq-item, .contact-form-content'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Check for product parameter in URL
function checkProductParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    
    if (product) {
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');
        const inquiryTypeField = document.getElementById('inquiryType');
        const productInterestField = document.getElementById('productInterest');
        
        // Map product names to form values
        const productMapping = {
            'Bubble Wrap Rolls': 'bubble-wrap',
            'Stretch Films': 'stretch-films',
            'bubble-wrap': 'bubble-wrap',
            'stretch-films': 'stretch-films'
        };
        
        const productValue = productMapping[product] || product.toLowerCase().replace(/\s+/g, '-');
        
        if (subjectField) {
            subjectField.value = `Inquiry about ${product}`;
        }
        
        if (messageField) {
            messageField.value = `I'm interested in learning more about ${product}. Please provide more information including pricing and availability.`;
        }
        
        if (inquiryTypeField) {
            inquiryTypeField.value = 'product-quote';
        }
        
        if (productInterestField) {
            // Set the product interest field based on the product parameter
            if (productValue === 'bubble-wrap' || productValue.includes('bubble')) {
                productInterestField.value = 'bubble-wrap';
            } else if (productValue === 'stretch-films' || productValue.includes('stretch')) {
                productInterestField.value = 'stretch-films';
            }
        }
        
        // Scroll to form
        setTimeout(() => {
            document.querySelector('.contact-form-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 500);
    }
}

// Form Reset Functionality
function initializeFormReset() {
    const resetBtn = document.querySelector('.form-reset');
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            const form = document.getElementById('contact-form');
            if (form) {
                form.reset();
                clearAllFieldStates(form);
                showToast('Form has been cleared.', 'info');
            }
        });
    }
}

// Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
        <div class="toast__content">
            <div class="toast__icon">
                ${getToastIcon(type)}
            </div>
            <span class="toast__message">${message}</span>
            <button class="toast__close" aria-label="Close">×</button>
        </div>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getToastColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = toast.querySelector('.toast__close');
    closeBtn.addEventListener('click', () => {
        closeToast(toast);
    });
    
    // Auto close based on type
    const autoCloseTime = type === 'error' ? 8000 : 5000;
    setTimeout(() => {
        closeToast(toast);
    }, autoCloseTime);
}

function getToastIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };
    return icons[type] || icons.info;
}

function getToastColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    return colors[type] || colors.info;
}

function closeToast(toast) {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 300);
}

// Track interactions for analytics
function trackInteractions() {
    // Track FAQ clicks
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqText = question.querySelector('span').textContent;
            console.log('FAQ clicked:', faqText);
        });
    });
    
    // Track sidebar button clicks
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const btnText = btn.textContent.trim();
            console.log('Sidebar button clicked:', btnText);
        });
    });
    
    // Track contact method clicks
    document.querySelectorAll('.contact-link').forEach(link => {
        link.addEventListener('click', () => {
            const linkText = link.textContent.trim();
            console.log('Contact link clicked:', linkText);
        });
    });
}

// Initialize interaction tracking
trackInteractions();

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in-up {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .toast__content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
    }
    
    .toast__icon {
        font-weight: bold;
        font-size: 1.1rem;
    }
    
    .toast__message {
        flex: 1;
        font-size: 0.9rem;
        line-height: 1.4;
    }
    
    .toast__close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.8;
        transition: opacity 0.2s ease;
    }
    
    .toast__close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);
