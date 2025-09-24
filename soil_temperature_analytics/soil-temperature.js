/**
 * AgriSense AI - Soil Temperature Analytics
 * Simple functionality matching Figma design
 */

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌡️ Soil Temperature Analytics loaded!');
    addInteractivity();
});
/**
 * AgriSense AI - Soil Temperature Analytics
 * Simple functionality matching Figma design
 */

// ADD THIS NAVIGATION CODE AT THE BEGINNING
// Navigation to landing page
function navigateToLanding() {
    // Add transition effect
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0.8';
    
    // Navigate after animation
    setTimeout(() => {
        window.location.href = '../Landing_Page/landing.html';
    }, 300);
}

// Enhanced header interactions
function initHeaderInteractions() {
    const brandLink = document.querySelector('.brand-link');
    const logo = document.querySelector('.logo');
    
    if (brandLink) {
        brandLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToLanding();
        });
    }
    
    // Make logo also clickable
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', navigateToLanding);
    }
}

// THEN UPDATE YOUR EXISTING DOMContentLoaded EVENT:
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌡️ Soil Temperature Analytics loaded!');
    initHeaderInteractions(); // ADD THIS LINE
    addInteractivity(); // Your existing function
});

// Rest of your existing JavaScript code stays the same...

// Handle file upload
function handleUpload() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv,.xlsx,.json';
    fileInput.multiple = true;
    
    fileInput.onchange = function(event) {
        const files = event.target.files;
        if (files.length > 0) {
            showNotification(`✅ Successfully uploaded ${files.length} file(s)!`, 'success');
        }
    };
    
    fileInput.click();
}

// Handle Take Action button
function takeAction() {
    const actions = [
        'Increase irrigation frequency',
        'Apply cooling mulch', 
        'Install shade cloth',
        'Adjust soil pH levels',
        'Monitor root zone temperature'
    ];
    
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    showNotification(`⚡ Action initiated: ${randomAction}`, 'info');
}

// Back to dashboard function - CORRECTED PATH
function backToDashboard() {
    // Add transition effect
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0.8';
    
    // Navigate after animation
    setTimeout(() => {
        window.location.href = '../Options/options.html';
    }, 300);
}

// Show notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        font-size: 14px;
        z-index: 2000;
        transform: translateX(400px);
        transition: all 0.4s ease;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;

    if (type === 'success') {
        notification.style.background = 'rgba(34, 197, 94, 0.95)';
    } else if (type === 'info') {
        notification.style.background = 'rgba(59, 130, 246, 0.95)';
    } else if (type === 'error') {
        notification.style.background = 'rgba(239, 68, 68, 0.95)';
    }

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 400);
    }, 3000);
}

// Add interactive effects
function addInteractivity() {
    // Metric cards hover effects
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Chart cards interactions
    const chartCards = document.querySelectorAll('.chart-card, .plot-card');
    chartCards.forEach(card => {
        card.addEventListener('click', () => {
            showNotification('📊 Chart analysis feature coming soon!', 'info');
        });
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // ESC key to go back
        if (e.key === 'Escape') {
            backToDashboard();
        }
        
        // U key for upload
        if (e.key === 'u' || e.key === 'U') {
            handleUpload();
        }
        
        // A key for action
        if (e.key === 'a' || e.key === 'A') {
            takeAction();
        }
    });

    // Enhanced back link functionality
    const backLink = document.querySelector('.back-link');
    if (backLink) {
        backLink.addEventListener('click', (e) => {
            e.preventDefault();
            backToDashboard();
        });
    }
}

// Error handling
window.addEventListener('error', (event) => {
    console.error('Soil Temperature page error:', event.error);
    showNotification('An error occurred. Please try again.', 'error');
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`📈 Soil Temperature analytics loaded in ${loadTime.toFixed(2)}ms`);
});
