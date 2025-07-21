// Products page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Wait for templates to load
    setTimeout(initializeProductsPage, 200);
});

function initializeProductsPage() {
    initializeFiltering();
    initializeSorting();
    initializeQuoteFunctionality();
    initializeCategoryCards();
}

// Product Filtering
function initializeFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-filter');
            filterProducts(category, productCards);
        });
    });
}

function filterProducts(category, productCards) {
    productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.classList.remove('hidden');
            
            // Add animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                card.style.display = 'none';
                card.classList.add('hidden');
            }, 200);
        }
    });
}

// Product Sorting
function initializeSorting() {
    const sortSelect = document.querySelector('.sort-select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sortValue = e.target.value;
            sortProducts(sortValue);
        });
    }
}

function sortProducts(sortBy) {
    const productsGrid = document.getElementById('products-grid');
    const products = Array.from(productsGrid.children);
    
    products.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                const nameA = a.querySelector('.product-card__title').textContent;
                const nameB = b.querySelector('.product-card__title').textContent;
                return nameA.localeCompare(nameB);
            case 'featured':
            default:
                return 0;
        }
    });
    
    // Re-append sorted products
    products.forEach(product => {
        productsGrid.appendChild(product);
    });
}

// Quote Functionality (replaces cart functionality)
function initializeQuoteFunctionality() {
    const getQuoteButtons = document.querySelectorAll('.btn--primary[href="contact.html"]');
    
    getQuoteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('.product-card__title').textContent;
            getQuote(productName);
        });
    });
}

function getQuote(productName) {
    // Redirect to contact page with product name
    const contactUrl = `contact.html?product=${encodeURIComponent(productName)}`;
    window.location.href = contactUrl;
}

// Category Cards
function initializeCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            
            // Update filter buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-filter') === category) {
                    btn.classList.add('active');
                }
            });
            
            // Filter products
            filterProducts(category, productCards);
            
            // Scroll to products section
            document.querySelector('.products-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Toast notification system
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="closeToast(this.parentElement.parentElement)">×</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        closeToast(toast);
    }, 3000);
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

// Product Filtering
function initializeFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Get filter category
            const filterCategory = button.getAttribute('data-filter');
            
            // Filter products
            filterProducts(filterCategory, productCards);
        });
    });
}

function filterProducts(category, productCards) {
    productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.classList.remove('hidden');
            
            // Add animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                card.style.display = 'none';
                card.classList.add('hidden');
            }, 200);
        }
    });
}

// Product Sorting
function initializeSorting() {
    const sortSelect = document.querySelector('.sort-select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sortValue = e.target.value;
            sortProducts(sortValue);
        });
    }
}

function sortProducts(sortBy) {
    const productsGrid = document.getElementById('products-grid');
    const productCards = Array.from(productsGrid.querySelectorAll('.product-card:not(.hidden)'));
    
    productCards.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                const nameA = a.querySelector('.product-card__title').textContent.toLowerCase();
                const nameB = b.querySelector('.product-card__title').textContent.toLowerCase();
                return nameA.localeCompare(nameB);
                
            case 'price-low':
                const priceA = parseFloat(a.querySelector('.price').textContent.replace('₹', '').replace(',', ''));
                const priceB = parseFloat(b.querySelector('.price').textContent.replace('₹', '').replace(',', ''));
                return priceA - priceB;
                
            case 'price-high':
                const priceHighA = parseFloat(a.querySelector('.price').textContent.replace('₹', '').replace(',', ''));
                const priceHighB = parseFloat(b.querySelector('.price').textContent.replace('₹', '').replace(',', ''));
                return priceHighB - priceHighA;
                
            default: // featured
                return 0;
        }
    });
    
    // Re-append sorted cards
    productCards.forEach(card => {
        productsGrid.appendChild(card);
    });
}

// Add to Cart Functionality
function initializeCartFunctionality() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const getQuoteButtons = document.querySelectorAll('.get-quote');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.getAttribute('data-product');
            addToCart(productId, button);
        });
    });
    
    getQuoteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('.product-card__title').textContent;
            getQuote(productName);
        });
    });
}

function addToCart(productId, button) {
    // Get product details
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.product-card__title').textContent;
    const productPrice = productCard.querySelector('.price').textContent;
    
    // Add loading state
    button.classList.add('loading');
    button.textContent = 'Adding...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Store in localStorage (simple cart implementation)
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Reset button
        button.classList.remove('loading');
        button.textContent = 'Added!';
        button.style.backgroundColor = '#10b981';
        
        // Show success message
        showToast('Product added to cart successfully!', 'success');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.disabled = false;
            button.style.backgroundColor = '';
        }, 2000);
        
    }, 1000);
}

function getQuote(productName) {
    // Redirect to contact page with product name
    const contactUrl = `contact.html?product=${encodeURIComponent(productName)}`;
    window.location.href = contactUrl;
}

// Load More Functionality
function initializeLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            loadMoreProducts();
        });
    }
}

function loadMoreProducts() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    loadMoreBtn.textContent = 'Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate loading more products
    setTimeout(() => {
        // In a real app, you would fetch more products from an API
        showToast('All products have been loaded!', 'info');
        loadMoreBtn.style.display = 'none';
    }, 1500);
}

// Category Cards
function initializeCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            
            // Update active category card
            categoryCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            // Update corresponding filter button
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-filter') === category) {
                    btn.classList.add('active');
                }
            });
            
            // Filter products
            const productCards = document.querySelectorAll('.product-card');
            filterProducts(category, productCards);
            
            // Scroll to products section
            document.querySelector('.products-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
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
            <span class="toast__message">${message}</span>
            <button class="toast__close" aria-label="Close">×</button>
        </div>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
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
    
    // Auto close after 5 seconds
    setTimeout(() => {
        closeToast(toast);
    }, 5000);
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

// Initialize cart count display (if needed)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update cart badge if it exists
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// Call this on page load
updateCartCount();
