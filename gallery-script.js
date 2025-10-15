// A.T.L.A.S Gallery JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery features
    initDemoAnimations();
    initModelViewer();
    initTabSystem();
    initGalleryAnimations();
    initInteractiveElements();
});

// Demo Animations
function initDemoAnimations() {
    const demoCards = document.querySelectorAll('.demo-card');
    
    demoCards.forEach((card, index) => {
        // Add hover effects for demo screens
        const demoScreen = card.querySelector('.demo-screen');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Enhance animations based on demo type
            if (card.dataset.demo === 'real-time') {
                enhanceRealtimeDemo(demoScreen);
            } else if (card.dataset.demo === 'tracking') {
                enhanceTrackingDemo(demoScreen);
            } else if (card.dataset.demo === 'precision') {
                enhancePrecisionDemo(demoScreen);
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            resetDemoAnimations(demoScreen);
        });
    });
}

function enhanceRealtimeDemo(screen) {
    const targetBox = screen.querySelector('.target-box');
    const statusDots = screen.querySelectorAll('.status-dot');
    
    if (targetBox) {
        targetBox.style.animation = 'targetBoxPulse 0.5s ease-in-out infinite';
    }
    
    statusDots.forEach(dot => {
        dot.style.animationDuration = '0.5s';
    });
    
    // Add scanning effect
    const scanLine = document.createElement('div');
    scanLine.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 2px;
        height: 100%;
        background: linear-gradient(to bottom, transparent, #980000, transparent);
        animation: scanHorizontal 1s linear infinite;
        z-index: 10;
    `;
    screen.appendChild(scanLine);
    
    setTimeout(() => {
        if (scanLine.parentNode) {
            scanLine.remove();
        }
    }, 3000);
}

function enhanceTrackingDemo(screen) {
    const pathPoints = screen.querySelectorAll('.path-point');
    const predictionCone = screen.querySelector('.prediction-cone');
    
    pathPoints.forEach((point, index) => {
        point.style.animationDuration = '0.3s';
        point.style.animationDelay = (index * 0.1) + 's';
    });
    
    if (predictionCone) {
        predictionCone.style.animationDuration = '1s';
    }
    
    // Add velocity vectors
    pathPoints.forEach((point, index) => {
        if (index < pathPoints.length - 1) {
            const vector = document.createElement('div');
            vector.style.cssText = `
                position: absolute;
                width: 20px;
                height: 2px;
                background: #980000;
                top: ${point.style.top};
                left: ${point.style.left};
                transform: rotate(45deg);
                opacity: 0.7;
                animation: vectorPulse 2s ease-in-out infinite;
                animation-delay: ${index * 0.2}s;
            `;
            screen.appendChild(vector);
            
            setTimeout(() => {
                if (vector.parentNode) {
                    vector.remove();
                }
            }, 3000);
        }
    });
}

function enhancePrecisionDemo(screen) {
    const hitMarkers = screen.querySelectorAll('.hit-marker');
    const accuracyCircle = screen.querySelector('.accuracy-circle');
    
    hitMarkers.forEach(marker => {
        marker.style.animationDuration = '0.5s';
    });
    
    if (accuracyCircle) {
        accuracyCircle.style.animation = 'accuracyPulse 1s ease-in-out infinite';
    }
    
    // Add precision grid overlay
    const precisionGrid = document.createElement('div');
    precisionGrid.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 150px;
        height: 150px;
        transform: translate(-50%, -50%);
        border: 1px solid rgba(152, 0, 0, 0.3);
        background: 
            repeating-linear-gradient(0deg, transparent, transparent 9px, rgba(152, 0, 0, 0.2) 9px, rgba(152, 0, 0, 0.2) 11px),
            repeating-linear-gradient(90deg, transparent, transparent 9px, rgba(152, 0, 0, 0.2) 9px, rgba(152, 0, 0, 0.2) 11px);
        animation: gridFade 2s ease-in-out infinite;
        pointer-events: none;
    `;
    screen.appendChild(precisionGrid);
    
    setTimeout(() => {
        if (precisionGrid.parentNode) {
            precisionGrid.remove();
        }
    }, 3000);
}

function resetDemoAnimations(screen) {
    // Remove any temporary elements
    const tempElements = screen.querySelectorAll('[style*="animation"]');
    tempElements.forEach(element => {
        if (element.classList.contains('temp-animation')) {
            element.remove();
        }
    });
}

// 3D Model Viewer
function initModelViewer() {
    const controlBtns = document.querySelectorAll('.control-btn');
    const turret3D = document.querySelector('.turret-3d');
    const componentItems = document.querySelectorAll('.component-item');
    
    // Model view controls
    controlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            controlBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            changeModelView(turret3D, view);
        });
    });
    
    // Component highlighting
    componentItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            componentItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const component = this.dataset.component;
            highlightComponent(turret3D, component);
        });
    });
    
    // Auto-rotate toggle
    let autoRotate = true;
    turret3D.addEventListener('click', function() {
        autoRotate = !autoRotate;
        
        if (autoRotate) {
            this.style.animation = 'rotate3D 20s linear infinite';
        } else {
            this.style.animation = 'none';
        }
    });
}

