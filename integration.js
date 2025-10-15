// A.T.L.A.S Integration Script - Fixes and Enhancements

document.addEventListener('DOMContentLoaded', function() {
    // Fix 1: Correct the home page title display issue
    fixHomePageTitle();
    
    // Fix 2: Ensure gallery description text is properly contained
    fixGalleryTextContainer();
    
    // Fix 3: Adjust documentation page title positioning
    fixDocumentationTitlePosition();
    
    // Enhancement: Add the enhanced navigation system
    addEnhancedCSS();
    
    // Enhancement: Initialize the floating navigation
    initializeFloatingNavigation();
    
    // Enhancement: Add page transition system
    setupPageTransitions();
});

function fixHomePageTitle() {
    const heroTitle = document.querySelector('.hero-title .title-line');
    if (heroTitle) {
        // Fix the title structure to display correctly
        const titleHTML = heroTitle.innerHTML;
        
        // Check if the title is malformed and fix it
        if (titleHTML.includes('line">') || titleHTML.includes('</span>')) {
            heroTitle.innerHTML = 'A.<span class="highlight">T</span>.L.A.S';
        }
        
        // Ensure proper styling is applied
        heroTitle.style.display = 'block';
        heroTitle.style.fontSize = '4rem';
        heroTitle.style.lineHeight = '1.1';
    }
    
    // Also check the title subtitle
    const titleSubtitle = document.querySelector('.title-subtitle');
    if (titleSubtitle) {
        titleSubtitle.style.display = 'block';
        titleSubtitle.style.fontSize = '1.2rem';
        titleSubtitle.style.marginTop = '0.5rem';
    }
}

function fixGalleryTextContainer() {
    const galleryDescription = document.querySelector('.gallery-description');
    if (galleryDescription) {
        // Ensure the text is properly contained within its container
        galleryDescription.style.maxWidth = '800px';
        galleryDescription.style.margin = '0 auto 4rem';
        galleryDescription.style.padding = '0 2rem';
        galleryDescription.style.wordWrap = 'break-word';
        galleryDescription.style.overflowWrap = 'break-word';
        galleryDescription.style.boxSizing = 'border-box';
        
        // Ensure the parent container has proper constraints
        const galleryHeader = document.querySelector('.gallery-header');
        if (galleryHeader) {
            galleryHeader.style.padding = '8rem 2rem 4rem';
            galleryHeader.style.overflow = 'hidden';
        }
        
        const container = galleryDescription.closest('.container');
        if (container) {
            container.style.maxWidth = '1200px';
            container.style.padding = '0 2rem';
            container.style.margin = '0 auto';
            container.style.boxSizing = 'border-box';
        }
    }
}

function fixDocumentationTitlePosition() {
    const docHeader = document.querySelector('.doc-header');
    if (docHeader) {
        // Add sufficient top padding to clear the navbar
        docHeader.style.paddingTop = '14rem';
        docHeader.style.marginTop = '0';
    }
    
    const docTitle = document.querySelector('.doc-title');
    if (docTitle) {
        // Add additional margin to ensure visibility
        docTitle.style.marginTop = '2rem';
        docTitle.style.fontSize = '3.5rem';
        docTitle.style.lineHeight = '1.2';
    }
    
    // Ensure the navbar doesn't interfere
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.height = '80px';
        navbar.style.zIndex = '1000';
    }
}

function addEnhancedCSS() {
    // Add the enhanced navigation CSS if not already present
    if (!document.querySelector('link[href*="enhanced-navigation.css"]')) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'enhanced-navigation.css';
        document.head.appendChild(cssLink);
    }
    
    // Add the fixes CSS if not already present
    if (!document.querySelector('link[href*="fixes.css"]')) {
        const fixesLink = document.createElement('link');
        fixesLink.rel = 'stylesheet';
        fixesLink.href = 'fixes.css';
        document.head.appendChild(fixesLink);
    }
}

