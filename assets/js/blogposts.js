// Blog Posts Loader and Manager
class BlogPostLoader {
    static async loadAllPosts() {
        // Sample blog posts data - in a real application, this would fetch from a CMS or API
        const posts = [
            {
                id: 1,
                title: "The Ultimate Guide to Bubble Wrap: Types, Uses, and Benefits",
                excerpt: "Discover everything you need to know about bubble wrap packaging, from different types and sizes to optimal usage scenarios for maximum protection.",
                content: "",
                author: "Raj Sharma",
                date: "2025-07-20",
                category: "product-guides",
                tags: ["bubble-wrap", "packaging-tips", "protection"],
                image: BlogPostLoader.generatePlaceholderImage("product-guides"),
                readTime: 8,
                url: "/blogs/bubble-wrap-ultimate-guide.html"
            },
            {
                id: 2,
                title: "Sustainable Packaging Solutions: The Future of Protective Packaging",
                excerpt: "Explore eco-friendly alternatives and sustainable practices in the packaging industry while maintaining optimal product protection.",
                content: "",
                author: "Priya Patel",
                date: "2025-07-18",
                category: "sustainability",
                tags: ["eco-friendly", "sustainability", "green-packaging"],
                image: BlogPostLoader.generatePlaceholderImage("sustainability"),
                readTime: 6,
                url: "/blogs/sustainable-packaging-solutions.html"
            },
            {
                id: 3,
                title: "Packaging Industry Trends 2025: What's Shaping the Market",
                excerpt: "Stay ahead with the latest trends in packaging technology, consumer preferences, and market dynamics affecting the industry.",
                content: "",
                author: "Amit Kumar",
                date: "2025-07-15",
                category: "industry-trends",
                tags: ["market-analysis", "trends", "technology"],
                image: BlogPostLoader.generatePlaceholderImage("industry-trends"),
                readTime: 10,
                url: "/blogs/packaging-industry-trends-2025.html"
            },
            {
                id: 4,
                title: "Stretch Film vs Bubble Wrap: Choosing the Right Protection",
                excerpt: "Compare stretch film and bubble wrap to determine the best protective packaging solution for your specific needs and applications.",
                content: "",
                author: "Suresh Gupta",
                date: "2025-07-12",
                category: "product-guides",
                tags: ["stretch-film", "bubble-wrap", "comparison"],
                image: BlogPostLoader.generatePlaceholderImage("product-guides"),
                readTime: 7,
                url: "/blogs/stretch-film-vs-bubble-wrap.html"
            },
            {
                id: 5,
                title: "Cost-Effective Packaging: Maximizing Value in Your Supply Chain",
                excerpt: "Learn strategies to optimize packaging costs without compromising on quality or protection in your business operations.",
                content: "",
                author: "Neha Singh",
                date: "2025-07-10",
                category: "packaging-tips",
                tags: ["cost-optimization", "efficiency", "business"],
                image: BlogPostLoader.generatePlaceholderImage("packaging-tips"),
                readTime: 9,
                url: "/blogs/cost-effective-packaging-strategies.html"
            },
            {
                id: 6,
                title: "E-commerce Packaging Best Practices for Online Retailers",
                excerpt: "Essential packaging tips for e-commerce businesses to ensure products arrive safely while enhancing customer experience.",
                content: "",
                author: "Vikram Reddy",
                date: "2025-07-08",
                category: "packaging-tips",
                tags: ["e-commerce", "retail", "customer-experience"],
                image: BlogPostLoader.generatePlaceholderImage("packaging-tips"),
                readTime: 6,
                url: "/blogs/ecommerce-packaging-best-practices.html"
            },
            {
                id: 7,
                title: "Understanding Packaging Regulations and Compliance in India",
                excerpt: "Navigate the complex landscape of packaging regulations, standards, and compliance requirements for businesses in India.",
                content: "",
                author: "Dr. Anita Joshi",
                date: "2025-07-05",
                category: "industry-trends",
                tags: ["regulations", "compliance", "legal"],
                image: BlogPostLoader.generatePlaceholderImage("industry-trends"),
                readTime: 12,
                url: "/blogs/packaging-regulations-compliance-india.html"
            },
            {
                id: 8,
                title: "The Science Behind Bubble Wrap: How Air Cushioning Works",
                excerpt: "Dive deep into the physics and engineering principles that make bubble wrap such an effective protective packaging material.",
                content: "",
                author: "Prof. Rajesh Mehta",
                date: "2025-07-03",
                category: "product-guides",
                tags: ["science", "technology", "innovation"],
                image: BlogPostLoader.generatePlaceholderImage("product-guides"),
                readTime: 11,
                url: "/blogs/science-behind-bubble-wrap.html"
            },
            {
                id: 9,
                title: "Recycling and Disposal: Responsible Packaging Lifecycle Management",
                excerpt: "Learn about proper recycling methods and disposal practices for various packaging materials to minimize environmental impact.",
                content: "",
                author: "Green Team VA",
                date: "2025-07-01",
                category: "sustainability",
                tags: ["recycling", "waste-management", "environment"],
                image: BlogPostLoader.generatePlaceholderImage("sustainability"),
                readTime: 8,
                url: "/blogs/packaging-recycling-disposal-guide.html"
            }
        ];
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return posts;
    }
    