function changeModelView(turret, view) {
    let transform = '';
    
    switch(view) {
        case 'front':
            transform = 'rotateY(0deg) rotateX(0deg)';
            break;
        case 'side':
            transform = 'rotateY(90deg) rotateX(0deg)';
            break;
        case 'top':
            transform = 'rotateY(0deg) rotateX(-60deg)';
            break;
        case 'iso':
            transform = 'rotateY(45deg) rotateX(-15deg)';
            break;
    }
    
    turret.style.animation = 'none';
    turret.style.transform = transform;
    turret.style.transition = 'transform 1s ease-in-out';
    
    // Resume auto-rotation after 3 seconds
    setTimeout(() => {
        turret.style.animation = 'rotate3D 20s linear infinite';
        turret.style.transition = '';
    }, 3000);
}

function highlightComponent(turret, component) {
    // Remove existing highlights
    const existingHighlights = turret.querySelectorAll('.component-highlight');
    existingHighlights.forEach(h => h.remove());
    
    // Add highlight to specific component
    const componentElement = turret.querySelector(`.${component}-module, .${component}-assembly, .${component}-platform, .${component}-unit`);
    
    if (componentElement) {
        componentElement.style.boxShadow = '0 0 20px #980000';
        componentElement.style.transform = 'scale(1.1)';
        componentElement.style.transition = 'all 0.3s ease';
        
        // Reset highlight after 2 seconds
        setTimeout(() => {
            componentElement.style.boxShadow = '';
            componentElement.style.transform = '';
        }, 2000);
    }
    
    // Add info popup
    showComponentInfo(component);
}

function showComponentInfo(component) {
    const infoData = {
        camera: {
            title: 'Camera Module',
            specs: ['12MP Resolution', '1080p@50fps', 'IR Sensitivity', 'Auto-focus'],
            description: 'High-resolution camera with infrared capability for day/night operations.'
        },
        laser: {
            title: 'Laser Assembly',
            specs: ['650nm Wavelength', '5mW Power', 'Class 3R', '<2 mrad Divergence'],
            description: 'Precision laser targeting system with eye-safe power levels.'
        },
        servo: {
            title: 'Servo Motors',
            specs: ['Digital Control', '0.1° Precision', '180° Range', '0.2s Speed'],
            description: 'High-precision servo motors for accurate positioning and tracking.'
        },
        control: {
            title: 'Control Unit',
            specs: ['ARM Cortex-A76', '8GB RAM', 'WiFi 6', 'Real-time OS'],
            description: 'Powerful embedded computer running the AI detection and control algorithms.'
        }
    };
    
    const info = infoData[component];
    if (!info) return;
    
    // Remove existing popup
    const existingPopup = document.querySelector('.component-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    // Create new popup
    const popup = document.createElement('div');
    popup.className = 'component-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h4>${info.title}</h4>
            <p>${info.description}</p>
            <ul class="spec-list">
                ${info.specs.map(spec => `<li>${spec}</li>`).join('')}
            </ul>
            <button class="popup-close">×</button>
        </div>
    `;
    
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.95);
        border: 2px solid #980000;
        border-radius: 10px;
        padding: 2rem;
        z-index: 1000;
        color: #FFFFFF;
        max-width: 400px;
        animation: popupFadeIn 0.3s ease-out;
    `;
    
    document.body.appendChild(popup);
    
    // Close popup functionality
    const closeBtn = popup.querySelector('.popup-close');
    closeBtn.addEventListener('click', () => popup.remove());
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (popup.parentNode) {
            popup.remove();
        }
    }, 5000);
}

// Tab System
function initTabSystem() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all buttons and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab + '-tab').classList.add('active');
            
            // Animate tab change
            animateTabChange(targetTab);
        });
    });
}

function animateTabChange(tabName) {
    const activePanel = document.getElementById(tabName + '-tab');
    const scenarioVisual = activePanel.querySelector('.scenario-visual');
    
    // Add specific animations based on scenario
    if (scenarioVisual) {
        scenarioVisual.style.animation = 'none';
        scenarioVisual.offsetHeight; // Trigger reflow
        scenarioVisual.style.animation = 'scenarioFadeIn 0.8s ease-out';
        
        // Add scenario-specific elements
        addScenarioElements(scenarioVisual, tabName);
    }
}

