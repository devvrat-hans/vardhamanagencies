// Chatbot Data - Hardcoded Questions and Responses
const chatbotData = {
    products: {
        title: "Our Products",
        questions: [
            {
                question: "What types of bubble wrap do you offer?",
                answer: "We offer various types of bubble wrap including small bubble (3/16\"), large bubble (1/2\"), anti-static bubble wrap, and colored bubble wrap. All our bubble wrap products provide excellent protection for fragile items during shipping and storage."
            },
            {
                question: "Do you have stretch film in different sizes?",
                answer: "Yes, we provide stretch film in multiple widths (12\", 15\", 18\", 20\") and various thicknesses (60-120 gauge). We also offer both hand wrap and machine wrap stretch films to meet different packaging needs."
            },
            {
                question: "What packaging materials do you specialize in?",
                answer: "We specialize in protective packaging materials including bubble wrap, stretch film, air pillows, foam packaging, corrugated boxes, and various industrial packaging solutions for shipping and storage."
            },
            {
                question: "Do you offer custom packaging solutions?",
                answer: "Yes, we provide custom packaging solutions tailored to your specific requirements. We can create custom sizes, printing, and specialized protective packaging for unique products."
            },
            {
                question: "Are your products suitable for food packaging?",
                answer: "We offer food-grade packaging materials that comply with safety standards. Please specify your food packaging requirements so we can recommend the appropriate products."
            }
        ]
    },
    services: {
        title: "Our Services", 
        questions: [
            {
                question: "Do you provide packaging consultation?",
                answer: "Yes, we offer comprehensive packaging consultation services. Our experts can analyze your packaging needs, recommend cost-effective solutions, and help optimize your packaging processes."
            },
            {
                question: "What is your delivery timeline?",
                answer: "Our standard delivery timeline is 3-7 business days within India. For bulk orders or custom products, delivery may take 7-14 business days. Express delivery options are available for urgent requirements."
            },
            {
                question: "Do you offer bulk discounts?",
                answer: "Yes, we provide attractive bulk discounts based on order volume. The more you order, the better rates you get. Contact us with your requirements for a customized quote."
            },
            {
                question: "Can you handle large-scale industrial orders?",
                answer: "Absolutely! We have the capacity to handle large-scale industrial orders. We work with manufacturers, e-commerce companies, and logistics providers to supply packaging materials in bulk quantities."
            },
            {
                question: "Do you provide packaging training?",
                answer: "Yes, we offer packaging training sessions for your team. This includes proper usage techniques, cost optimization strategies, and best practices for different packaging materials."
            }
        ]
    },
    pricing: {
        title: "Pricing Information",
        questions: [
            {
                question: "How do you calculate pricing for bulk orders?",
                answer: "Our bulk pricing is based on quantity tiers, product specifications, and delivery requirements. We offer competitive rates with significant discounts for large volumes. Request a quote for accurate pricing."
            },
            {
                question: "Do you offer payment terms for businesses?",
                answer: "Yes, we offer flexible payment terms for registered businesses including credit terms up to 30-60 days for qualified customers. We also accept various payment methods including bank transfers and cheques."
            },
            {
                question: "Are there any minimum order quantities?",
                answer: "Minimum order quantities vary by product. For bubble wrap and stretch film, we typically have MOQs starting from 50 rolls. However, we can accommodate smaller orders with adjusted pricing."
            },
            {
                question: "Do you provide free samples?",
                answer: "Yes, we provide free samples for most of our products so you can evaluate quality before placing larger orders. Sample requests can be made through our contact form."
            },
            {
                question: "How often do your prices change?",
                answer: "Our prices are generally stable, but may fluctuate based on raw material costs and market conditions. We provide advance notice for any significant price changes to our regular customers."
            }
        ]
    },
    support: {
        title: "Support & Help",
        questions: [
            {
                question: "How can I track my order?",
                answer: "Once your order is shipped, we'll provide you with tracking information via email/SMS. You can also contact our customer support team for real-time updates on your order status."
            },
            {
                question: "What is your return and refund policy?",
                answer: "We accept returns for defective or damaged products within 7 days of delivery. For custom products, returns are evaluated case-by-case. Refunds are processed within 7-10 business days after approval."
            },
            {
                question: "Do you provide technical support for packaging problems?",
                answer: "Yes, our technical team can help you solve packaging challenges, recommend suitable products, and provide guidance on optimal packaging techniques for your specific needs."
            },
            {
                question: "How can I become a regular customer or partner?",
                answer: "We welcome long-term partnerships! Contact us to discuss volume requirements, special pricing, credit terms, and dedicated support. We offer partner programs for qualifying businesses."
            },
            {
                question: "What are your business hours?",
                answer: "Our business hours are Monday to Saturday, 9:00 AM to 6:00 PM IST. Our customer support team is available during these hours. For urgent inquiries, you can also reach us via email."
            }
        ]
    }
};

