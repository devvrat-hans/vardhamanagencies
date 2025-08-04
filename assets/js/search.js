// Search functionality for Vardhaman Agencies

class ProductSearch {
    constructor() {
        this.products = [
            {
                id: 1,
                name: "Bubble Wrap Rolls",
                description: "High-quality bubble wrap for safe packaging and protection",
                image: "/assets/images/products/bubble-warp-rolls.png",
                category: "bubble-wrap",
                keywords: ["bubble", "wrap", "protection", "packaging", "air", "cushioning"]
            },
            {
                id: 2,
                name: "Stretch Film",
                description: "Durable stretch film for secure packaging and palletizing",
                image: "/assets/images/products/strech-film.png",
                category: "stretch-film",
                keywords: ["stretch", "film", "wrap", "pallet", "secure", "packaging"]
            },
            {
                id: 3,
                name: "Small Bubble Wrap",
                description: "Small bubble size for delicate item protection",
                image: "/assets/images/products/bubble-warp-rolls.png",
                category: "bubble-wrap",
                keywords: ["small", "bubble", "delicate", "protection", "packaging"]
            },
            {
                id: 4,
                name: "Large Bubble Wrap",
                description: "Large bubble size for maximum cushioning protection",
                image: "/assets/images/products/bubble-warp-rolls.png",
                category: "bubble-wrap",
                keywords: ["large", "bubble", "cushioning", "protection", "heavy", "items"]
            },
            {
                id: 5,
                name: "Clear Stretch Film",
                description: "Transparent stretch film for visible content identification",
                image: "/assets/images/products/strech-film.png",
                category: "stretch-film",
                keywords: ["clear", "transparent", "stretch", "film", "visible", "packaging"]
            },
            {
                id: 6,
                name: "Colored Stretch Film",
                description: "Colored stretch film for color-coded packaging systems",
                image: "/assets/images/products/strech-film.png",
                category: "stretch-film",
                keywords: ["colored", "color", "stretch", "film", "coding", "identification"]
            }
        ];

        this.searchModal = null;
        this.searchInput = null;
        this.searchResults = null;
        this.searchToggle = null;
        this.searchClose = null;

        this.init();
    }

