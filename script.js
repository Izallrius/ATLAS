// A.T.L.A.S Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Scroll animations
    initScrollAnimations();
    
    // Interactive elements
    initInteractiveElements();
    
    // Performance monitoring
    initPerformanceOptimizations();
    
    // Hero section animations
    initHeroAnimations();
    
    // Workflow animations
    initWorkflowAnimations();
    
    // Form handling
    initFormHandling();
});

// Navigation Functions
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = '';
                bar.style.opacity = '';
            }
        });
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger animation
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = '';
                bar.style.opacity = '';
            });
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for tech cards
                if (entry.target.classList.contains('tech-card')) {
                    const delay = parseInt(entry.target.dataset.delay) || 0;
                    entry.target.style.animationDelay = delay + 'ms';
                }
                
                // Add workflow step animation
                if (entry.target.classList.contains('workflow-step')) {
                    const stepNumber = entry.target.dataset.step;
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                        animateWorkflowStep(entry.target, stepNumber);
                    }, stepNumber * 200);
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(`
        .tech-card,
        .feature-item,
        .spec-category,
        .workflow-step,
        .contact-content
    `);

    animatedElements.forEach(element => {
        element.classList.add('fade-in-up');
        observer.observe(element);
    });
}

// Interactive Elements
function initInteractiveElements() {
    // Tech card hover effects
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(152, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Specification items interactive effects
    const specItems = document.querySelectorAll('.spec-item');
    specItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(152, 0, 0, 0.15)';
            this.style.borderLeftWidth = '5px';
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.borderLeftWidth = '';
            this.style.transform = '';
        });
    });

    // Button click effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Hero Animations
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const rotatingSystem = document.querySelector('.rotating-system');

    // PREVENT CSS animations from running first
    if (heroDescription) {
        heroDescription.style.opacity = '0';
        heroDescription.style.transform = 'translateY(20px)';
    }
    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(20px)';
    }

    // Typewriter effect for title (text only)
    if (heroTitle) {
        const spans = heroTitle.querySelectorAll('span');
        const titleLine = spans[0];
        const subtitle = spans[1];
        
        // Hide subtitle initially
        if (subtitle) {
            subtitle.style.opacity = '0';
            subtitle.style.transform = 'translateY(20px)';
        }
        
        if (titleLine) {
            titleLine.innerHTML = '';
            heroTitle.style.opacity = '1';
            
            const textOnly = 'A.T.L.A.S';
            let currentHTML = '';
            
            let i = 0;
            function typeWriter() {
                if (i < textOnly.length) {
                    if (i === 2) {
                        // Add the T with highlight class
                        currentHTML += '<span class="highlight">T</span>';
                    } else {
                        currentHTML += textOnly.charAt(i);
                    }
                    titleLine.innerHTML = currentHTML;
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Show subtitle after main text with smooth transition
                    setTimeout(() => {
                        if (subtitle) {
                            subtitle.style.transition = 'all 0.6s ease-out';
                            subtitle.style.opacity = '1';
                            subtitle.style.transform = 'translateY(0)';
                        }
                        
                        // Show description
                        if (heroDescription) {
                            heroDescription.style.transition = 'all 0.8s ease-out';
                            heroDescription.style.opacity = '1';
                            heroDescription.style.transform = 'translateY(0)';
                        }
                        
                        // Show buttons
                        setTimeout(() => {
                            if (heroButtons) {
                                heroButtons.style.transition = 'all 0.8s ease-out';
                                heroButtons.style.opacity = '1';
                                heroButtons.style.transform = 'translateY(0)';
                            }
                        }, 200);
                    }, 300);
                }
            }
            
            setTimeout(typeWriter, 500);
        }
    }
    // Enhanced rotating system animation
    if (rotatingSystem) {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX / window.innerWidth - 0.5;
            mouseY = e.clientY / window.innerHeight - 0.5;
            
            rotatingSystem.style.transform = `
                translate(${mouseX * 20}px, ${mouseY * 20}px)
                perspective(1000px)
                rotateY(${mouseX * 10}deg)
                rotateX(${mouseY * 10}deg)
            `;
        });
    }

    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Workflow Animations
