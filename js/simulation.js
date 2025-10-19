// A.T.L.A.S Live Simulation JavaScript

class ATLASSimulation {
    constructor() {
        this.isRunning = false;
        this.targetCount = 2;
        this.fps = 30;
        this.range = 15.2;
        this.confidence1 = 96;
        this.confidence2 = 89;
        this.telemetryData = {
            latency: 12,
            range: 23.4,
            azimuth: 45,
            elevation: 12,
            power: 24.7
        };
        
        this.init();
    }
    
    init() {
        this.startSimulation();
        this.setupEventListeners();
    }
    
    startSimulation() {
        if (this.isRunning) return;
        this.isRunning = true;
        
        // Animate FPS counter
        this.animateFPS();
        
        // Animate target counters
        this.animateTargetCount();
        
        // Animate range display
        this.animateRange();
        
        // Animate confidence bars
        this.animateConfidence();
        
        // Animate telemetry data
        this.animateTelemetry();
        
        // Animate engagement protocol
        this.animateProtocol();
    }
    
    animateFPS() {
        const fpsElement = document.querySelector('.fps-counter');
        if (!fpsElement) return;
        
        setInterval(() => {
            const variation = Math.floor(Math.random() * 5) - 2; // ±2 variation
            const newFPS = Math.max(25, Math.min(35, this.fps + variation));
            fpsElement.textContent = newFPS;
        }, 1000);
    }
    
    animateTargetCount() {
        const targetElement = document.querySelector('.target-counter');
        if (!targetElement) return;
        
        setInterval(() => {
            const newCount = Math.floor(Math.random() * 4); // 0-3 targets
            targetElement.textContent = newCount;
            this.targetCount = newCount;
            
            // Update target visibility
            this.updateTargetVisibility(newCount);
        }, 3000);
    }
    
    updateTargetVisibility(count) {
        const targets = document.querySelectorAll('.target-box');
        targets.forEach((target, index) => {
            if (index < count) {
                target.style.display = 'block';
            } else {
                target.style.display = 'none';
            }
        });
    }
    
    animateRange() {
        const rangeElement = document.querySelector('.range-display');
        if (!rangeElement) return;
        
        setInterval(() => {
            const variation = (Math.random() - 0.5) * 2; // ±1 meter variation
            const newRange = Math.max(10, Math.min(25, this.range + variation));
            rangeElement.textContent = newRange.toFixed(1) + 'm';
        }, 1500);
    }
    
    animateConfidence() {
        const confidenceFills = document.querySelectorAll('.confidence-fill');
        const confidenceTexts = document.querySelectorAll('.confidence-text');
        
        setInterval(() => {
            confidenceFills.forEach((fill, index) => {
                const baseConfidence = index === 0 ? this.confidence1 : this.confidence2;
                const variation = Math.floor(Math.random() * 6) - 3; // ±3% variation
                const newConfidence = Math.max(80, Math.min(99, baseConfidence + variation));
                
                fill.style.width = newConfidence + '%';
                if (confidenceTexts[index]) {
                    confidenceTexts[index].textContent = newConfidence + '%';
                }
                
                // Update fill color based on confidence
                if (newConfidence < 85) {
                    fill.style.background = 'linear-gradient(90deg, #ff0000 0%, #ffaa00 100%)';
                } else if (newConfidence < 95) {
                    fill.style.background = 'linear-gradient(90deg, #ffaa00 0%, #00ff00 100%)';
                } else {
                    fill.style.background = 'linear-gradient(90deg, #00aa00 0%, #00ff00 100%)';
                }
            });
        }, 2000);
    }
    
    animateTelemetry() {
        const telemetryValues = document.querySelectorAll('.telem-value');
        
        setInterval(() => {
            telemetryValues.forEach((element, index) => {
                switch(index) {
                    case 0: // Latency
                        const newLatency = Math.max(8, Math.min(20, this.telemetryData.latency + (Math.random() - 0.5) * 4));
                        element.textContent = Math.round(newLatency) + 'ms';
                        this.telemetryData.latency = newLatency;
                        break;
                        
                    case 1: // Range
                        const newRange = Math.max(15, Math.min(30, this.telemetryData.range + (Math.random() - 0.5) * 3));
                        element.textContent = newRange.toFixed(1) + 'm';
                        this.telemetryData.range = newRange;
                        break;
                        
                    case 2: // Servo Position
                        const azVariation = Math.floor((Math.random() - 0.5) * 10);
                        const elVariation = Math.floor((Math.random() - 0.5) * 8);
                        const newAz = (this.telemetryData.azimuth + azVariation + 360) % 360;
                        const newEl = Math.max(-15, Math.min(45, this.telemetryData.elevation + elVariation));
                        element.textContent = `Az: ${newAz.toString().padStart(3, '0')}° El: ${newEl >= 0 ? '+' : ''}${newEl}°`;
                        this.telemetryData.azimuth = newAz;
                        this.telemetryData.elevation = newEl;
                        break;
                        
                    case 3: // Power
                        const newPower = Math.max(20, Math.min(30, this.telemetryData.power + (Math.random() - 0.5) * 2));
                        element.textContent = newPower.toFixed(1) + 'W';
                        this.telemetryData.power = newPower;
                        break;
                }
            });
        }, 1000);
    }
    
