/**
 * AgriSense AI - Landing Page JavaScript
 * Handles navigation, animations, and user interactions
 */

// Navigation Functions
function navigateToLogin() {
    // Add smooth transition effect
    document.body.style.opacity = '0.8';
    
    setTimeout(() => {
        window.location.href = '../login_page/login.html';
    }, 300);
}

function navigateToOptions() {
    // Add smooth transition effect
    document.body.style.opacity = '0.8';
    
    setTimeout(() => {
        window.location.href = '../Options/options.html';
    }, 300);
}

// Enhanced Button Interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Add click sound effect (optional - uncomment if you have audio files)
    function playClickSound() {
        // const clickSound = new Audio('../shared/audio/click.mp3');
        // clickSound.volume = 0.3;
        // clickSound.play().catch(e => console.log('Audio play failed:', e));
    }
    
    // Enhanced CTA Container interactions
    const ctaContainer = document.querySelector('.cta-container');
    if (ctaContainer) {
        ctaContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        ctaContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        ctaContainer.addEventListener('click', function() {
            playClickSound();
            // Add ripple effect
            createRippleEffect(this, event);
        });
    }
    
    // Enhanced Primary CTA interactions
    const primaryCta = document.querySelector('.primary-cta');
    if (primaryCta) {
        primaryCta.addEventListener('mouseenter', function() {
            const arrow = this.querySelector('.arrow');
            if (arrow) {
                arrow.style.transform = 'translateX(8px) scale(1.1)';
            }
        });
        
        primaryCta.addEventListener('mouseleave', function() {
            const arrow = this.querySelector('.arrow');
            if (arrow) {
                arrow.style.transform = 'translateX(0) scale(1)';
            }
        });
        
        primaryCta.addEventListener('click', function() {
            playClickSound();
            createRippleEffect(this, event);
        });
    }
    
    // Ripple Effect Function
    function createRippleEffect(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        // Add ripple animation keyframes if not already added
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Smooth scroll animations on page load
    function initAnimations() {
        const elements = [
            { selector: '.hero-heading', delay: 200 },
            { selector: '.hero-subtext', delay: 400 },
            { selector: '.primary-cta', delay: 600 },
            { selector: '.right-card', delay: 800 }
        ];
        
        elements.forEach(({ selector, delay }) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }
    
    // Initialize animations if reduced motion is not preferred
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        initAnimations();
    }
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            if (event.target.classList.contains('cta-container')) {
                event.preventDefault();
                navigateToLogin();
            } else if (event.target.classList.contains('primary-cta')) {
                event.preventDefault();
                navigateToOptions();
            }
        }
    });
    
    // Performance optimization - Lazy load background image
    const bgHero = document.querySelector('.bg-hero');
    if (bgHero && 'loading' in HTMLImageElement.prototype) {
        bgHero.loading = 'eager'; // High priority for hero image
    }
    
    console.log('🌱 AgriSense AI Landing Page loaded successfully!');
});

// Error handling for navigation
window.addEventListener('error', function(event) {
    console.error('Landing page error:', event.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    // Log page load time for optimization
    const loadTime = performance.now();
    console.log(`📊 Page loaded in ${loadTime.toFixed(2)}ms`);
});
