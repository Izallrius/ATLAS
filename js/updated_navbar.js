// Right Side Navigation Bar for ALL A.T.L.A.S Pages

document.addEventListener('DOMContentLoaded', function() {
    // Create navbar on ALL pages (removed page restriction)
    createRightNavbar();
    createPageOverlay();
    bindNavbarEvents();
});

function createRightNavbar() {
    // Remove existing navbar if it exists
    const existingNav = document.querySelector('.right-navbar');
    if (existingNav) {
        existingNav.remove();
    }

    const navbar = document.createElement('div');
    navbar.className = 'right-navbar';
    navbar.id = 'rightNavbar';
    
    const currentPage = getCurrentPageName();
    const pages = {
        'index.html': { name: 'Home', icon: '🏠' },
        'gallery.html': { name: 'Gallery', icon: '🎨' },
        'documentation.html': { name: 'Documentation', icon: '📚' }
    };
    
    Object.entries(pages).forEach(([page, data]) => {
        const navItem = document.createElement('div');
        navItem.className = `nav-item-right ${page === currentPage ? 'active' : ''}`;
        navItem.setAttribute('data-page', page);
        navItem.setAttribute('title', data.name);
        
        navItem.innerHTML = `
            <div class="nav-icon-right"></div>
            <span class="nav-text-right">${data.name}</span>
        `;
        
        navbar.appendChild(navItem);
    });
    
    document.body.appendChild(navbar);
}

function getCurrentPageName() {
    const path = window.location.pathname;
    let filename = path.split('/').pop() || 'index.html';
    if (filename === '' || filename === '/') {
        filename = 'index.html';
    }
    return filename;
}

function createPageOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'page-overlay';
    overlay.id = 'pageOverlay';
    
    overlay.innerHTML = `
        <div class="overlay-content">
            <div class="loading-radar"></div>
            <div class="loading-title">Loading A.T.L.A.S</div>
            <div class="loading-subtitle">Initializing Defense Systems...</div>
        </div>
    `;

    document.body.appendChild(overlay);
}

function bindNavbarEvents() {
    document.addEventListener('click', (e) => {
        const navItem = e.target.closest('.nav-item-right');
        if (navItem) {
            const targetPage = navItem.dataset.page;
            const currentPage = getCurrentPageName();
            
            if (targetPage !== currentPage) {
                navigateToPage(targetPage);
            }
        }
    });
}

function navigateToPage(targetPage) {
    const overlay = document.querySelector('.page-overlay');
    const loadingTitle = overlay.querySelector('.loading-title');
    const loadingSubtitle = overlay.querySelector('.loading-subtitle');
    
    const pageData = {
        'index.html': { title: 'A.T.L.A.S Home', subtitle: 'Initializing Defense Systems...' },
        'gallery.html': { title: 'System Gallery', subtitle: 'Loading Demonstration Modules...' },
        'documentation.html': { title: 'Technical Documentation', subtitle: 'Accessing Technical Database...' }
    };
    
    const data = pageData[targetPage];
    if (data) {
        loadingTitle.textContent = `Loading ${data.title}`;
        loadingSubtitle.textContent = data.subtitle;
    }
    
    // Show overlay
    overlay.classList.add('active');
    
    // Navigate after delay
    setTimeout(() => {
        window.location.href = targetPage;
    }, 1500);
}