    animateProtocol() {
        const steps = document.querySelectorAll('.protocol-step');
        let currentStep = 2; // Start with "Calculating Trajectory" active
        
        setInterval(() => {
            // Reset all steps
            steps.forEach((step, index) => {
                step.classList.remove('completed', 'active', 'pending');
                
                if (index < currentStep) {
                    step.classList.add('completed');
                } else if (index === currentStep) {
                    step.classList.add('active');
                } else {
                    step.classList.add('pending');
                }
            });
            
            // Progress through steps
            currentStep = (currentStep + 1) % steps.length;
            
            // If we complete all steps, pause before restarting
            if (currentStep === 0) {
                setTimeout(() => {
                    currentStep = 2; // Start from calculating trajectory again
                }, 2000);
            }
        }, 3000);
    }
    
    setupEventListeners() {
        // Add click handlers for target boxes
        const targetBoxes = document.querySelectorAll('.target-box');
        targetBoxes.forEach((box, index) => {
            box.addEventListener('click', () => {
                this.highlightTarget(box, index);
            });
        });
        
        // Add hover effects for status items
        const statusItems = document.querySelectorAll('.status-item');
        statusItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.showStatusDetails(item);
            });
        });
    }
    
    highlightTarget(targetBox, index) {
        // Remove highlight from other targets
        document.querySelectorAll('.target-box').forEach(box => {
            box.style.borderColor = '#980000';
            box.style.boxShadow = 'none';
        });
        
        // Highlight selected target
        targetBox.style.borderColor = '#00ff00';
        targetBox.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.8)';
        
        // Update telemetry to focus on selected target
        setTimeout(() => {
            targetBox.style.borderColor = '#980000';
            targetBox.style.boxShadow = 'none';
        }, 2000);
    }
    
    showStatusDetails(statusItem) {
        const statusText = statusItem.querySelector('span').textContent;
        const tooltip = document.createElement('div');
        tooltip.className = 'status-tooltip';
        tooltip.innerHTML = this.getStatusDetails(statusText);
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = statusItem.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        tooltip.style.left = rect.right + 10 + 'px';
        tooltip.style.top = rect.top + 'px';
        tooltip.style.background = 'rgba(0, 0, 0, 0.9)';
        tooltip.style.color = '#FFFFFF';
        tooltip.style.padding = '8px 12px';
        tooltip.style.borderRadius = '6px';
        tooltip.style.fontSize = '11px';
        tooltip.style.border = '1px solid #980000';
        tooltip.style.zIndex = '1000';
        tooltip.style.maxWidth = '200px';
        
        // Remove tooltip on mouse leave
        statusItem.addEventListener('mouseleave', () => {
            tooltip.remove();
        });
    }
    
    getStatusDetails(statusText) {
        const details = {
            'Radar System': 'Active 360° scanning at 2.4GHz frequency. Detection range: 25m radius.',
            'Camera Feed': 'HD 1080p @ 30fps. Night vision capable. Auto-focus enabled.',
            'YOLOv11 Engine': 'AI processing with 17-point pose detection. 98.5% accuracy rate.',
            'Targeting System': 'Calculating shoulder center coordinates. Precision: ±2cm.',
            'Servo Motors': 'Pan/tilt positioning system. Response time: 50ms.',
            'Weapon System': 'Safety protocols active. Ready for engagement authorization.'
        };
        
        return details[statusText] || 'System operational.';
    }
}

// Initialize simulation when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Wait for simulation section to be visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                new ATLASSimulation();
                observer.disconnect(); // Start only once
            }
        });
    });
    
    const simulationSection = document.querySelector('.simulation-section');
    if (simulationSection) {
        observer.observe(simulationSection);
    }
});

// Add CSS for tooltip
const tooltipCSS = `
.status-tooltip {
    animation: tooltip-fade-in 0.3s ease-out;
}

@keyframes tooltip-fade-in {
    from {
        opacity: 0;
        transform: translateX(-10px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
`;

// Inject tooltip CSS
const style = document.createElement('style');
style.textContent = tooltipCSS;
document.head.appendChild(style);