function addScenarioElements(visual, scenario) {
    // Clear existing scenario elements
    const existingElements = visual.querySelectorAll('.scenario-element');
    existingElements.forEach(el => el.remove());
    
    switch(scenario) {
        case 'border':
            addBorderElements(visual);
            break;
        case 'base':
            addBaseElements(visual);
            break;
        case 'tactical':
            addTacticalElements(visual);
            break;
        case 'urban':
            addUrbanElements(visual);
            break;
    }
}

function addBorderElements(visual) {
    // Add border fence animation
    const fence = document.createElement('div');
    fence.className = 'scenario-element border-fence-anim';
    fence.style.cssText = `
        position: absolute;
        bottom: 20%;
        left: 0;
        width: 100%;
        height: 2px;
        background: repeating-linear-gradient(90deg, #666666, #666666 10px, transparent 10px, transparent 20px);
        animation: fenceGlow 3s ease-in-out infinite;
    `;
    visual.appendChild(fence);
    
    // Add detection zones
    for (let i = 0; i < 3; i++) {
        const zone = document.createElement('div');
        zone.className = 'scenario-element detection-zone';
        zone.style.cssText = `
            position: absolute;
            top: ${30 + i * 20}%;
            left: ${20 + i * 25}%;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(152, 0, 0, 0.5);
            border-radius: 50%;
            animation: detectionPulse 2s ease-in-out infinite;
            animation-delay: ${i * 0.5}s;
        `;
        visual.appendChild(zone);
    }
}

function addBaseElements(visual) {
    // Add guard towers
    for (let i = 0; i < 4; i++) {
        const tower = document.createElement('div');
        tower.className = 'scenario-element guard-tower';
        tower.style.cssText = `
            position: absolute;
            top: ${20 + (i % 2) * 60}%;
            left: ${15 + (i % 2) * 70}%;
            width: 15px;
            height: 30px;
            background: linear-gradient(to top, #333333, #666666);
            border-radius: 2px;
            animation: towerBlink 3s ease-in-out infinite;
            animation-delay: ${i * 0.7}s;
        `;
        visual.appendChild(tower);
        
        // Add tower light
        const light = document.createElement('div');
        light.className = 'scenario-element tower-light';
        light.style.cssText = `
            position: absolute;
            top: -5px;
            left: 50%;
            width: 6px;
            height: 6px;
            background: #980000;
            border-radius: 50%;
            transform: translateX(-50%);
            animation: lightFlash 2s ease-in-out infinite;
            animation-delay: ${i * 0.7}s;
        `;
        tower.appendChild(light);
    }
}

