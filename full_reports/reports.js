let reportsMap;

// Handle file upload
function handleUpload() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv,.xlsx,.json,.pdf';
    fileInput.multiple = true;
    
    fileInput.onchange = function(event) {
        const files = event.target.files;
        if (files.length > 0) {
            showNotification(`✅ Successfully uploaded ${files.length} file(s) for comprehensive analysis!`, 'success');
        }
    };
    
    fileInput.click();
}

// Initialize map with search functionality
function initializeReportsMap() {
    const defaultLat = 23.2599;
    const defaultLng = 77.4126;
    
    reportsMap = L.map('reportsMap').setView([defaultLat, defaultLng], 9);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(reportsMap);
    
    // Add comprehensive report markers
    const reportMarkers = [
        { lat: 23.2580, lng: 77.4100, health: 92, zone: 'A1', status: 'Excellent', type: 'Overall Health' },
        { lat: 23.2620, lng: 77.4150, health: 75, zone: 'A2', status: 'Moderate', type: 'Soil Temperature' },
        { lat: 23.2560, lng: 77.4080, health: 45, zone: 'B1', status: 'Low', type: 'Soil Moisture' },
        { lat: 23.2640, lng: 77.4170, health: 88, zone: 'B2', status: 'Excellent', type: 'Leaf Wetness' },
        { lat: 23.2600, lng: 77.4110, health: 82, zone: 'C1', status: 'Good', type: 'Nutrient Level' }
    ];
    
    reportMarkers.forEach(marker => {
        const color = getReportColor(marker.health);
        
        L.circleMarker([marker.lat, marker.lng], {
            radius: 10,
            fillColor: color,
            color: '#FFFFFF',
            weight: 2,
            fillOpacity: 0.9,
            opacity: 1
        })
        .addTo(reportsMap)
        .bindPopup(`
            <div style="text-align: center; min-width: 140px;">
                <div style="font-weight: 700; margin-bottom: 4px;">Zone ${marker.zone}</div>
                <div style="font-weight: 600; margin-bottom: 2px;">${marker.type}: ${marker.health}%</div>
                <div style="font-size: 12px; color: #666; font-style: italic;">${marker.status}</div>
            </div>
        `);
    });
}

// Color coding for report metrics
function getReportColor(health) {
    if (health >= 85) return '#4CAF50';        // Excellent - Green
    if (health >= 70) return '#2196F3';        // Good - Blue
    if (health >= 55) return '#FF9800';        // Moderate - Orange  
    if (health >= 40) return '#FFC107';        // Fair - Amber
    return '#F44336';                          // Poor - Red
}

// Search functionality
function searchLocation() {
    const searchTerm = document.getElementById('locationSearch').value.trim();
    
    if (!searchTerm) {
        showNotification('Please enter a location to search', 'error');
        return;
    }
    
    const searchBtn = document.querySelector('.map-search-button');
    const originalText = searchBtn.textContent;
    searchBtn.textContent = 'Searching...';
    searchBtn.disabled = true;
    
    // Geocoding with Nominatim API
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}&limit=1`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const result = data[0];
                const lat = parseFloat(result.lat);
                const lng = parseFloat(result.lon);
                
                reportsMap.setView([lat, lng], 12);
                
                const searchMarker = L.marker([lat, lng]).addTo(reportsMap);
                searchMarker.bindPopup(`
                    <div style="text-align: center; min-width: 150px;">
                        <strong>📍 Search Result</strong><br>
                        <small>${result.display_name.substring(0, 60)}...</small>
                    </div>
                `).openPopup();
                
                setTimeout(() => {
                    reportsMap.removeLayer(searchMarker);
                }, 10000);
                
                showNotification('✅ Location found successfully!', 'success');
            } else {
                showNotification('Location not found. Please try a different search term.', 'error');
            }
        })
        .catch(error => {
            console.error('Search error:', error);
            showNotification('Search failed. Please check your connection.', 'error');
        })
        .finally(() => {
            searchBtn.textContent = originalText;
            searchBtn.disabled = false;
        });
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.field-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `field-notification ${type}`;
    notification.textContent = message;
    
    const bgColor = type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: #FFFFFF;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 500;
        font-size: 14px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Add interactive effects
function addInteractivity() {
    // Metric cards hover effects
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Chart cards interactions
    const chartCards = document.querySelectorAll('.chart-card');
    chartCards.forEach(card => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('map-container')) {
                showNotification('📊 Advanced analytics feature coming soon!', 'info');
            }
        });
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // ESC key to go back
        if (e.key === 'Escape') {
            window.location.href = '../Options/options.html';
        }
        
        // U key for upload
        if (e.key === 'u' || e.key === 'U') {
            handleUpload();
        }
        
        // R key for reports info
        if (e.key === 'r' || e.key === 'R') {
            showNotification('📊 Full report analysis active - showing comprehensive metrics', 'info');
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('📊 Full Reports Analytics loaded!');
    
    setTimeout(() => {
        if (document.getElementById('reportsMap')) {
            initializeReportsMap();
            console.log('✅ Reports Field Map initialized successfully!');
        }
    }, 500);
    
    // Add interactivity
    addInteractivity();
    
    // Add enter key support for search
    const searchInput = document.getElementById('locationSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchLocation();
            }
        });
    }
});

// Error handling
window.addEventListener('error', (event) => {
    console.error('Reports page error:', event.error);
    showNotification('An error occurred. Please try again.', 'error');
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`📊 Full Reports analytics loaded in ${loadTime.toFixed(2)}ms`);
});
