#!/bin/bash

# Fast Template Loading Update Script
# This script updates all main HTML files to use the optimized template loading

echo "Updating HTML files for fast template loading..."

# List of main HTML files to update (excluding blog posts and templates)
files=(
    "about.html"
    "blogs.html" 
    "contact.html"
    "privacy.html"
    "refund.html"
    "terms.html"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing $file..."
        
        # Update the DOMContentLoaded event listener to use fast loading
        sed -i.bak 's/document\.addEventListener.*DOMContentLoaded.*async function.*{/\/\/ Ultra-fast template loading\n        (function() {\n            Promise.all([/' "$file"
        
        # Update await calls to Promise.all pattern
        sed -i.bak 's/await TemplateLoader\.loadNavbar();/TemplateLoader.loadNavbar(),/' "$file"
        sed -i.bak 's/await TemplateLoader\.loadFooter();/TemplateLoader.loadFooter()/' "$file"
        
        # Fix the closing structure
        sed -i.bak 's/await TemplateLoader\.loadCTA();/]).then(() => {\n                Promise.all([/' "$file"
        sed -i.bak 's/await TemplateLoader\.loadScrollToTop();/TemplateLoader.loadCTA(),\n                    TemplateLoader.loadScrollToTop()/' "$file"
        
        # Add closing brackets
        sed -i.bak 's/});$/]);\n            });\n        })();/' "$file"
        
        echo "Updated $file"
    else
        echo "Warning: $file not found"
    fi
done

echo "Fast template loading update completed!"
echo "Note: Backup files (.bak) have been created for each modified file."