function initWorkflowAnimations() {
    function animateWorkflowStep(step, stepNumber) {
        const circle = step.querySelector('.step-circle');
        const content = step.querySelector('.step-content');
        
        // Animate circle
        circle.style.animation = 'pulse 0.6s ease-out, glow 2s ease-in-out infinite';
        
        // Animate content
        setTimeout(() => {
            content.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }, 300);
        
        // Add connecting line animation
        const nextArrow = step.nextElementSibling;
        if (nextArrow && nextArrow.classList.contains('workflow-arrow')) {
            setTimeout(() => {
                nextArrow.style.animation = 'fadeInRight 0.6s ease-out forwards';
                nextArrow.style.transform = 'scaleX(0)';
                nextArrow.style.transformOrigin = 'left center';
                
                setTimeout(() => {
                    nextArrow.style.transform = 'scaleX(1)';
                    nextArrow.style.transition = 'transform 0.8s ease-out';
                }, 100);
            }, 400);
        }
    }
    
    // Workflow step click interactions
    const workflowSteps = document.querySelectorAll('.workflow-step');
    workflowSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            // Remove active class from all steps
            workflowSteps.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked step
            this.classList.add('active');
            
            // Enhanced animation for active step
            const circle = this.querySelector('.step-circle');
            circle.style.animation = 'pulse 0.3s ease-out, glow 3s ease-in-out infinite';
            circle.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                circle.style.transform = '';
            }, 300);
        });
    });
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy loading for feature visuals
    const featureVisuals = document.querySelectorAll('.feature-visual');
    
    const visualObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const visual = entry.target;
                visual.classList.add('loaded');
                
                // Add specific animations based on visual type
                if (visual.querySelector('.realtime-demo')) {
                    startRealtimeDemo(visual.querySelector('.realtime-demo'));
                }
                if (visual.querySelector('.weather-demo')) {
                    startWeatherDemo(visual.querySelector('.weather-demo'));
                }
                if (visual.querySelector('.safety-demo')) {
                    startSafetyDemo(visual.querySelector('.safety-demo'));
                }
                
                visualObserver.unobserve(visual);
            }
        });
    });
    
    featureVisuals.forEach(visual => {
        visualObserver.observe(visual);
    });
    
    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 16); // ~60fps
    });
    
    function handleScroll() {
        // Update scroll-dependent animations
        updateParallaxElements();
        updateProgressIndicators();
    }
}

// Demo Animations
function startRealtimeDemo(demo) {
    // Create scanning lines
    for (let i = 0; i < 5; i++) {
        const line = document.createElement('div');
        line.style.cssText = `
            position: absolute;
            top: ${20 + i * 15}%;
            left: 0;
            width: 0;
            height: 2px;
            background: #980000;
            animation: laserCharge 2s ease-in-out infinite;
            animation-delay: ${i * 0.3}s;
        `;
        demo.appendChild(line);
    }
}

function startWeatherDemo(demo) {
    // Create weather particles
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            top: -10px;
            left: ${Math.random() * 100}%;
            width: 2px;
            height: 10px;
            background: rgba(152, 0, 0, 0.6);
            animation: digitalRain 3s linear infinite;
            animation-delay: ${Math.random() * 3}s;
        `;
        demo.appendChild(particle);
    }
}

function startSafetyDemo(demo) {
    // Create warning indicators
    const indicators = ['⚠', '🔒', '🛡'];
    indicators.forEach((symbol, index) => {
        const indicator = document.createElement('div');
        indicator.textContent = symbol;
        indicator.style.cssText = `
            position: absolute;
            top: ${30 + index * 20}%;
            left: ${20 + index * 25}%;
            font-size: 1.5rem;
            color: #980000;
            animation: pulse 2s ease-in-out infinite;
            animation-delay: ${index * 0.5}s;
        `;
        demo.appendChild(indicator);
    });
}

// Form Handling
function initFormHandling() {
    const form = document.querySelector('.defense-inquiry');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateForm(data)) {
                // Show loading state
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Processing...';
                submitButton.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    showSuccessMessage();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    this.reset();
                }, 2000);
            }
        });
    }
}

function validateForm(data) {
    const requiredFields = ['organization', 'email', 'department', 'requirements'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = document.querySelector(`[name="${field}"]`);
        if (!data[field] || data[field].trim() === '') {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });
    
    // Email validation
    if (data.email && !isValidEmail(data.email)) {
        const emailInput = document.querySelector('[name="email"]');
        showFieldError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(input, message) {
    clearFieldError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #980000;
        font-size: 0.8rem;
        margin-top: 0.5rem;
        animation: fadeInUp 0.3s ease-out;
    `;
    
    input.style.borderColor = '#980000';
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
}

function clearFieldError(input) {
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    input.style.borderColor = '';
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: #FFFFFF;
            padding: 2rem;
            border-radius: 10px;
            border: 2px solid #980000;
            text-align: center;
            z-index: 10000;
            animation: fadeInUp 0.5s ease-out;
        ">
            <h3 style="color: #980000; margin-bottom: 1rem;">Inquiry Submitted</h3>
            <p>Thank you for your interest in A.T.L.A.S technology.<br>
            Our defense team will contact you within 24 hours.</p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="
                        margin-top: 1rem;
                        padding: 0.5rem 1rem;
                        background: #980000;
                        color: #FFFFFF;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                    ">Close</button>
        </div>
    `;
    
    document.body.appendChild(message);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);
}

// Utility Functions
function updateParallaxElements() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

function updateProgressIndicators() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .field-error {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(rippleStyle);