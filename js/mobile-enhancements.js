// Mobile Enhancements for A.T.L.A.S Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isMobile || isTouch) {
        document.body.classList.add('mobile-device');
    }
    
    // Enhanced mobile navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Improved hamburger menu functionality
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
            
            // Add haptic feedback for mobile devices
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
        
        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }
    
    // Touch-friendly interactions
    function addTouchFeedback(elements) {
        elements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transition = 'transform 0.1s ease';
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
            
            element.addEventListener('touchcancel', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Apply touch feedback to interactive elements
    const touchElements = document.querySelectorAll('.btn, .tech-card, .feature-item, .spec-card, .tab-btn, .demo-card');
    addTouchFeedback(touchElements);
    
    // Smooth scrolling for mobile
    function smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Enhanced anchor link handling for mobile
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScrollTo(target);
        });
    });
    
    // Mobile hamburger navigation
    const rightNavbar = document.querySelector('.right-navbar');
    console.log('Right navbar found:', rightNavbar);
    console.log('Is mobile/tablet:', isMobile || window.innerWidth <= 768);
    
    if (rightNavbar && (isMobile || window.innerWidth <= 1024)) {
        // Get all existing nav items
        const navItems = Array.from(rightNavbar.querySelectorAll('.nav-item-right'));
        console.log('Nav items found:', navItems.length);
        
        // Hide original nav items
        navItems.forEach(item => {
            item.style.display = 'none';
        });
        
        // Create hamburger button
        const hamburgerBtn = document.createElement('button');
        hamburgerBtn.className = 'mobile-hamburger-btn';
        hamburgerBtn.innerHTML = `
            <div class="hamburger-lines">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        // Add hamburger button to body (not navbar)
        document.body.appendChild(hamburgerBtn);
        console.log('Hamburger button created and added');
        
        // Create menu overlay
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu-overlay';
        
        const menuContent = document.createElement('div');
        menuContent.className = 'mobile-menu-content';
        
        // Clone nav items to menu
        navItems.forEach(item => {
            const menuItem = item.cloneNode(true);
            menuItem.style.display = 'flex';
            menuContent.appendChild(menuItem);
        });
        
        mobileMenu.appendChild(menuContent);
        document.body.appendChild(mobileMenu);
        console.log('Mobile menu created and added');
        
        // Toggle functionality
        let isMenuOpen = false;
        
        function toggleMenu() {
            console.log('Toggle menu called, current state:', isMenuOpen);
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                mobileMenu.classList.add('active');
                hamburgerBtn.classList.add('active');
                document.body.style.overflow = 'hidden';
                console.log('Menu opened');
            } else {
                mobileMenu.classList.remove('active');
                hamburgerBtn.classList.remove('active');
                document.body.style.overflow = '';
                console.log('Menu closed');
            }
            
            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        }
        
        // Hamburger button click
        hamburgerBtn.addEventListener('click', function(e) {
            console.log('Hamburger button clicked');
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close when clicking overlay
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                console.log('Overlay clicked, closing menu');
                toggleMenu();
            }
        });
        
        // Close when clicking menu items
        const menuItems = mobileMenu.querySelectorAll('.nav-item-right');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                console.log('Menu item clicked');
                setTimeout(() => toggleMenu(), 150);
            });
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 1024 && isMenuOpen) {
                toggleMenu();
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                toggleMenu();
            }
        });
        
        console.log('Hamburger menu setup complete');
    }
    
    // Debug main navigation hamburger
    const mainHamburger = document.getElementById('hamburger');
    const mainNavMenu = document.getElementById('nav-menu');
    
    console.log('Main hamburger found:', mainHamburger);
    console.log('Main nav menu found:', mainNavMenu);
    
    if (mainHamburger && mainNavMenu) {
        mainHamburger.addEventListener('click', function() {
            console.log('Main hamburger clicked');
            console.log('Nav menu classes before:', mainNavMenu.className);
            console.log('Nav menu has active class:', mainNavMenu.classList.contains('active'));
            
            // Force visibility for debugging
            mainNavMenu.style.display = 'flex';
            mainNavMenu.style.visibility = 'visible';
            mainNavMenu.style.opacity = '1';
            
            if (mainNavMenu.classList.contains('active')) {
                console.log('Closing menu');
                mainNavMenu.style.transform = 'translateX(-100%)';
            } else {
                console.log('Opening menu');
                mainNavMenu.style.transform = 'translateX(0)';
            }
        });
    }
    
    // Mobile gallery optimizations
    if (window.location.pathname.includes('gallery')) {
        // Enhanced tab switching for mobile
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');
        
        tabButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked button and corresponding panel
                this.classList.add('active');
                if (tabPanels[index]) {
                    tabPanels[index].classList.add('active');
                }
                
                // Haptic feedback
                if (navigator.vibrate) {
                    navigator.vibrate(30);
                }
                
                // Scroll to content on mobile
                if (window.innerWidth <= 768) {
                    setTimeout(() => {
                        tabPanels[index].scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 100);
                }
            });
        });
        
        // Swipe navigation for deployment scenarios
        let startX = 0;
        let currentTab = 0;
        const tabContent = document.querySelector('.tab-content');
        
        if (tabContent && isMobile) {
            tabContent.addEventListener('touchstart', function(e) {
                startX = e.touches[0].clientX;
            });
            
            tabContent.addEventListener('touchend', function(e) {
                const endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                
                if (Math.abs(diff) > 50) { // Minimum swipe distance
                    if (diff > 0 && currentTab < tabButtons.length - 1) {
                        // Swipe left - next tab
                        currentTab++;
                    } else if (diff < 0 && currentTab > 0) {
                        // Swipe right - previous tab
                        currentTab--;
                    }
                    
                    if (tabButtons[currentTab]) {
                        tabButtons[currentTab].click();
                    }
                }
            });
        }
    }
    
    // Performance optimizations for mobile
    if (isMobile) {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        // Reduce animations on low-end devices
        if (navigator.hardwareConcurrency <= 2) {
            document.body.classList.add('reduce-animations');
        }
        
        // Optimize scroll performance
        let ticking = false;
        function updateScrollElements() {
            // Update any scroll-dependent animations
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateScrollElements);
                ticking = true;
            }
        });
    }
    
    // iOS Safari specific fixes
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        // Fix 100vh issue
        function setVH() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', () => {
            setTimeout(setVH, 100);
        });
        
        // Prevent zoom on input focus
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                input.style.fontSize = '16px';
            });
            
            input.addEventListener('blur', function() {
                input.style.fontSize = '';
            });
        });
    }
    
    // Add loading states for better UX
    const buttons = document.querySelectorAll('.btn, .tab-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.style.pointerEvents = '';
                }, 1000);
            }
        });
    });
    
    // Accessibility improvements for mobile
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu on escape
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
    
    // Add focus management for keyboard navigation
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('keyboard-focus');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('keyboard-focus');
        });
    });
});

// Utility function to detect if device has notch (iPhone X and newer)
function hasNotch() {
    return (
        'CSS' in window &&
        CSS.supports('padding-top: env(safe-area-inset-top)')
    );
}

// Apply safe area padding for devices with notch
if (hasNotch()) {
    document.documentElement.style.setProperty('--safe-area-top', 'env(safe-area-inset-top)');
    document.documentElement.style.setProperty('--safe-area-bottom', 'env(safe-area-inset-bottom)');
}