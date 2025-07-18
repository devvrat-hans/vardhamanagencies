---
applyTo: '**'
---
# GitHub Copilot Instructions File for VardhamanAgencies.in Ecommerce Website

## Project Context

IMP: The website should look subtle

**Company**: VardhamanAgencies.in  
**Business Focus**: Bubble wrap packaging solutions for B2B and B2C markets  
**Project**: Professional, modern ecommerce website  
**Tech Stack**: HTML, CSS, JavaScript (no frameworks)  
**Target**: Business-grade, mobile-first responsive design  

## Coding Guidelines and Standards

### HTML Structure
- Use semantic HTML5 elements consistently
- Include proper DOCTYPE declaration and meta tags for SEO and responsiveness
- Always include `` and ``
- Use descriptive, accessible HTML structure with proper heading hierarchy (H1, H2, H3...)
- Include alt text for all images and aria-labels for interactive elements
- Use proper form elements with labels and validation attributes

### CSS Development
- Write mobile-first CSS with progressive enhancement for larger screens
- Use CSS Grid for complex layouts and Flexbox for component alignment
- Implement CSS custom properties (variables) for consistent theming:
  ```css
  :root {
    --primary-color: #2563eb;
    --secondary-color: #059669;
    --accent-color: #dc2626;
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
    --background-primary: #ffffff;
    --background-secondary: #f9fafb;
  }
  ```
- Use BEM methodology for class naming (block__element--modifier)
- Implement responsive breakpoints: 320px (mobile), 768px (tablet), 1024px (desktop), 1440px (large desktop)
- Ensure minimum 44px touch targets for mobile interactions
- Use relative units (rem, em, %) for scalable layouts

### JavaScript Standards
- Write ES6+ JavaScript with const/let instead of var
- Use arrow functions and template literals where appropriate
- Implement modular code structure with separate files for different functionalities
- Use localStorage for cart persistence and user preferences
- Include proper error handling with try/catch blocks
- Write descriptive function and variable names
- Add JSDoc comments for complex functions

### File Organization
```
VardhamanAgencies/
├── index.html
├── about.html
├── products.html
├── contact.html
├── cart.html
├── checkout.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── components.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   ├── cart.js
│   │   ├── products.js
│   │   └── utils.js
│   └── images/
│       ├── products/
│       ├── banners/
│       └── icons/
```

## Business-Specific Requirements

### Product Features
- Focus on bubble wrap packaging solutions (various sizes, types, quantities)
- Include product specifications (dimensions, thickness, material grade)
- Implement bulk pricing for B2B customers
- Add packaging calculator for quantity estimation
- Show industry applications (ecommerce, manufacturing, shipping)

### Ecommerce Functionality
- Shopping cart with quantity controls and price calculations
- Product filtering by size, type, price range, and application
- Search functionality with auto-suggestions
- Wishlist/favorites for repeat customers
- Guest checkout option with account creation prompt
- Order tracking and history for registered users

### Trust and Credibility Elements
- Company information and certifications
- Customer testimonials and reviews
- Contact information with multiple channels
- Business hours and location details
- Industry experience and expertise highlights
- Professional imagery and product photography

## Performance and SEO Guidelines

### Performance Optimization
- Optimize images with appropriate formats (WebP when possible, JPG/PNG fallback)
- Implement lazy loading for images below the fold
- Minify CSS and JavaScript files
- Use efficient CSS selectors and avoid !important
- Target Core Web Vitals metrics (LCP < 2.5s, FID < 100ms, CLS < 0.1)

### SEO Best Practices
- Include unique meta titles and descriptions for each page
- Use structured data markup for products and business information
- Create descriptive URLs (e.g., /products/bubble-wrap-large-sheets)
- Implement proper heading hierarchy with relevant keywords
- Add Open Graph meta tags for social sharing
- Include sitemap.xml and robots.txt files

## User Experience Standards

### Responsive Design
- Ensure all content is accessible and functional on mobile devices
- Use touch-friendly navigation with appropriate spacing
- Implement swipe gestures for product galleries
- Optimize form inputs for mobile keyboards
- Test on various screen sizes and orientations

### Navigation and Layout
- Clear, consistent navigation structure across all pages
- Breadcrumb navigation for product categories
- Sticky header with cart icon and search functionality
- Footer with important links and contact information
- Loading states for dynamic content

### Accessibility
- Maintain color contrast ratios of at least 4.5:1
- Ensure keyboard navigation works for all interactive elements
- Use semantic HTML and ARIA labels appropriately
- Provide text alternatives for images and icons
- Test with screen readers and accessibility tools

## Code Quality Standards

### Comments and Documentation
- Add comments for complex business logic
- Document API endpoints and data structures
- Include setup instructions in README
- Comment CSS for custom calculations and browser-specific fixes

### Error Handling
- Implement graceful degradation for JavaScript failures
- Show user-friendly error messages
- Log errors for debugging without exposing sensitive information
- Provide fallback options for network failures

### Security Considerations
- Validate all user inputs on both client and server side
- Sanitize data before displaying or processing
- Use HTTPS for all sensitive operations
- Implement Content Security Policy headers
- Protect against common vulnerabilities (XSS, CSRF)

## Testing and Quality Assurance

### Browser Compatibility
- Test on Chrome, Firefox, Safari, and Edge
- Verify functionality on mobile browsers
- Check for compatibility with older browser versions
- Test with different network conditions

### Performance Testing
- Use Google PageSpeed Insights for performance audits
- Test loading times on different connection speeds
- Monitor Core Web Vitals metrics
- Optimize for both desktop and mobile performance

This instruction file should guide all code generation, suggestions, and reviews for the VardhamanAgencies.in ecommerce website project, ensuring consistent, professional, and business-appropriate output that meets modern web development standards while serving the specific needs of a bubble wrap packaging business.