function addTacticalElements(visual) {
    // Add mobile unit
    const mobileUnit = document.createElement('div');
    mobileUnit.className = 'scenario-element mobile-unit';
    mobileUnit.style.cssText = `
        position: absolute;
        top: 60%;
        left: 20%;
        width: 30px;
        height: 15px;
        background: linear-gradient(45deg, #444444, #777777);
        border-radius: 3px;
        animation: mobileMove 4s ease-in-out infinite;
    `;
    visual.appendChild(mobileUnit);
    
    // Add tactical grid
    const grid = document.createElement('div');
    grid.className = 'scenario-element tactical-grid';
    grid.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: 
            repeating-linear-gradient(0deg, transparent, transparent 25px, rgba(152, 0, 0, 0.1) 25px, rgba(152, 0, 0, 0.1) 27px),
            repeating-linear-gradient(90deg, transparent, transparent 25px, rgba(152, 0, 0, 0.1) 25px, rgba(152, 0, 0, 0.1) 27px);
        animation: gridPulse 3s ease-in-out infinite;
    `;
    visual.appendChild(grid);
}

function addUrbanElements(visual) {
    // Add buildings
    for (let i = 0; i < 5; i++) {
        const building = document.createElement('div');
        building.className = 'scenario-element urban-building';
        building.style.cssText = `
            position: absolute;
            bottom: 20%;
            left: ${10 + i * 15}%;
            width: 12px;
            height: ${20 + Math.random() * 30}px;
            background: linear-gradient(to top, #222222, #555555);
            border-radius: 1px 1px 0 0;
            animation: buildingGlow 4s ease-in-out infinite;
            animation-delay: ${i * 0.3}s;
        `;
        visual.appendChild(building);
    }
    
    // Add surveillance points
    for (let i = 0; i < 3; i++) {
        const point = document.createElement('div');
        point.className = 'scenario-element surveillance-point';
        point.style.cssText = `
            position: absolute;
            top: ${30 + i * 20}%;
            left: ${25 + i * 25}%;
            width: 8px;
            height: 8px;
            background: #980000;
            border-radius: 50%;
            animation: surveillanceBlink 2s ease-in-out infinite;
            animation-delay: ${i * 0.4}s;
        `;
        visual.appendChild(point);
    }
}

// Gallery Animations
function initGalleryAnimations() {
    // Animate testing summary cards
    const summaryCards = document.querySelectorAll('.summary-card');
    summaryCards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.2) + 's';
        
        // Add counter animation to summary values
        const valueElement = card.querySelector('.summary-value');
        if (valueElement) {
            animateCounterValue(valueElement);
        }
    });
    
    // Animate test results on scroll
    const testResults = document.querySelectorAll('.test-result');
    const testObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'testResultSlide 0.6s ease-out forwards';
                testObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    testResults.forEach(result => {
        testObserver.observe(result);
    });
}

function animateCounterValue(element) {
    const text = element.textContent;
    const numMatch = text.match(/[\d.]+/);
    
    if (numMatch) {
        const targetValue = parseFloat(numMatch[0]);
        const suffix = text.replace(numMatch[0], '');
        const prefix = text.substring(0, text.indexOf(numMatch[0]));
        
        let currentValue = 0;
        const increment = targetValue / 50;
        const duration = 2000; // 2 seconds
        const intervalTime = duration / 50;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(counter);
            }
            
            element.textContent = prefix + currentValue.toFixed(1) + suffix;
        }, intervalTime);
    }
}

// Interactive Elements
function initInteractiveElements() {
    // Add click effects to demo cards
    const demoCards = document.querySelectorAll('.demo-card');
    demoCards.forEach(card => {
        card.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'demo-ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(152, 0, 0, 0.3);
                transform: scale(0);
                animation: demoRipple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (rect.width / 2 - size / 2) + 'px';
            ripple.style.top = (rect.height / 2 - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add hover sound effects (visual feedback)
    const interactiveElements = document.querySelectorAll('.control-btn, .tab-btn, .component-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Add custom CSS animations
const galleryAnimations = document.createElement('style');
galleryAnimations.textContent = `
    @keyframes popupFadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    
    @keyframes scenarioFadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fenceGlow {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; box-shadow: 0 0 10px rgba(152, 0, 0, 0.5); }
    }
    
    @keyframes detectionPulse {
        0%, 100% { transform: scale(1); opacity: 0.5; }
        50% { transform: scale(1.3); opacity: 1; }
    }
    
    @keyframes towerBlink {
        0%, 100% { opacity: 0.8; }
        50% { opacity: 1; transform: scale(1.1); }
    }
    
    @keyframes lightFlash {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; box-shadow: 0 0 15px #980000; }
    }
    
    @keyframes mobileMove {
        0%, 100% { left: 20%; }
        50% { left: 70%; }
    }
    
    @keyframes gridPulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.8; }
    }
    
    @keyframes buildingGlow {
        0%, 100% { opacity: 0.7; }
        50% { opacity: 1; box-shadow: 0 0 5px rgba(152, 0, 0, 0.3); }
    }
    
    @keyframes surveillanceBlink {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.5); box-shadow: 0 0 10px #980000; }
    }
    
    @keyframes testResultSlide {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes demoRipple {
        to { transform: scale(4); opacity: 0; }
    }
    
    @keyframes vectorPulse {
        0%, 100% { opacity: 0.7; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
    }
    
    @keyframes accuracyPulse {
        0%, 100% { border-color: #980000; }
        50% { border-color: #ff4444; box-shadow: 0 0 20px rgba(152, 0, 0, 0.5); }
    }
    
    @keyframes gridFade {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.8; }
    }
    
    .popup-content {
        text-align: left;
    }
    
    .popup-content h4 {
        color: #980000;
        margin-bottom: 1rem;
        font-size: 1.3rem;
    }
    
    .popup-content p {
        margin-bottom: 1rem;
        line-height: 1.6;
    }
    
    .spec-list {
        list-style: none;
        padding: 0;
        margin-bottom: 1rem;
    }
    
    .spec-list li {
        padding: 0.3rem 0;
        color: rgba(255, 255, 255, 0.8);
        position: relative;
        padding-left: 1rem;
    }
    
    .spec-list li::before {
        content: '▶';
        color: #980000;
        position: absolute;
        left: 0;
        font-size: 0.8rem;
    }
    
    .popup-close {
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        color: #980000;
        font-size: 1.5rem;
        cursor: pointer;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .popup-close:hover {
        background: rgba(152, 0, 0, 0.2);
        color: #FFFFFF;
    }
`;

document.head.appendChild(galleryAnimations);