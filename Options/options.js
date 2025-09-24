/**
 * AgriSense AI - Options Page JavaScript
 * Handles navigation to analytics pages and user interactions
 */

// Analytics page routes - UPDATED TO MATCH FILE STRUCTURE
const ANALYTICS_ROUTES = {
    'soil-moisture': '../soil_moisture/soil-moisture.html',
    'leaf-wetness': '../leaf_wetness_analytics/leaf-wetness.html', 
    'crop-health': '../crop_health_analytics/crop-health.html',
    'soil-temperature': '../soil_temperature_analytics/soil-temperature.html',
    'reports': '../full_reports/reports.html'
};

// Navigation function
function navigateToAnalytics(analyticsType) {
    if (!ANALYTICS_ROUTES[analyticsType]) {
        console.error(`Unknown analytics type: ${analyticsType}`);
        showNotification('Analytics page not found', 'error');
        return;
    }

    // Show loading state
    showLoadingState(analyticsType);
    
    // Add transition effect
    document.body.style.opacity = '0.8';
    
    // Navigate after animation
    setTimeout(() => {
        window.location.href = ANALYTICS_ROUTES[analyticsType];
    }, 300);
}

// Show loading state on clicked card
function showLoadingState(analyticsType) {
    const card = document.querySelector(`[data-analytics="${analyticsType}"]`);
    if (card) {
        const cta = card.querySelector('.card-cta');
        if (cta) {
            cta.textContent = 'Loading...';
            card.style.pointerEvents = 'none';
            card.style.opacity = '0.7';
        }
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        ${message}
        <span style="cursor: pointer; margin-left: 10px;" onclick="this.parentElement.remove()">✕</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#FF4444' : '#2CFF05'};
        color: ${type === 'error' ? '#FFFFFF' : '#000000'};
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
}

// Add animation styles
function addAnimationStyles() {
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced card interactions
function initCardInteractions() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        // Keyboard navigation
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const analyticsType = card.dataset.analytics;
                navigateToAnalytics(analyticsType);
            }
        });

        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            // Add subtle animation to other cards
            cards.forEach((otherCard, otherIndex) => {
                if (otherIndex !== index) {
                    otherCard.style.opacity = '0.7';
                    otherCard.style.transform = 'scale(0.95)';
                }
            });
        });

        card.addEventListener('mouseleave', () => {
            // Reset other cards
            cards.forEach((otherCard) => {
                otherCard.style.opacity = '1';
                otherCard.style.transform = 'scale(1)';
            });
        });

        // Add ripple effect on click
        card.addEventListener('click', (e) => {
            createRippleEffect(card, e);
            
            // Get analytics type and navigate
            const analyticsType = card.dataset.analytics;
            if (analyticsType) {
                navigateToAnalytics(analyticsType);
            }
        });

        // Staggered entrance animation
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Ripple effect function
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;

    // Add ripple animation if not exists
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

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Initialize entrance animations
function initEntranceAnimations() {
    const cards = document.querySelectorAll('.card');
    
    // Set initial state
    cards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Check user session
function checkUserSession() {
    const user = sessionStorage.getItem('user');
    if (!user) {
        console.log('No user session found, but continuing...');
        // In a real app, you might redirect to login
        // window.location.href = '../login_page/login.html';
    } else {
        try {
            const userData = JSON.parse(user);
            console.log(`Welcome back, ${userData.username}!`);
            // Show welcome notification
            setTimeout(() => {
                showNotification(`Welcome back, ${userData.username}!`, 'info');
            }, 500);
        } catch (e) {
            console.error('Error parsing user session:', e);
        }
    }
}

// Initialize page
function initOptionsPage() {
    console.log('🌾 AgriSense Options Page loaded successfully!');
    
    // Check user session
    checkUserSession();
    
    // Add animation styles
    addAnimationStyles();
    
    // Initialize entrance animations
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        initEntranceAnimations();
    }
    
    // Initialize card interactions
    initCardInteractions();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // ESC key to go back
        if (e.key === 'Escape') {
            window.location.href = '../Landing_Page/landing.html';
        }
        
        // Number keys (1-5) for quick navigation
        const numKey = parseInt(e.key);
        if (numKey >= 1 && numKey <= 5) {
            const cards = document.querySelectorAll('.card');
            if (cards[numKey - 1]) {
                const analyticsType = cards[numKey - 1].dataset.analytics;
                navigateToAnalytics(analyticsType);
            }
        }
    });
    
    // Performance monitoring
    const loadTime = performance.now();
    console.log(`📊 Options page loaded in ${loadTime.toFixed(2)}ms`);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOptionsPage);
} else {
    initOptionsPage();
}

// Error handling
window.addEventListener('error', (event) => {
    console.error('Options page error:', event.error);
    showNotification('An error occurred. Please try again.', 'error');
});

// Export for use in other scripts
window.AgriSenseOptions = {
    navigateToAnalytics,
    showNotification
};