    init() {
        // Try to setup elements immediately
        this.trySetupElements();
        
        // Listen for navbar loaded event
        document.addEventListener('navbarLoaded', () => {
            setTimeout(() => {
                this.setupElements();
            }, 50);
        });
        
        // Also listen for DOMContentLoaded as fallback
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    this.trySetupElements();
                }, 50);
            });
        } else {
            setTimeout(() => {
                this.trySetupElements();
            }, 50);
        }
        
        // Enhanced retry mechanism for deployed sites with more aggressive polling
        let retryCount = 0;
        const maxRetries = 20;
        const retryInterval = setInterval(() => {
            retryCount++;
            if (retryCount >= maxRetries) {
                clearInterval(retryInterval);
                // Final attempt with fallback creation
                this.ensureSearchFunctionality();
                return;
            }
            
            if (!this.searchModal && document.getElementById('searchModal')) {
                this.setupElements();
                clearInterval(retryInterval);
            } else if (!this.searchModal && retryCount > 10) {
                // After 10 retries, try to create the search elements
                this.createSearchElementsIfMissing();
            }
        }, 150);
    }

    trySetupElements() {
        // Check if elements exist and setup if they do
        if (document.getElementById('searchModal')) {
            this.setupElements();
        }
    }

    createSearchElementsIfMissing() {
        // If search modal doesn't exist, check if we can add it to the page
        if (!document.getElementById('searchModal')) {
            const header = document.querySelector('#header');
            if (header && !header.querySelector('#searchModal')) {
                // Add search modal to header if it's missing
                const searchModalHTML = `
                    <!-- Search Modal -->
                    <div class="search-modal" id="searchModal">
                        <div class="search-modal__backdrop"></div>
                        <div class="search-modal__content">
                            <div class="search-modal__header">
                                <div class="search-input-container">
                                    <svg class="search-input-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                    </svg>
                                    <input type="text" class="search-input" placeholder="Search products..." autocomplete="off" spellcheck="false">
                                    <button class="search-close" aria-label="Close search">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="search-modal__body">
                                <div class="search-results" id="searchResults">
                                    <div class="search-placeholder">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                        </svg>
                                        <h3>Search Products</h3>
                                        <p>Start typing to search for bubble wrap rolls, stretch films, and packaging materials.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                header.insertAdjacentHTML('beforeend', searchModalHTML);
            }
            
            // Also ensure search toggle button exists
            if (!document.querySelector('.search-toggle')) {
                const headerActions = document.querySelector('.header__actions');
                if (headerActions && !headerActions.querySelector('.search-toggle')) {
                    const searchToggleHTML = `
                        <button class="header__action-btn search-toggle" aria-label="Search">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                            </svg>
                        </button>
                    `;
                    headerActions.insertAdjacentHTML('afterbegin', searchToggleHTML);
                }
            }
            
            // Try setup again after adding elements
            setTimeout(() => {
                this.setupElements();
            }, 100);
        }
    }

    addSearchButtonToPage() {
        // Try to find header actions or navbar to add search button
        const headerActions = document.querySelector('.header__actions');
        const headerContainer = document.querySelector('.header__container');
        const header = document.querySelector('#header, header');
        
        if (headerActions) {
            // Add search button to existing header actions
            const searchButton = document.createElement('button');
            searchButton.className = 'header__action-btn search-toggle';
            searchButton.setAttribute('aria-label', 'Search');
            searchButton.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
            `;
            headerActions.insertBefore(searchButton, headerActions.firstChild);
        } else if (headerContainer) {
            // Create header actions if they don't exist
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'header__actions';
            actionsDiv.innerHTML = `
                <button class="header__action-btn search-toggle" aria-label="Search">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                </button>
            `;
            headerContainer.appendChild(actionsDiv);
        } else if (header) {
            // Add a floating search button as last resort
            const searchButton = document.createElement('button');
            searchButton.className = 'floating-search-btn';
            searchButton.setAttribute('aria-label', 'Search');
            searchButton.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: #004BB8;
                color: white;
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0, 75, 184, 0.3);
                transition: all 0.3s ease;
            `;
            searchButton.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor" style="width: 24px; height: 24px;">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
            `;
            
            // Add hover effect
            searchButton.addEventListener('mouseenter', () => {
                searchButton.style.transform = 'scale(1.1)';
                searchButton.style.background = '#1a5cc8';
            });
            searchButton.addEventListener('mouseleave', () => {
                searchButton.style.transform = 'scale(1)';
                searchButton.style.background = '#004BB8';
            });
            
            document.body.appendChild(searchButton);
        }
    }

    ensureSearchFunctionality() {
        // Final fallback - ensure search works even if templates fail
        if (!document.getElementById('searchModal')) {
            
            // Create the search modal if it doesn't exist
            if (!document.querySelector('.search-modal')) {
                const body = document.body;
                const searchModalHTML = `
                    <div class="search-modal" id="searchModal">
                        <div class="search-modal__backdrop"></div>
                        <div class="search-modal__content">
                            <div class="search-modal__header">
                                <div class="search-input-container">
                                    <svg class="search-input-icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                    </svg>
                                    <input type="text" class="search-input" placeholder="Search products..." autocomplete="off" spellcheck="false">
                                    <button class="search-close" aria-label="Close search">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="search-modal__body">
                                <div class="search-results" id="searchResults">
                                    <div class="search-placeholder">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                        </svg>
                                        <h3>Search Products</h3>
                                        <p>Start typing to search for bubble wrap rolls, stretch films, and packaging materials.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                body.insertAdjacentHTML('beforeend', searchModalHTML);
            }
            
            // Add search functionality to any existing search buttons
            document.addEventListener('click', (e) => {
                if (e.target.closest('.search-toggle') || e.target.closest('[aria-label="Search"]')) {
                    e.preventDefault();
                    if (this.searchModal) {
                        this.openModal();
                    } else {
                        this.setupElements();
                        setTimeout(() => {
                            if (this.searchModal) {
                                this.openModal();
                            }
                        }, 50);
                    }
                }
            });
            
            // Setup elements after creating fallback
            this.setupElements();
        }
    }

    setupElements() {
        this.searchModal = document.getElementById('searchModal');
        this.searchInput = document.querySelector('.search-input');
        this.searchResults = document.getElementById('searchResults');
        this.searchToggle = document.querySelector('.search-toggle');
        this.searchClose = document.querySelector('.search-close');

        // Check if all elements are found
        const elementsFound = {
            searchModal: !!this.searchModal,
            searchInput: !!this.searchInput,
            searchResults: !!this.searchResults,
            searchToggle: !!this.searchToggle,
            searchClose: !!this.searchClose
        };

        // Only bind events if all required elements are present
        if (Object.values(elementsFound).every(found => found)) {
            this.bindEvents();
            // Initialize with placeholder content
            this.showPlaceholder();
        } else {
            // Log missing elements for debugging
            const missingElements = Object.entries(elementsFound)
                .filter(([, found]) => !found)
                .map(([element]) => element);
            
            if (missingElements.length > 0) {
                // Try to add missing elements if possible
                if (!this.searchToggle) {
                    this.addSearchButtonToPage();
                }
            }
        }
    }

    bindEvents() {
        // Open search modal
        this.searchToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal();
        });

        // Close search modal
        this.searchClose.addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking backdrop
        this.searchModal.querySelector('.search-modal__backdrop').addEventListener('click', () => {
            this.closeModal();
        });

        // Handle search input
        this.searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Open search with Ctrl/Cmd + K
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openModal();
            }
            
            // Close search with Escape
            if (e.key === 'Escape' && this.isModalOpen()) {
                this.closeModal();
            }
        });
    }

    openModal() {
        this.searchModal.classList.add('active');
        document.body.classList.add('search-modal-open');
        
        // Focus the search input after animation
        setTimeout(() => {
            this.searchInput.focus();
        }, 100);
    }

    closeModal() {
        this.searchModal.classList.remove('active');
        document.body.classList.remove('search-modal-open');
        this.searchInput.value = '';
        this.showPlaceholder();
    }

    isModalOpen() {
        return this.searchModal.classList.contains('active');
    }

    handleSearch(query) {
        const trimmedQuery = query.trim().toLowerCase();
        
        if (trimmedQuery.length === 0) {
            this.showPlaceholder();
            return;
        }

        if (trimmedQuery.length < 2) {
            this.showNoResults('Please enter at least 2 characters to search');
            return;
        }

        const results = this.searchProducts(trimmedQuery);
        
        if (results.length === 0) {
            this.showNoResults(`No products found for "${query}"`);
        } else {
            this.showResults(results);
        }
    }

    searchProducts(query) {
        return this.products.filter(product => {
            const searchableText = [
                product.name,
                product.description,
                product.category,
                ...product.keywords
            ].join(' ').toLowerCase();

            return searchableText.includes(query);
        }).slice(0, 6); // Limit to 6 results
    }

    showPlaceholder() {
        this.searchResults.innerHTML = `
            <div class="search-placeholder">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <h3>Search Products</h3>
                <p>Start typing to search for bubble wrap rolls, stretch films, and packaging materials.</p>
            </div>
        `;
    }

    showNoResults(message) {
        this.searchResults.innerHTML = `
            <div class="search-no-results">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <h4>No Results Found</h4>
                <p>${message}</p>
            </div>
        `;
    }

    showResults(results) {
        // Determine if we're on a blog page (in subdirectory)
        const isInBlogDirectory = window.location.pathname.includes('/blogs/');
        const baseUrl = isInBlogDirectory ? '../' : '';
        
        const resultsHTML = results.map(product => `
            <a href="${baseUrl}products.html#${product.category}" class="search-result-item" onclick="searchInstance.closeModal()">
                <img src="${baseUrl}${product.image}" alt="${product.name}" class="search-result-image" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjFGNUY5Ii8+CjxwYXRoIGQ9Ik0zMCAyNUM0MS4wNDU3IDI1IDUwIDMzLjk1NDMgNTAgNDVDNTAgNTYuMDQ1NyA0MS4wNDU3IDY1IDMwIDY1QzE4Ljk1NDMgNjUgMTAgNTYuMDQ1NyAxMCA0NUMxMCAzMy45NTQzIDE4Ljk1NDMgMjUgMzAgMjVaIiBmaWxsPSIjRTJFOEYwIi8+Cjwvc3ZnPgo='">
                <div class="search-result-content">
                    <h4 class="search-result-title">${product.name}</h4>
                    <p class="search-result-description">${product.description}</p>
                </div>
            </a>
        `).join('');

        this.searchResults.innerHTML = resultsHTML;
    }
}

// Initialize search functionality
let searchInstance;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        searchInstance = new ProductSearch();
        window.searchInstance = searchInstance; // Make it globally accessible
    });
} else {
    searchInstance = new ProductSearch();
    window.searchInstance = searchInstance; // Make it globally accessible
}

// Global search button click handler as backup
document.addEventListener('click', (e) => {
    if ((e.target.closest('.search-toggle') || e.target.closest('[aria-label="Search"]') || e.target.closest('.floating-search-btn')) && !e.defaultPrevented) {
        e.preventDefault();
        if (window.searchInstance && window.searchInstance.searchModal) {
            window.searchInstance.openModal();
        } else {
            // Try to initialize search if not available
            setTimeout(() => {
                if (window.searchInstance) {
                    window.searchInstance.setupElements();
                    if (window.searchInstance.searchModal) {
                        window.searchInstance.openModal();
                    }
                }
            }, 100);
        }
    }
});

// Global keyboard shortcut for search
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (window.searchInstance && window.searchInstance.searchModal) {
            window.searchInstance.openModal();
        }
    }
});
