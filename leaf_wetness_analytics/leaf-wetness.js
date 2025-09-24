/**
 * AgriSense AI - Leaf Wetness Analytics
 * Disease prevention and crop health monitoring
 */

// Mock data for leaf wetness
const WETNESS_DATA = {
    current: {
        wetness: 18,
        average24h: 22,
        range: "15-28%",
        diseaseRisk: "LOW"
    },
    
    recentReadings: [
        { time: "14:30", wetness: 18, risk: "Low" },
        { time: "14:00", wetness: 22, risk: "Low" },
        { time: "13:30", wetness: 25, risk: "Medium" },
        { time: "13:00", wetness: 28, risk: "Medium" },
        { time: "12:30", wetness: 32, risk: "High" },
        { time: "12:00", wetness: 29, risk: "Medium" },
        { time: "11:30", wetness: 24, risk: "Low" },
        { time: "11:00", wetness: 20, risk: "Low" }
    ],
    
    weather: {
        humidity: 65,
        dewPoint: 12,
        windSpeed: 8
    }
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍃 Leaf Wetness Analytics Dashboard loaded!');
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
    updateWeatherData();
    populateReadingsTable();
    startRealTimeUpdates();
    addInteractivity();
    
    console.log('✅ Leaf Wetness Dashboard initialized successfully');
}

// Update metric displays
function updateMetrics() {
    const currentWetness = document.getElementById('current-wetness');
    const avgWetness = document.getElementById('avg-wetness');
    const wetnessRange = document.getElementById('wetness-range');
    const diseaseRisk = document.getElementById('disease-risk');
    
    if (currentWetness) currentWetness.textContent = `${WETNESS_DATA.current.wetness}%`;
    if (avgWetness) avgWetness.textContent = `${WETNESS_DATA.current.average24h}%`;
    if (wetnessRange) wetnessRange.textContent = WETNESS_DATA.current.range;
    if (diseaseRisk) diseaseRisk.textContent = WETNESS_DATA.current.diseaseRisk;
    
    // Add pulse animation to current reading
    if (currentWetness) {
        currentWetness.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            currentWetness.style.animation = '';
        }, 500);
    }
}

// Update weather data
function updateWeatherData() {
    const humidity = document.getElementById('humidity');
    const dewPoint = document.getElementById('dew-point');
    const windSpeed = document.getElementById('wind-speed');
    
    if (humidity) humidity.textContent = `${WETNESS_DATA.weather.humidity}%`;
    if (dewPoint) dewPoint.textContent = `${WETNESS_DATA.weather.dewPoint}°C`;
    if (windSpeed) windSpeed.textContent = `${WETNESS_DATA.weather.windSpeed} km/h`;
}

// Populate readings table
function populateReadingsTable() {
    const tableBody = document.getElementById('readings-data');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    WETNESS_DATA.recentReadings.forEach(reading => {
        const row = document.createElement('div');
        row.className = 'table-row';
        
        let statusClass = 'status-low';
        if (reading.risk === 'Medium') statusClass = 'status-medium';
        if (reading.risk === 'High') statusClass = 'status-high';
        
        row.innerHTML = `
            <span>${reading.time}</span>
            <span>${reading.wetness}%</span>
            <span class="${statusClass}">${reading.risk}</span>
        `;
        
        tableBody.appendChild(row);
    });
}

// Generate wetness report
function generateWetnessReport() {
    showNotification('Generating leaf wetness report...', 'info');
    
    setTimeout(() => {
        const reportData = {
            timestamp: new Date().toISOString(),
            currentWetness: WETNESS_DATA.current.wetness,
            average24h: WETNESS_DATA.current.average24h,
            diseaseRisk: WETNESS_DATA.current.diseaseRisk,
            recommendations: [
                'Continue monitoring during high humidity periods',
                'Improve air circulation around plants',
                'Consider fungicide application if risk increases'
            ]
        };
        
        console.log('Generated Wetness Report:', reportData);
        showNotification('Leaf wetness report generated successfully!', 'success');
    }, 2000);
}

// Navigate back to options
function navigateBack() {
    showNotification('Returning to options...', 'info');
    setTimeout(() => {
        window.location.href = '../Options/options.html';
    }, 500);
}

// View wetness chart
function viewWetnessChart() {
    showNotification('Opening detailed wetness chart...', 'info');
    console.log('📊 Viewing wetness pattern chart');
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
        // Simulate wetness fluctuations
        const variation = (Math.random() - 0.5) * 4; // ±2% variation
        const newWetness = Math.max(0, Math.min(100, WETNESS_DATA.current.wetness + variation));
        
        WETNESS_DATA.current.wetness = Math.round(newWetness);
        
        // Update disease risk based on wetness level
        if (WETNESS_DATA.current.wetness < 25) {
            WETNESS_DATA.current.diseaseRisk = "LOW";
        } else if (WETNESS_DATA.current.wetness < 40) {
            WETNESS_DATA.current.diseaseRisk = "MEDIUM";
        } else {
            WETNESS_DATA.current.diseaseRisk = "HIGH";
        }
        
        updateMetrics();
        
    }, 25000); // Update every 25 seconds
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
    
    // Add click events to chart containers
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
        chartContainer.addEventListener('click', viewWetnessChart);
    }
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
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navigateBack();
    }
    if (e.key === 'r' || e.key === 'R') {
        generateWetnessReport();
    }
});

// Error handling
window.addEventListener('error', (event) => {
    console.error('Leaf Wetness Dashboard error:', event.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Export for global access
window.LeafWetnessAnalytics = {
    generateWetnessReport,
    navigateBack,
    viewWetnessChart,
    showNotification
};

console.log('🍃 Leaf Wetness Analytics system ready!');