class Chatbot {
    constructor() {
        this.currentCategory = null;
        this.isActive = false;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadChatbot());
        } else {
            this.loadChatbot();
        }
    }

    loadChatbot() {
        // Check if chatbot already exists
        if (document.getElementById('chatbot')) {
            this.setupEventListeners();
            return;
        }
        
        // Create chatbot directly
        this.createChatbotDirectly();
    }
    
    createChatbotDirectly() {
        const chatbotHTML = `
        <div id="chatbot" class="chatbot">
            <div class="chatbot-toggle" id="chatbot-toggle">
                <div class="chatbot-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10c0 5.52-4.48 10-10 10H2v-10zm6 0c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm3 0c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm3 0c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1z"/>
                    </svg>
                </div>
                <span class="chatbot-close">&times;</span>
            </div>
            
            <div class="chatbot-window" id="chatbot-window">
                <div class="chatbot-header">
                    <div class="chatbot-header-info">
                        <h3>Vardhaman Agencies</h3>
                        <span class="chatbot-status">Online</span>
                    </div>
                    <button class="chatbot-minimize" id="chatbot-minimize">&minus;</button>
                </div>
                
                <div class="chatbot-messages" id="chatbot-messages">
                    <div class="message bot-message">
                        <div class="message-avatar">VA</div>
                        <div class="message-content">
                            <p>Hello! Welcome to Vardhaman Agencies. How can I help you today?</p>
                            <p>Please select a category below:</p>
                        </div>
                    </div>
                </div>
                
                <div class="chatbot-categories" id="chatbot-categories">
                    <button class="category-btn" data-category="products">Our Products</button>
                    <button class="category-btn" data-category="services">Services</button>
                    <button class="category-btn" data-category="pricing">Pricing</button>
                    <button class="category-btn" data-category="support">Support</button>
                </div>
                
                <div class="chatbot-questions" id="chatbot-questions" style="display: none;">
                    <!-- Questions will be populated by JavaScript -->
                </div>
                
                <div class="chatbot-input-area" id="chatbot-input-area" style="display: none;">
                    <button class="back-btn" id="back-to-categories">← Back to Categories</button>
                </div>
            </div>
        </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        this.setupEventListeners();
    }

    setupEventListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const minimize = document.getElementById('chatbot-minimize');
        const backBtn = document.getElementById('back-to-categories');
        
        
        // Remove existing listeners to prevent duplicates
        if (toggle) {
            // Clone node to remove all existing listeners
            const newToggle = toggle.cloneNode(true);
            toggle.parentNode.replaceChild(newToggle, toggle);
            
            newToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleChatbot();
            });
        }
        
        if (minimize) {
            const newMinimize = minimize.cloneNode(true);
            minimize.parentNode.replaceChild(newMinimize, minimize);
            
            newMinimize.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.minimizeChatbot();
            });
        }
        
        if (backBtn) {
            const newBackBtn = backBtn.cloneNode(true);
            backBtn.parentNode.replaceChild(newBackBtn, backBtn);
            
            newBackBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showCategories();
            });
        }
        
        this.setupCategoryButtons();
    }

    setupCategoryButtons() {
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(btn => {
            // Clone node to remove all existing listeners
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const category = e.target.getAttribute('data-category');
                this.showQuestions(category);
            });
        });
    }

    toggleChatbot() {
        const chatbot = document.getElementById('chatbot');
        const chatbotWindow = document.getElementById('chatbot-window');
        
        if (chatbot) {
            // Toggle the state
            this.isActive = !this.isActive;
            
            if (this.isActive) {
                chatbot.classList.add('active');
            } else {
                chatbot.classList.remove('active');
            }
            
            
            if (this.isActive) {
                this.showWelcomeMessage();
            }
        } else {
        }
    }

    minimizeChatbot() {
        const chatbot = document.getElementById('chatbot');
        if (chatbot) {
            this.isActive = false;
            chatbot.classList.remove('active');
        }
    }

    showWelcomeMessage() {
        // Reset to categories view when opening
        this.showCategories();
    }

    showCategories() {
        const categories = document.getElementById('chatbot-categories');
        const questions = document.getElementById('chatbot-questions');
        const inputArea = document.getElementById('chatbot-input-area');
        
        if (categories) categories.style.display = 'block';
        if (questions) questions.style.display = 'none';
        if (inputArea) inputArea.style.display = 'none';
        
        this.currentCategory = null;
        
        // Reset messages to welcome message
        this.resetMessages();
    }

    resetMessages() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (messagesContainer) {
            messagesContainer.innerHTML = `
                <div class="message bot-message">
                    <div class="message-avatar">VA</div>
                    <div class="message-content">
                        <p>Hello! Welcome to Vardhaman Agencies. How can I help you today?</p>
                        <p>Please select a category below:</p>
                    </div>
                </div>
            `;
        }
    }

    showQuestions(category) {
        if (!chatbotData[category]) return;
        
        this.currentCategory = category;
        const categoryData = chatbotData[category];
        
        const categories = document.getElementById('chatbot-categories');
        const questions = document.getElementById('chatbot-questions');
        const inputArea = document.getElementById('chatbot-input-area');
        
        if (categories) categories.style.display = 'none';
        if (questions) questions.style.display = 'block';
        if (inputArea) inputArea.style.display = 'block';
        
        // Add category selection message
        this.addBotMessage(`Great! You selected "${categoryData.title}". Here are some common questions:`);
        
        // Populate questions
        this.populateQuestions(categoryData.questions);
    }

    populateQuestions(questions) {
        const questionsContainer = document.getElementById('chatbot-questions');
        if (!questionsContainer) return;
        
        questionsContainer.innerHTML = '';
        
        questions.forEach(q => {
            const questionBtn = document.createElement('button');
            questionBtn.className = 'question-btn';
            questionBtn.textContent = q.question;
            questionBtn.addEventListener('click', () => {
                this.selectQuestion(q.question, q.answer);
            });
            questionsContainer.appendChild(questionBtn);
        });
        
        // Add "Other question" option
        const otherBtn = document.createElement('button');
        otherBtn.className = 'question-btn';
        otherBtn.textContent = 'I have a different question';
        otherBtn.addEventListener('click', () => {
            this.handleOtherQuestion();
        });
        questionsContainer.appendChild(otherBtn);
    }

    selectQuestion(question, answer) {
        // Add user message
        this.addUserMessage(question);
        
        // Add bot response after a short delay
        setTimeout(() => {
            this.addBotMessage(answer);
        }, 500);
    }

    handleOtherQuestion() {
        this.addUserMessage('I have a different question');
        
        setTimeout(() => {
            const message = "I'd be happy to help you with your specific question! For personalized assistance and detailed information, please contact us directly:";
            this.addBotMessage(message);
            this.addContactInfo();
        }, 500);
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = 'message user-message';
        messageElement.innerHTML = `
            <div class="message-avatar">You</div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
    }

    addBotMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = 'message bot-message';
        messageElement.innerHTML = `
            <div class="message-avatar">VA</div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
    }

    addContactInfo() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;
        
        const contactElement = document.createElement('div');
        contactElement.className = 'message bot-message';
        contactElement.innerHTML = `
            <div class="message-avatar">VA</div>
            <div class="message-content">
                <div class="contact-info">
                    <h4>📞 Contact Us</h4>
                    <p><strong>Phone:</strong> +91 98765 43210</p>
                    <p><strong>Email:</strong> <a href="mailto:info@vardhamanagencies.com">info@vardhamanagencies.com</a></p>
                    <p><strong>Website:</strong> <a href="/contact.html">Contact Form</a></p>
                    <p>We're here to help with all your packaging needs!</p>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(contactElement);
        this.scrollToBottom();
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }
}

