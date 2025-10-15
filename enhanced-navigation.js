// Enhanced Navigation System for A.T.L.A.S Website

class ATLASNavigationSystem {
    constructor() {
        this.currentPage = this.getCurrentPageName();
        this.isTransitioning = false;
        this.pages = {
            'index.html': { name: 'Home', icon: '🏠', title: 'A.T.L.A.S Home' },
            'gallery.html': { name: 'Gallery', icon: '🎨', title: 'System Gallery' },
            'documentation.html': { name: 'Documentation', icon: '📚', title: 'Technical Docs' }
        };
        
        this.init();
    }

    init() {
        this.createFloatingNavigation();
        this.createTransitionOverlay();
        this.bindEvents();
        this.updateActiveNavItem();
        this.wrapPageContent();
    }

    getCurrentPageName() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        return filename === '' ? 'index.html' : filename;
    }

    createFloatingNavigation() {
        // Remove existing floating nav if it exists
        const existingNav = document.querySelector('.floating-nav');
        if (existingNav) {
            existingNav.remove();
        }

        const nav = document.createElement('div');
        nav.className = 'floating-nav';
        nav.innerHTML = `
            <div class="nav-items">
                ${Object.entries(this.pages).map(([page, data]) => `
                    <a href="#" class="nav-item-float" data-page="${page}">
                        <div class="nav-icon ${data.name.toLowerCase()}-icon">${data.icon}</div>
                        <span class="nav-text">${data.name}</span>
                        <div class="nav-badge"></div>
                    </a>
                `).join('')}
            </div>
        `;

        document.body.appendChild(nav);
    }

    createTransitionOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.innerHTML = `
            <div class="transition-loader">
                <div class="loader-icon"></div>
                <div class="loader-text">Loading A.T.L.A.S</div>
                <div class="loader-subtext">Initializing Defense Systems...</div>
                <div class="scanning-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
    }

    wrapPageContent() {
        const body = document.body;
        const existingContent = Array.from(body.children).filter(child => 
            !child.classList.contains('floating-nav') && 
            !child.classList.contains('page-transition-overlay')
        );

        const wrapper = document.createElement('div');
        wrapper.className = 'page-wrapper active';
        
        existingContent.forEach(element => {
            wrapper.appendChild(element);
        });

        body.appendChild(wrapper);
    }

    bindEvents() {
        // Floating navigation clicks
        document.addEventListener('click', (e) => {
            const navItem = e.target.closest('.nav-item-float');
            if (navItem && !this.isTransitioning) {
                e.preventDefault();
                const targetPage = navItem.dataset.page;
                
                if (targetPage !== this.currentPage) {
                    this.navigateToPage(targetPage);
                }
            }
        });

        // Enhanced navigation hover effects
        const floatingNav = document.querySelector('.floating-nav');
        if (floatingNav) {
            floatingNav.addEventListener('mouseenter', () => {
                this.expandNavigation();
            });

            floatingNav.addEventListener('mouseleave', () => {
                this.collapseNavigation();
            });
        }

        // Keyboard navigation
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
        
        // Update loading text based on target page
        this.updateLoadingText(targetPage);
        
        // Start transition sequence
        this.startTransition(targetPage);
    }

    updateLoadingText(targetPage) {
        const overlay = document.querySelector('.page-transition-overlay');
        const loaderText = overlay.querySelector('.loader-text');
        const loaderSubtext = overlay.querySelector('.loader-subtext');
        
        const pageData = this.pages[targetPage];
        loaderText.textContent = `Loading ${pageData.title}`;
        
        const subtexts = {
            'index.html': 'Initializing Defense Systems...',
            'gallery.html': 'Loading Demonstration Modules...',
            'documentation.html': 'Accessing Technical Database...'
        };
        
        loaderSubtext.textContent = subtexts[targetPage] || 'Processing Request...';
    }

    startTransition(targetPage) {
        const overlay = document.querySelector('.page-transition-overlay');
        const pageWrapper = document.querySelector('.page-wrapper');
        
        // Phase 1: Show overlay and blur current page
        overlay.classList.add('active');
        pageWrapper.classList.add('slide-out');
        
        // Phase 2: Navigate after animation
        setTimeout(() => {
            this.performNavigation(targetPage);
        }, 800);
    }

    performNavigation(targetPage) {
        // Add loading state to navigation
        const targetNavItem = document.querySelector(`[data-page="${targetPage}"]`);
        if (targetNavItem) {
            targetNavItem.classList.add('loading');
        }

        // Simulate loading time with realistic delay
        const loadingTime = Math.random() * 1000 + 1200; // 1.2-2.2 seconds
        
        setTimeout(() => {
            // Update page content or navigate
            if (this.shouldUseAjax()) {
                this.loadPageContent(targetPage);
            } else {
                window.location.href = targetPage;
            }
        }, loadingTime);
    }

    shouldUseAjax() {
        // Check if we can use AJAX for smoother transitions
        // For now, we'll use traditional navigation but with enhanced UX
        return false;
    }

    loadPageContent(targetPage) {
        // AJAX loading implementation (future enhancement)
        fetch(targetPage)
            .then(response => response.text())
            .then(html => {
                this.updatePageContent(html, targetPage);
            })
            .catch(() => {
                // Fallback to traditional navigation
                window.location.href = targetPage;
            });
    }

    updatePageContent(html, targetPage) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.body.innerHTML;
        
        const pageWrapper = document.querySelector('.page-wrapper');
        pageWrapper.innerHTML = newContent;
        
        this.currentPage = targetPage;
        this.completeTransition();
    }

    completeTransition() {
        const overlay = document.querySelector('.page-transition-overlay');
        const pageWrapper = document.querySelector('.page-wrapper');
        
        // Remove loading states
        document.querySelectorAll('.nav-item-float.loading').forEach(item => {
            item.classList.remove('loading');
        });
        
        // Phase 3: Hide overlay and show new page
        setTimeout(() => {
            pageWrapper.classList.remove('slide-out');
            pageWrapper.classList.add('slide-in');
            
            setTimeout(() => {
                pageWrapper.classList.remove('slide-in');
                pageWrapper.classList.add('active');
                overlay.classList.remove('active');
                
                this.updateActiveNavItem();
                this.isTransitioning = false;
                
                // Reinitialize page-specific scripts
                this.initializePageScripts();
            }, 300);
        }, 500);
    }

    updateActiveNavItem() {
        document.querySelectorAll('.nav-item-float').forEach(item => {
            item.classList.remove('active');
        });

        const activeItem = document.querySelector(`[data-page="${this.currentPage}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    expandNavigation() {
        const nav = document.querySelector('.floating-nav');
        nav.classList.add('expanded');
        
        // Stagger animation for nav items
        const navItems = document.querySelectorAll('.nav-item-float');
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
            }, index * 100);
        });
    }

    collapseNavigation() {
        const nav = document.querySelector('.floating-nav');
        nav.classList.remove('expanded');
    }

    initializePageScripts() {
        // Reinitialize page-specific functionality after transition
        if (typeof initDemoAnimations === 'function') {
            initDemoAnimations();
        }
        if (typeof initModelViewer === 'function') {
            initModelViewer();
        }
        if (typeof initScrollAnimations === 'function') {
            initScrollAnimations();
        }
    }

    // Public methods for external use
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
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    setActivePage(pageName) {
        this.currentPage = pageName;
        this.updateActiveNavItem();
    }
}