    static async loadPostsByCategory(category) {
        const allPosts = await this.loadAllPosts();
        if (category === 'all') {
            return allPosts;
        }
        return allPosts.filter(post => 
            post.category === category || post.tags.includes(category)
        );
    }
    
    static async loadPostById(id) {
        const allPosts = await this.loadAllPosts();
        return allPosts.find(post => post.id === parseInt(id));
    }
    
    static async searchPosts(query) {
        const allPosts = await this.loadAllPosts();
        const searchTerm = query.toLowerCase();
        
        return allPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            post.category.toLowerCase().includes(searchTerm)
        );
    }
    
    static generatePlaceholderImage(category) {
        const colors = {
            'product-guides': '#3b82f6',
            'industry-trends': '#10b981',
            'sustainability': '#22c55e',
            'packaging-tips': '#f59e0b'
        };
        
        const color = colors[category] || '#6b7280';
        
        // Generate a simple SVG placeholder
        const svg = `
            <svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="${color}"/>
                <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-size="18" font-family="Arial, sans-serif">
                    ${category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </text>
            </svg>
        `;
        
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    }
}

// Individual Blog Post Class
class BlogPost {
    constructor(data) {
        Object.assign(this, data);
    }
    
    getFormattedDate() {
        const date = new Date(this.date);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    getRelativeTime() {
        const now = new Date();
        const postDate = new Date(this.date);
        const diffTime = Math.abs(now - postDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
        return `${Math.ceil(diffDays / 365)} years ago`;
    }
    
    toHTML(template = 'card') {
        if (template === 'card') {
            return this.toCardHTML();
        } else if (template === 'list') {
            return this.toListHTML();
        }
        return this.toCardHTML();
    }
    
    toCardHTML() {
        return `
            <article class="blog-card" data-id="${this.id}">
                <div class="blog-card__image">
                    <img src="${this.image || BlogPostLoader.generatePlaceholderImage(this.category)}" 
                         alt="${this.title}" loading="lazy">
                    <span class="blog-card__category">${this.formatCategory(this.category)}</span>
                </div>
                <div class="blog-card__content">
                    <div class="blog-card__meta">
                        <div class="blog-card__meta-item">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                            </svg>
                            <span>${this.getFormattedDate()}</span>
                        </div>
                        <div class="blog-card__meta-item">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                            </svg>
                            <span>${this.readTime} min read</span>
                        </div>
                    </div>
                    <h2 class="blog-card__title">${this.title}</h2>
                    <p class="blog-card__excerpt">${this.excerpt}</p>
                    ${this.tags.length > 0 ? `
                        <div class="blog-card__tags">
                            ${this.tags.slice(0, 3).map(tag => 
                                `<span class="blog-tag">${this.formatCategory(tag)}</span>`
                            ).join('')}
                        </div>
                    ` : ''}
                    <div class="blog-card__footer">
                        <div class="blog-card__author">
                            <div class="blog-card__author-avatar">${this.author.charAt(0).toUpperCase()}</div>
                            <span class="blog-card__author-name">${this.author}</span>
                        </div>
                        <a href="${this.url}" class="blog-card__read-more">
                            Read More
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </article>
        `;
    }
    
    formatCategory(category) {
        return category.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BlogPostLoader, BlogPost };
}