function initializeFloatingNavigation() {
    // Create the floating navigation HTML structure
    const floatingNav = document.createElement('div');
    floatingNav.className = 'floating-nav';
    
    const currentPage = getCurrentPageName();
    const pages = {
        'index.html': { name: 'Home', icon: '🏠', title: 'A.T.L.A.S Home' },
        'gallery.html': { name: 'Gallery', icon: '🎨', title: 'System Gallery' },
        'documentation.html': { name: 'Documentation', icon: '📚', title: 'Technical Docs' }
    };
    
    floatingNav.innerHTML = `
        <div class="nav-items">
            ${Object.entries(pages).map(([page, data]) => `
                <a href="${page}" class="nav-item-float ${page === currentPage ? 'active' : ''}" data-page="${page}">
                    <div class="nav-icon ${data.name.toLowerCase()}-icon">${data.icon}</div>
                    <span class="nav-text">${data.name}</span>
                    <div class="nav-badge"></div>
                </a>
            `).join('')}
        </div>
    `;
    
    document.body.appendChild(floatingNav);
}

function setupPageTransitions() {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.innerHTML = `
        <div class="transition-loader">
            <div class="loader-icon radar"></div>
            <div class="loader-text">Loading A.T.L.A.S</div>
            <div class="loader-subtext">Initializing Defense Systems...</div>
            <div class="scanning-progress">
                <div class="progress-bar"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Add click handlers for smooth transitions
    document.addEventListener('click', function(e) {
        const navLink = e.target.closest('.nav-item-float');
        if (navLink && navLink.dataset.page) {
            const targetPage = navLink.dataset.page;
            const currentPage = getCurrentPageName();
            
            if (targetPage !== currentPage) {
                e.preventDefault();
                performPageTransition(targetPage);
            }
        }
    });
}

function performPageTransition(targetPage) {
    const overlay = document.querySelector('.page-transition-overlay');
    const body = document.body;
    
    // Update loading text
    const loaderText = overlay.querySelector('.loader-text');
    const loaderSubtext = overlay.querySelector('.loader-subtext');
    
    const pageData = {
        'index.html': { title: 'A.T.L.A.S Home', subtitle: 'Initializing Defense Systems...' },
        'gallery.html': { title: 'System Gallery', subtitle: 'Loading Demonstration Modules...' },
        'documentation.html': { title: 'Technical Documentation', subtitle: 'Accessing Technical Database...' }
    };
    
    const data = pageData[targetPage];
    if (data) {
        loaderText.textContent = `Loading ${data.title}`;
        loaderSubtext.textContent = data.subtitle;
    }
    
    // Show overlay with animation
    overlay.style.display = 'flex';
    overlay.style.opacity = '0';
    overlay.style.transform = 'scale(0.95)';
    overlay.style.transition = 'all 0.5s ease-out';
    
    // Animate overlay appearance
    setTimeout(() => {
        overlay.style.opacity = '1';
        overlay.style.transform = 'scale(1)';
    }, 50);
    
    // Blur current page
    body.style.filter = 'blur(3px)';
    body.style.transform = 'scale(0.98)';
    body.style.transition = 'all 0.5s ease-out';
    
    // Navigate after animation
    setTimeout(() => {
        window.location.href = targetPage;
    }, 1500);
}

function getCurrentPageName() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    return filename === '' ? 'index.html' : filename;
}

// Additional enhancements
function addResponsiveEnhancements() {
    // Mobile-specific fixes
    if (window.innerWidth <= 768) {
        const galleryDescription = document.querySelector('.gallery-description');
        if (galleryDescription) {
            galleryDescription.style.fontSize = '1.1rem';
            galleryDescription.style.padding = '0 1.5rem';
        }
        
        const docHeader = document.querySelector('.doc-header');
        if (docHeader) {
            docHeader.style.paddingTop = '12rem';
        }
    }
}

// Initialize responsive enhancements
window.addEventListener('resize', addResponsiveEnhancements);
addResponsiveEnhancements();

// Export functions for external use
window.atlasIntegration = {
    fixHomePageTitle,
    fixGalleryTextContainer,
    fixDocumentationTitlePosition,
    performPageTransition
};