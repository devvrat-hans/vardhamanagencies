// Cart Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Load templates first
    setTimeout(() => {
        loadTemplates();
        initializeCart();
    }, 100);
});

// Cart data structure
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Product data for reference
const productData = {
    'small-bubble-rolls': {
        name: 'Small Bubble Wrap Rolls',
        price: 850,
        sku: 'SBR-001',
        image: 'Small Bubble'
    },
    'medium-bubble-rolls': {
        name: 'Medium Bubble Wrap Rolls',
        price: 1200,
        sku: 'MBR-002',
        image: 'Medium Bubble'
    },
    'large-bubble-rolls': {
        name: 'Large Bubble Wrap Rolls',
        price: 1800,
        sku: 'LBR-003',
        image: 'Large Bubble'
    },
    'anti-static-bags': {
        name: 'Anti-Static Bubble Bags',
        price: 750,
        sku: 'ASB-004',
        image: 'Anti-Static'
    },
    'packaging-tape': {
        name: 'Packaging Tape',
        price: 350,
        sku: 'PT-005',
        image: 'Packaging Tape'
    },
    'air-cushions': {
        name: 'Air Cushion Packaging',
        price: 650,
        sku: 'ACP-006',
        image: 'Air Cushions'
    }
};

// Promo codes
const promoCodes = {
    'WELCOME10': { discount: 10, type: 'percentage', description: '10% off your first order' },
    'BULK20': { discount: 20, type: 'percentage', description: '20% off bulk orders' },
    'SAVE500': { discount: 500, type: 'fixed', description: '₹500 off your order' }
};

let appliedPromo = null;

// Initialize cart functionality
function initializeCart() {
    updateCartDisplay();
    setupEventListeners();
    updateCartSummary();
}

// Setup event listeners
function setupEventListeners() {
    // Clear cart button
    document.getElementById('clear-cart').addEventListener('click', clearCart);
    
    // Update cart button
    document.getElementById('update-cart').addEventListener('click', updateCart);
    
    // Proceed to checkout
    document.getElementById('proceed-checkout').addEventListener('click', proceedToCheckout);
    
    // Get custom quote
    document.getElementById('get-quote').addEventListener('click', getCustomQuote);
    
    // Promo code
    document.getElementById('apply-promo').addEventListener('click', applyPromoCode);
    document.getElementById('promo-code').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            applyPromoCode();
        }
    });
    
    // Recommended products
    document.querySelectorAll('.add-recommended').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.closest('.recommended-item').dataset.product;
            addRecommendedProduct(productId);
        });
    });
}

// Update cart display
function updateCartDisplay() {
    const emptyCart = document.getElementById('empty-cart');
    const cartItems = document.getElementById('cart-items');
    const cartActions = document.getElementById('cart-actions');
    
    if (cart.length === 0) {
        emptyCart.classList.add('show');
        cartItems.classList.remove('show');
        cartActions.classList.remove('show');
    } else {
        emptyCart.classList.remove('show');
        cartItems.classList.add('show');
        cartActions.classList.add('show');
        renderCartItems();
    }
}

// Render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        const product = productData[item.id];
        if (!product) return;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item__image">
                <div class="product-placeholder">${product.image}</div>
            </div>
            <div class="cart-item__details">
                <h3 class="cart-item__title">${product.name}</h3>
                <p class="cart-item__sku">SKU: ${product.sku}</p>
                <p class="cart-item__price">₹${product.price.toLocaleString()}</p>
            </div>
            <div class="cart-item__quantity">
                <button class="quantity-btn" onclick="updateQuantity(${index}, ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 13H5v-2h14v2z"/>
                    </svg>
                </button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="999" 
                       onchange="updateQuantity(${index}, this.value)">
                <button class="quantity-btn" onclick="updateQuantity(${index}, ${item.quantity + 1})">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                </button>
            </div>
            <button class="cart-item__remove" onclick="removeFromCart(${index})" title="Remove item">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
}

// Update quantity
function updateQuantity(index, newQuantity) {
    newQuantity = parseInt(newQuantity);
    if (newQuantity < 1) newQuantity = 1;
    if (newQuantity > 999) newQuantity = 999;
    
    cart[index].quantity = newQuantity;
    saveCart();
    updateCartDisplay();
    updateCartSummary();
    
    showToast('Quantity updated successfully', 'success');
}

// Remove from cart
function removeFromCart(index) {
    const product = productData[cart[index].id];
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
    updateCartSummary();
    updateCartCount();
    
    showToast(`${product.name} removed from cart`, 'success');
}

// Clear cart
function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('Are you sure you want to clear all items from your cart?')) {
        cart = [];
        saveCart();
        updateCartDisplay();
        updateCartSummary();
        updateCartCount();
        appliedPromo = null;
        document.getElementById('promo-code').value = '';
        document.getElementById('promo-message').classList.remove('success', 'error');
        
        showToast('Cart cleared successfully', 'success');
    }
}

// Update cart
function updateCart() {
    showToast('Cart updated successfully', 'success');
}

