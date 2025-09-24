/**
 * AgriSense AI - Crop Health Analytics
 * Comprehensive crop monitoring and health assessment
 */

// Mock data for crop health
const HEALTH_DATA = {
    overall: {
        health: "Excellent",
        growthRate: "+15%",
        stressLevel: "Low", 
        yieldPotential: "92%"
    },
    
    indicators: {
        leafColor: "Excellent",
        plantHeight: "Good", 
        leafDensity: "Excellent",
        hydration: "Moderate",
        stemStrength: "Good",
        flowering: "Excellent"
    },
    
    diseases: [
        { name: "Fungal infections", status: "safe", detected: false },
        { name: "Bacterial disease", status: "safe", detected: false },
        { name: "Leaf spot", status: "warning", detected: true },
        { name: "Viral infection", status: "safe", detected: false }
    ],
    
    pests: [
        { name: "Aphids", level: "low", count: 2 },
        { name: "Caterpillars", level: "none", count: 0 },
        { name: "Thrips", level: "low", count: 1 }
    ],
    
    performance: {
        weeklyGrowth: "+2.3cm",
        biomassIndex: "8.7/10",
        targetProgress: "78%"
    }
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌱 Crop Health Analytics Dashboard loaded!');
    initializeDashboard();
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

function initializeDashboard() {
    updateMetrics();
    startRealTimeUpdates();
    addInteractivity();
    simulateHealthChanges();
    
    console.log('✅ Crop Health Dashboard initialized successfully');
}

// Update metric displays
function updateMetrics() {
    const overallHealth = document.getElementById('overall-health');
    const growthRate = document.getElementById('growth-rate');
    const stressLevel = document.getElementById('stress-level');
    const yieldPotential = document.getElementById('yield-potential');
    
    if (overallHealth) overallHealth.textContent = HEALTH_DATA.overall.health;
    if (growthRate) growthRate.textContent = HEALTH_DATA.overall.growthRate;
    if (stressLevel) stressLevel.textContent = HEALTH_DATA.overall.stressLevel;
    if (yieldPotential) yieldPotential.textContent = HEALTH_DATA.overall.yieldPotential;
    
    // Add pulse animation to key metrics
    if (overallHealth) {
        overallHealth.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            overallHealth.style.animation = '';
        }, 500);
    }
}

// Generate health report
function generateHealthReport() {
    showNotification('Generating comprehensive health report...', 'info');
    
    setTimeout(() => {
        const reportData = {
            timestamp: new Date().toISOString(),
            overallHealth: HEALTH_DATA.overall.health,
            growthRate: HEALTH_DATA.overall.growthRate,
            yieldPotential: HEALTH_DATA.overall.yieldPotential,
            criticalIssues: HEALTH_DATA.diseases.filter(d => d.detected),
            recommendations: [
                'Increase nitrogen application for enhanced growth',
                'Monitor leaf spot progression closely',
                'Continue optimal irrigation schedule',
                'Implement integrated pest management'
            ]
        };
        
        console.log('Generated Health Report:', reportData);
        showNotification('Crop health report generated successfully!', 'success');
    }, 2500);
}

// Navigate back to options
function navigateBack() {
    showNotification('Returning to options...', 'info');
    setTimeout(() => {
        window.location.href = '../Options/options.html';
    }, 500);
}

// View health chart
function viewHealthChart() {
    showNotification('Opening detailed health trends...', 'info');
    console.log('📊 Viewing health trend analysis');
    
    // Simulate chart interaction
    setTimeout(() => {
        showHealthTrendModal();
    }, 1000);
}

// Show health trend modal
function showHealthTrendModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Health Trend Analysis</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <h4>7-Day Health Summary</h4>
                <div class="trend-summary">
                    <div class="trend-item">
                        <span class="trend-label">Overall Health:</span>
                        <span class="trend-value excellent">↗ Improving</span>
                    </div>
                    <div class="trend-item">
                        <span class="trend-label">Growth Rate:</span>
                        <span class="trend-value good">↗ +15% increase</span>
                    </div>
                    <div class="trend-item">
                        <span class="trend-label">Stress Indicators:</span>
                        <span class="trend-value moderate">→ Stable (Low)</span>
                    </div>
                    <div class="trend-item">
                        <span class="trend-label">Disease Risk:</span>
                        <span class="trend-value warning">↑ Minor increase</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Style the modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        border-radius: 15px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    `;
    
    const trendItems = modal.querySelectorAll('.trend-item');
    trendItems.forEach(item => {
        item.style.cssText = `
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        `;
    });
    
    document.body.appendChild(modal);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="notification-close">&times;</button>
    `;
    
    const colors = {
        info: { bg: '#2196F3', color: '#FFFFFF' },
        success: { bg: '#4CAF50', color: '#FFFFFF' },
        error: { bg: '#F44336', color: '#FFFFFF' }
    };
    
    const style = colors[type] || colors.info;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${style.bg};
        color: ${style.color};
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 350px;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

// Start real-time updates
function startRealTimeUpdates() {
    setInterval(() => {
        // Simulate minor health fluctuations
        updateHealthStatus();
        
    }, 30000); // Update every 30 seconds
}

// Update health status with variations
function updateHealthStatus() {
    // Randomly update growth rate
    const growthVariations = ["+13%", "+14%", "+15%", "+16%", "+17%"];
    HEALTH_DATA.overall.growthRate = growthVariations[Math.floor(Math.random() * growthVariations.length)];
    
    // Update yield potential
    const yieldBase = 92;
    const variation = Math.floor(Math.random() * 5) - 2; // ±2%
    HEALTH_DATA.overall.yieldPotential = `${Math.max(88, Math.min(95, yieldBase + variation))}%`;
    
    updateMetrics();
}

// Simulate health changes over time
function simulateHealthChanges() {
    setTimeout(() => {
        // Simulate improvement in leaf spot condition
        const leafSpotDisease = HEALTH_DATA.diseases.find(d => d.name === "Leaf spot");
        if (leafSpotDisease && Math.random() > 0.7) {
            leafSpotDisease.detected = false;
            leafSpotDisease.status = "safe";
            showNotification('Leaf spot condition improved!', 'success');
        }
    }, 60000); // After 1 minute
}

// Add interactivity
function addInteractivity() {
    // Add hover effects to metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click events to indicator items
    const indicators = document.querySelectorAll('.indicator-item');
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const name = indicator.querySelector('.indicator-name').textContent;
            showNotification(`Viewing detailed ${name} analysis...`, 'info');
        });
    });
    
    // Add click events to recommendations
    const recommendations = document.querySelectorAll('.recommendation-item');
    recommendations.forEach(rec => {
        rec.addEventListener('click', () => {
            const title = rec.querySelector('h4').textContent;
            showNotification(`Implementing ${title}...`, 'info');
        });
    });
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close modals or navigate back
        const modals = document.querySelectorAll('.modal-overlay');
        if (modals.length > 0) {
            modals.forEach(modal => modal.remove());
        } else {
            navigateBack();
        }
    }
    if (e.key === 'r' || e.key === 'R') {
        generateHealthReport();
    }
    if (e.key === 'h' || e.key === 'H') {
        viewHealthChart();
    }
});

// Error handling
window.addEventListener('error', (event) => {
    console.error('Crop Health Dashboard error:', event.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Export for global access
window.CropHealthAnalytics = {
    generateHealthReport,
    navigateBack,
    viewHealthChart,
    showNotification
};

console.log('🌱 Crop Health Analytics system ready!');
