/**
 * AgriSense AI - Soil Moisture Analytics
 * Real-time monitoring and analysis dashboard
 */

// Mock data for soil moisture
const MOISTURE_DATA = {
    current: {
        moisture: 42,
        average24h: 38,
        range: "32-45%",
        status: "OPTIMAL"
    },
    
    recentReadings: [
        { time: "14:30", moisture: 42, status: "Optimal" },
        { time: "14:00", moisture: 39, status: "Good" },
        { time: "13:30", moisture: 44, status: "Optimal" },
        { time: "13:00", moisture: 38, status: "Good" },
        { time: "12:30", moisture: 35, status: "Low" },
        { time: "12:00", moisture: 33, status: "Low" },
        { time: "11:30", moisture: 36, status: "Good" },
        { time: "11:00", moisture: 40, status: "Optimal" }
    ]
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('💧 Soil Moisture Analytics Dashboard loaded!');
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
    populateReadingsTable();
    startRealTimeUpdates();
    addInteractivity();
    
    console.log('✅ Soil Moisture Dashboard initialized successfully');
}

// Update metric displays
function updateMetrics() {
    const currentMoisture = document.getElementById('current-moisture');
    const avgMoisture = document.getElementById('avg-moisture');
    const moistureRange = document.getElementById('moisture-range');
    const moistureStatus = document.getElementById('moisture-status');
    
    if (currentMoisture) currentMoisture.textContent = `${MOISTURE_DATA.current.moisture}%`;
    if (avgMoisture) avgMoisture.textContent = `${MOISTURE_DATA.current.average24h}%`;
    if (moistureRange) moistureRange.textContent = MOISTURE_DATA.current.range;
    if (moistureStatus) moistureStatus.textContent = MOISTURE_DATA.current.status;
    
    // Add pulse animation to current reading
    if (currentMoisture) {
        currentMoisture.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            currentMoisture.style.animation = '';
        }, 500);
    }
}

// Populate readings table
function populateReadingsTable() {
    const tableBody = document.getElementById('readings-data');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    MOISTURE_DATA.recentReadings.forEach(reading => {
        const row = document.createElement('div');
        row.className = 'table-row';
        
        let statusClass = 'status-optimal';
        if (reading.status === 'Good') statusClass = 'status-good';
        if (reading.status === 'Low') statusClass = 'status-warning';
        
        row.innerHTML = `
            <span>${reading.time}</span>
            <span>${reading.moisture}%</span>
            <span class="${statusClass}">${reading.status}</span>
        `;
        
        tableBody.appendChild(row);
    });
}

// Generate moisture report
function generateMoistureReport() {
    showNotification('Generating soil moisture report...', 'info');
    
    setTimeout(() => {
        const reportData = {
            timestamp: new Date().toISOString(),
            currentMoisture: MOISTURE_DATA.current.moisture,
            average24h: MOISTURE_DATA.current.average24h,
            status: MOISTURE_DATA.current.status,
            recommendations: [
                'Maintain current irrigation schedule',
                'Monitor moisture levels during hot weather',
                'Consider mulching to retain moisture'
            ]
        };
        
        console.log('Generated Moisture Report:', reportData);
        showNotification('Soil moisture report generated successfully!', 'success');
    }, 2000);
}

// Navigate back to options
function navigateBack() {
    showNotification('Returning to options...', 'info');
    setTimeout(() => {
        window.location.href = '../Options/options.html';
    }, 500);
}

// View moisture chart
function viewMoistureChart() {
    showNotification('Opening detailed moisture chart...', 'info');
    console.log('📊 Viewing moisture trends chart');
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
        // Simulate small moisture fluctuations
        const variation = (Math.random() - 0.5) * 3; // ±1.5% variation
        const newMoisture = Math.max(0, Math.min(100, MOISTURE_DATA.current.moisture + variation));
        
        MOISTURE_DATA.current.moisture = Math.round(newMoisture);
        updateMetrics();
        
    }, 20000); // Update every 20 seconds
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
        chartContainer.addEventListener('click', viewMoistureChart);
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
        generateMoistureReport();
    }
});

// Error handling
window.addEventListener('error', (event) => {
    console.error('Soil Moisture Dashboard error:', event.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Export for global access
window.SoilMoistureAnalytics = {
    generateMoistureReport,
    navigateBack,
    viewMoistureChart,
    showNotification
};

console.log('💧 Soil Moisture Analytics system ready!');