// Enhanced loading animations
function createAdvancedLoader() {
    const styles = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .atlas-notification {
            font-family: Arial, sans-serif;
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
        
        .page-transition-overlay .loader-icon.enhanced {
            background: conic-gradient(from 0deg, transparent 30%, #980000 70%, transparent 100%);
            border: none;
            position: relative;
        }
        
        .page-transition-overlay .loader-icon.enhanced::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 60px;
            height: 60px;
            border: 2px solid rgba(152, 0, 0, 0.2);
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }
        
        .floating-nav .nav-item-float::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(152, 0, 0, 0.1), transparent);
            border-radius: 12px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .floating-nav .nav-item-float:hover::before {
            opacity: 1;
            animation: shimmerEffect 2s ease-in-out infinite;
        }
        
        @keyframes shimmerEffect {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// Initialize the navigation system
document.addEventListener('DOMContentLoaded', function() {
    // Create advanced loader styles
    createAdvancedLoader();
    
    // Initialize navigation system
    window.atlasNav = new ATLASNavigationSystem();
    
    // Add enhanced loading state for initial page load
    const body = document.body;
    body.style.opacity = '0';
    body.style.transform = 'translateY(20px)';
    body.style.transition = 'all 0.6s ease-out';
    
    setTimeout(() => {
        body.style.opacity = '1';
        body.style.transform = 'translateY(0)';
    }, 100);
    
    // Show welcome notification
    setTimeout(() => {
        if (window.atlasNav) {
            window.atlasNav.showNotification('A.T.L.A.S System Online', 'success');
        }
    }, 1500);
});

// Export for global use
window.ATLASNavigationSystem = ATLASNavigationSystem;