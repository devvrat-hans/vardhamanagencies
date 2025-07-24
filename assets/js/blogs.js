// Blogs Page JavaScript
class BlogManager {
    constructor() {
        this.currentCategory = 'all';
        this.displayedPosts = 6;
        this.postsPerLoad = 6;
        this.allPosts = [];
        this.filteredPosts = [];
        
        this.init();
    }
    
    async init() {
        await this.loadBlogPosts();
        this.setupEventListeners();
        this.displayPosts();
    }
    
    async loadBlogPosts() {
        try {
            // Load blog posts from the blogs folder
            this.allPosts = await BlogPostLoader.loadAllPosts();
            this.filteredPosts = [...this.allPosts];
        } catch (error) {
            console.error('Error loading blog posts:', error);
            this.showNoPosts('Failed to load blog posts. Please try again later.');
        }
    }
    
    setupEventListeners() {
        // Category filter buttons
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleCategoryFilter(e.target.dataset.category);
            });
        });
        
        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMorePosts();
            });
        }
    }
    
    handleCategoryFilter(category) {
        // Update active button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        // Filter posts
        this.currentCategory = category;
        if (category === 'all') {
            this.filteredPosts = [...this.allPosts];
        } else {
            this.filteredPosts = this.allPosts.filter(post => 
                post.category === category || post.tags.includes(category)
            );
        }
        
        // Reset display count and show posts
        this.displayedPosts = this.postsPerLoad;
        this.displayPosts();
    }
    
    displayPosts() {
        const blogGrid = document.getElementById('blogGrid');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        if (!blogGrid) return;
        
        if (this.filteredPosts.length === 0) {
            this.showNoPosts();
            return;
        }
        
        // Clear existing posts
        blogGrid.innerHTML = '';
        
        // Display posts up to current limit
        const postsToShow = this.filteredPosts.slice(0, this.displayedPosts);
        postsToShow.forEach((post, index) => {
            const postElement = this.createPostElement(post, index === 0 && this.currentCategory === 'all');
            blogGrid.appendChild(postElement);
        });
        
        // Show/hide load more button
        if (loadMoreBtn) {
            if (this.displayedPosts >= this.filteredPosts.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-flex';
            }
        }
    }
    
    createPostElement(post, isFeatured = false) {
        const article = document.createElement('article');
        article.className = `blog-card${isFeatured ? ' featured' : ''}`;
        
        article.innerHTML = `
            <div class="blog-card__image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
                <span class="blog-card__category">${this.formatCategory(post.category)}</span>
            </div>
            <div class="blog-card__content">
                <div class="blog-card__meta">
                    <div class="blog-card__meta-item">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                        </svg>
                        <span>${this.formatDate(post.date)}</span>
                    </div>
                    <div class="blog-card__meta-item">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span>${post.readTime} min read</span>
                    </div>
                </div>
                <h2 class="blog-card__title">${post.title}</h2>
                <p class="blog-card__excerpt">${post.excerpt}</p>
                ${post.tags.length > 0 ? `
                    <div class="blog-card__tags">
                        ${post.tags.slice(0, 3).map(tag => 
                            `<a href="#" class="blog-tag" data-category="${tag}">${this.formatCategory(tag)}</a>`
                        ).join('')}
                    </div>
                ` : ''}
                <div class="blog-card__footer">
                    <div class="blog-card__author">
                        <div class="blog-card__author-avatar">${post.author.charAt(0).toUpperCase()}</div>
                        <span class="blog-card__author-name">${post.author}</span>
                    </div>
                    <a href="${post.url}" class="blog-card__read-more">
                        Read More
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"/>
                        </svg>
                    </a>
                </div>
            </div>
        `;
        
        // Add click handler for tag links
        const tagLinks = article.querySelectorAll('.blog-tag');
        tagLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCategoryFilter(e.target.dataset.category);
            });
        });
        
        return article;
    }
    
    loadMorePosts() {
        this.displayedPosts += this.postsPerLoad;
        this.displayPosts();
    }
    
    showNoPosts(message = null) {
        const blogGrid = document.getElementById('blogGrid');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        if (!blogGrid) return;
        
        const defaultMessage = this.currentCategory === 'all' 
            ? 'No blog posts available at the moment.'
            : `No posts found in "${this.formatCategory(this.currentCategory)}" category.`;
        
        blogGrid.innerHTML = `
            <div class="no-posts">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
                <h3>No Posts Found</h3>
                <p>${message || defaultMessage}</p>
            </div>
        `;
        
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span>${message}</span>
                <button class="notification__close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close functionality
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }
        }, 5000);
    }
    
    formatCategory(category) {
        return category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Initialize blog manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogManager();
});