// Template loader for chatbot
class ChatbotLoader {
    static async loadChatbot() {
        try {
            const response = await fetch(`/assets/templates/shared/chatbot.html?v=${Date.now()}`);
            const chatbotHTML = await response.text();
            
            // Check if there's a specific placeholder for chatbot
            let targetElement = document.getElementById('chatbot-placeholder');
            
            // If no placeholder, add to body
            if (!targetElement) {
                document.body.insertAdjacentHTML('beforeend', chatbotHTML);
            } else {
                targetElement.innerHTML = chatbotHTML;
            }
            
            // Initialize chatbot after loading
            if (window.chatbotInstance) {
                window.chatbotInstance.setupEventListeners();
            }
            
        } catch (error) {
        }
    }
}

// Initialize chatbot
let chatbotInitialized = false;

function initializeChatbot() {
    if (chatbotInitialized) {
        return;
    }
    chatbotInitialized = true;
    
    
    // Ensure no existing instance
    if (window.chatbotInstance) {
        return;
    }
    
    window.chatbotInstance = new Chatbot();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeChatbot);

// Fallback initialization if DOMContentLoaded already fired
if (document.readyState !== 'loading') {
    initializeChatbot();
}

// Initialize chatbot when template is loaded (if using template system)
document.addEventListener('templateLoaded', function(event) {
    if (event.detail.template === 'chatbot') {
        // Set up event listeners after chatbot template is loaded
        if (window.chatbotInstance) {
            window.chatbotInstance.setupEventListeners();
        } else {
            // If no instance exists, create one
            initializeChatbot();
        }
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Chatbot, ChatbotLoader };
}
