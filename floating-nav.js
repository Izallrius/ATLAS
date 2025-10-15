// Floating Navigation System for A.T.L.A.S Website

class FloatingNavigation {
    constructor() {
        this.currentPage = this.getCurrentPageName();
        this.isTransitioning = false;
        this.pages = {
            'index.html': { 
                name: 'Home', 
                icon: '🏠', 
                title: 'A.T.L.A.S Home',
                subtitle: 'Initializing Defense Systems...'
            },
            'gallery.html': { 
                name: 'Gallery', 
                icon: '🎨', 
                title: 'System Gallery',
                subtitle: 'Loading Demonstration Modules...'
            },
            'documentation.html': { 
                name: 'Documentation', 
                icon: '📚', 
                title: 'Technical Documentation',
                subtitle: 'Accessing Technical Database...'
            }
        };
        
        this.init();
    }

    init() {
        this.createFloatingNavigation();
        this.createTransitionOverlay();
        this.bindEvents();
        this.updateActiveNavItem();
        this.fixTextIssues();
    }

    getCurrentPageName() {
        const path = window.location.pathname;
        let filename = path.split('/').pop() || 'index.html';
        if (filename === '' || filename === '/') {
            filename = 'index.html';
        }
        return filename;
    }

    createFloatingNavigation() {
        // Remove existing floating nav if it exists
        const existingNav = document.querySelector('.floating-right-nav');
        if (existingNav) {
            existingNav.remove();
        }

        const nav = document.createElement('div');
        nav.className = 'floating-right-nav';
        nav.id = 'floatingNav';
        
        const navItems = document.createElement('div');
        navItems.className = 'floating-nav-items';
        
        Object.entries(this.pages).forEach(([page, data]) => {
            const navItem = document.createElement('div');
            navItem.className = `nav-item-floating ${page === this.currentPage ? 'active' : ''}`;
            navItem.setAttribute('data-page', page);
            navItem.setAttribute('title', data.name);
            
            navItem.innerHTML = `
                <div class="nav-icon">${data.icon}</div>
                <span class="nav-label">${data.name}</span>
                <div class="nav-badge"></div>
            `;
            
            navItems.appendChild(navItem);
        });
        
        nav.appendChild(navItems);
        document.body.appendChild(nav);
    }

    createTransitionOverlay() {
        // Remove existing overlay if it exists
        const existingOverlay = document.querySelector('.page-transition-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }

        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.id = 'transitionOverlay';
        
        overlay.innerHTML = `
            <div class="transition-content">
                <div class="loader-spinner"></div>
                <div class="loader-text">Loading A.T.L.A.S</div>
                <div class="loader-subtext">Initializing Defense Systems...</div>
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
    }

    bindEvents() {
        // Floating navigation clicks
        document.addEventListener('click', (e) => {
            const navItem = e.target.closest('.nav-item-floating');
            if (navItem && !this.isTransitioning) {
                const targetPage = navItem.dataset.page;
                
                if (targetPage !== this.currentPage) {
                    this.navigateToPage(targetPage);
                }
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        this.navigateToPage('index.html');
                        break;
                    case '2':
                        e.preventDefault();
                        this.navigateToPage('gallery.html');
                        break;
                    case '3':
                        e.preventDefault();
                        this.navigateToPage('documentation.html');
                        break;
                }
            }
        });
    }

    navigateToPage(targetPage) {
        if (this.isTransitioning || targetPage === this.currentPage) return;

        this.isTransitioning = true;
        
        // Update loading text
        this.updateLoadingText(targetPage);
        
        // Add loading state to clicked nav item
        const targetNavItem = document.querySelector(`[data-page="${targetPage}"]`);
        if (targetNavItem) {
            targetNavItem.classList.add('loading');
        }
        
        // Start transition
        this.startTransition(targetPage);
    }

    updateLoadingText(targetPage) {
        const overlay = document.querySelector('.page-transition-overlay');
        const loaderText = overlay.querySelector('.loader-text');
        const loaderSubtext = overlay.querySelector('.loader-subtext');
        
        const pageData = this.pages[targetPage];
        if (pageData) {
            loaderText.textContent = `Loading ${pageData.title}`;
            loaderSubtext.textContent = pageData.subtitle;
        }
    }

    startTransition(targetPage) {
        const overlay = document.querySelector('.page-transition-overlay');
        const body = document.body;
        
        // Show overlay
        overlay.classList.add('active');
        
        // Blur current page
        body.classList.add('transitioning');
        
        // Simulate loading time
        const loadingTime = 1200 + Math.random() * 800; // 1.2-2 seconds
        
        setTimeout(() => {
            // Navigate to new page
            window.location.href = targetPage;
        }, loadingTime);
    }

    updateActiveNavItem() {
        document.querySelectorAll('.nav-item-floating').forEach(item => {
            item.classList.remove('active');
        });

        const activeItem = document.querySelector(`[data-page="${this.currentPage}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    fixTextIssues() {
        // Fix home page title display issue
        const heroTitle = document.querySelector('.hero-title .title-line');
        if (heroTitle) {
            // Check if the title has malformed HTML
            const titleHTML = heroTitle.innerHTML;
            if (titleHTML.includes('line">') || titleHTML.includes('</span>')) {
                heroTitle.innerHTML = 'A.<span class="highlight">T</span>.L.A.S';
            }
        }

        // Fix gallery description container
        const galleryDescription = document.querySelector('.gallery-description');
        if (galleryDescription) {
            galleryDescription.style.maxWidth = '800px';
            galleryDescription.style.margin = '0 auto 4rem';
            galleryDescription.style.padding = '0 2rem';
            galleryDescription.style.wordWrap = 'break-word';
            galleryDescription.style.boxSizing = 'border-box';
        }

        // Fix documentation title position
        const docHeader = document.querySelector('.doc-header');
        if (docHeader) {
            docHeader.style.paddingTop = '12rem';
            docHeader.style.marginTop = '0';
        }

        const docTitle = document.querySelector('.doc-title');
        if (docTitle) {
            docTitle.style.marginTop = '2rem';
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `atlas-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">${type === 'success' ? '✓' : 'ℹ'}</div>
                <div class="notification-text">${message}</div>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: #FFFFFF;
            padding: 15px 20px;
            border-radius: 8px;
            border-left: 4px solid ${type === 'success' ? '#00ff00' : '#980000'};
            z-index: 2100;
            animation: slideInRight 0.5s ease-out;
            backdrop-filter: blur(10px);
            font-family: Arial, sans-serif;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 500);
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add necessary CSS for notifications
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .atlas-notification {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-icon {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
    `;
    document.head.appendChild(notificationStyles);

    // Initialize floating navigation
    window.atlasFloatingNav = new FloatingNavigation();
    
    // Add page loaded class for smooth entrance
    document.body.classList.add('page-loaded');
    
    // Show system online notification
    setTimeout(() => {
        if (window.atlasFloatingNav) {
            window.atlasFloatingNav.showNotification('A.T.L.A.S System Online', 'success');
        }
    }, 1000);
});

// Handle page visibility for better transitions
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Page became visible, ensure navigation is properly initialized
        if (window.atlasFloatingNav) {
            window.atlasFloatingNav.updateActiveNavItem();
        }
    }
});

// Export for global access
window.FloatingNavigation = FloatingNavigation;