// Update cart summary
function updateCartSummary() {
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping(subtotal);
    const tax = calculateTax(subtotal);
    const discount = calculateDiscount(subtotal);
    const total = subtotal + shipping + tax - discount;
    
    document.getElementById('cart-subtotal').textContent = `₹${subtotal.toLocaleString()}`;
    document.getElementById('cart-shipping').textContent = shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`;
    document.getElementById('cart-tax').textContent = `₹${tax.toLocaleString()}`;
    document.getElementById('cart-total').textContent = `₹${total.toLocaleString()}`;
}

// Calculate subtotal
function calculateSubtotal() {
    return cart.reduce((total, item) => {
        const product = productData[item.id];
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

// Calculate shipping
function calculateShipping(subtotal) {
    return subtotal >= 2000 ? 0 : 0; // Free shipping for all orders
}

// Calculate tax (18% GST)
function calculateTax(subtotal) {
    return Math.round(subtotal * 0.18);
}

// Calculate discount
function calculateDiscount(subtotal) {
    if (!appliedPromo) return 0;
    
    const promo = promoCodes[appliedPromo];
    if (!promo) return 0;
    
    if (promo.type === 'percentage') {
        return Math.round(subtotal * (promo.discount / 100));
    } else if (promo.type === 'fixed') {
        return Math.min(promo.discount, subtotal);
    }
    
    return 0;
}

// Apply promo code
function applyPromoCode() {
    const promoCode = document.getElementById('promo-code').value.trim().toUpperCase();
    const promoMessage = document.getElementById('promo-message');
    
    if (!promoCode) {
        showPromoMessage('Please enter a promo code', 'error');
        return;
    }
    
    if (promoCodes[promoCode]) {
        appliedPromo = promoCode;
        updateCartSummary();
        showPromoMessage(`Promo code applied: ${promoCodes[promoCode].description}`, 'success');
        showToast('Promo code applied successfully', 'success');
    } else {
        showPromoMessage('Invalid promo code', 'error');
    }
}

// Show promo message
function showPromoMessage(message, type) {
    const promoMessage = document.getElementById('promo-message');
    promoMessage.textContent = message;
    promoMessage.className = `promo-message ${type}`;
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }
    
    // Save applied promo to localStorage
    if (appliedPromo) {
        localStorage.setItem('appliedPromo', appliedPromo);
    }
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// Get custom quote
function getCustomQuote() {
    if (cart.length === 0) {
        showToast('Add items to cart to get a quote', 'error');
        return;
    }
    
    // Create quote request email
    const cartItems = cart.map(item => {
        const product = productData[item.id];
        return `${product.name} (${product.sku}) - Quantity: ${item.quantity}`;
    }).join('\n');
    
    const emailSubject = 'Custom Quote Request - Vardhaman Agencies';
    const emailBody = `Hello,\n\nI would like to request a custom quote for the following items:\n\n${cartItems}\n\nPlease provide your best pricing and delivery terms.\n\nThank you!`;
    
    const mailtoLink = `mailto:sales@vardhamanagencies.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
}

// Add recommended product
function addRecommendedProduct(productId) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    
    saveCart();
    updateCartDisplay();
    updateCartSummary();
    updateCartCount();
    
    const product = productData[productId];
    showToast(`${product.name} added to cart`, 'success');
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count in navbar
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
        element.style.display = cartCount > 0 ? 'block' : 'none';
    });
}

// Show toast notification
function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconPath = type === 'success' 
        ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        : type === 'error'
        ? 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
        : 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z';
    
    toast.innerHTML = `
        <div class="toast-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="${iconPath}"/>
            </svg>
        </div>
        <div class="toast-message">${message}</div>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Load templates
function loadTemplates() {
    const headerElement = document.getElementById('header');
    const footerElement = document.getElementById('footer');
    
    if (typeof loadTemplate === 'function') {
        loadTemplate('navbar', 'header');
        loadTemplate('footer', 'footer');
    } else {
        // Fallback if templates.js not loaded
        console.warn('Templates.js not loaded, using fallback');
        
        // Load navbar
        fetch('assets/templates/shared/navbar.html')
            .then(response => response.text())
            .then(html => {
                headerElement.innerHTML = html;
                if (typeof initializeNavbar === 'function') {
                    initializeNavbar();
                }
                updateCartCount();
            })
            .catch(error => console.error('Error loading navbar:', error));
        
        // Load footer
        fetch('assets/templates/shared/footer.html')
            .then(response => response.text())
            .then(html => {
                footerElement.innerHTML = html;
                if (typeof initializeFooter === 'function') {
                    initializeFooter();
                }
            })
            .catch(error => console.error('Error loading footer:', error));
    }
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(updateCartCount, 200);
});

// Handle page visibility change to update cart from localStorage
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
        if (JSON.stringify(cart) !== JSON.stringify(updatedCart)) {
            cart = updatedCart;
            updateCartDisplay();
            updateCartSummary();
            updateCartCount();
        }
    }
});

// Global functions for inline event handlers
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
