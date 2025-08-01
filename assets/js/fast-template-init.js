// Fast Template Initialization - Optimized for speed
(function() {
    'use strict';
    
    // Critical template loader that runs immediately without waiting for DOMContentLoaded
    function loadCriticalTemplates() {
        // Make sure TemplateLoader is available
        if (typeof window.TemplateLoader === 'undefined') {
            console.warn('TemplateLoader not available in fast-template-init');
            return;
        }
        
        // Load navbar and footer in parallel for maximum speed
        Promise.all([
            window.TemplateLoader.loadNavbar(),
            window.TemplateLoader.loadFooter()
        ]).then(() => {
            // Load non-critical templates after main ones are done
            Promise.all([
                window.TemplateLoader.loadCTA(),
                window.TemplateLoader.loadScrollToTop(),
                window.TemplateLoader.loadChatbot()
            ]);
        }).catch(error => {
            console.warn('Fast template loading error:', error);
        });
    }
    
    // Load templates as soon as possible
    if (document.readyState === 'loading') {
        // If document is still loading, wait for DOMContentLoaded
        document.addEventListener('DOMContentLoaded', loadCriticalTemplates);
    } else {
        // If document is already loaded, execute immediately
        loadCriticalTemplates();
    }
    
    // Alternative: If TemplateLoader is not yet available, wait for it
    if (typeof window.TemplateLoader === 'undefined') {
        const checkTemplateLoader = setInterval(() => {
            if (typeof window.TemplateLoader !== 'undefined') {
                clearInterval(checkTemplateLoader);
                loadCriticalTemplates();
            }
        }, 10); // Check every 10ms
        
        // Safety timeout to prevent infinite checking
        setTimeout(() => {
            clearInterval(checkTemplateLoader);
        }, 2000);
    }
})();
