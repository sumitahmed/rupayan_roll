let soilMoistureMap;

// Handle file upload
function handleUpload() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv,.xlsx,.json';
    fileInput.multiple = true;
    
    fileInput.onchange = function(event) {
        const files = event.target.files;
        if (files.length > 0) {
            showNotification(`✅ Successfully uploaded ${files.length} file(s) for moisture analysis!`, 'success');
        }
    };
    
    fileInput.click();
}

// Initialize map with search functionality
function initializeSoilMoistureMap() {
    const defaultLat = 28.6139;
    const defaultLng = 77.2090;
    
    soilMoistureMap = L.map('soilMoistureMap').setView([defaultLat, defaultLng], 10);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(soilMoistureMap);
    
    // Add soil moisture markers
    const moistureMarkers = [
        { lat: 28.6120, lng: 77.2070, moisture: 55, zone: 'A1', status: 'Moderate', condition: 'Requires monitoring' },
        { lat: 28.6158, lng: 77.2110, moisture: 45, zone: 'A2', status: 'Low', condition: 'Irrigation needed' },
        { lat: 28.6100, lng: 77.2050, moisture: 65, zone: 'B1', status: 'Good', condition: 'Optimal level' },
        { lat: 28.6178, lng: 77.2130, moisture: 50, zone: 'B2', status: 'Moderate', condition: 'Monitor closely' }
    ];
    
    moistureMarkers.forEach(marker => {
        const color = getMoistureColor(marker.moisture);
        
        L.circleMarker([marker.lat, marker.lng], {
            radius: 8,
            fillColor: color,
            color: '#FFFFFF',
            weight: 2,
            fillOpacity: 0.9,
            opacity: 1
        })
        .addTo(soilMoistureMap)
        .bindPopup(`
            <div style="text-align: center; min-width: 120px;">
                <div style="font-weight: 700; margin-bottom: 4px;">Zone ${marker.zone}</div>
                <div style="font-weight: 600; margin-bottom: 2px;">Moisture: ${marker.moisture}%</div>
                <div style="font-size: 12px; color: #666; font-style: italic;">${marker.status}</div>
                <div style="font-size: 11px; color: #2196F3; font-weight: 500; margin-top: 2px;">${marker.condition}</div>
            </div>
        `);
    });
}

// Color coding for moisture levels
function getMoistureColor(moisture) {
    if (moisture >= 80) return '#1976D2';        // Very High - Dark Blue
    if (moisture >= 60) return '#2196F3';        // Good - Blue
    if (moisture >= 40) return '#FFC107';        // Moderate - Amber  
    if (moisture >= 20) return '#FF9800';        // Low - Orange
    return '#F44336';                            // Very Low - Red
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
                
                soilMoistureMap.setView([lat, lng], 12);
                
                const searchMarker = L.marker([lat, lng]).addTo(soilMoistureMap);
                searchMarker.bindPopup(`
                    <div style="text-align: center; min-width: 150px;">
                        <strong>📍 Search Result</strong><br>
                        <small>${result.display_name.substring(0, 60)}...</small>
                    </div>
                `).openPopup();
                
                setTimeout(() => {
                    soilMoistureMap.removeLayer(searchMarker);
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
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
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
            card.style.transform = 'translateY(-3px) scale(1.02)';
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
                showNotification('📊 Moisture analytics feature coming soon!', 'info');
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
        
        // M key for moisture info
        if (e.key === 'm' || e.key === 'M') {
            showNotification('🌊 Monitoring soil moisture for optimal irrigation...', 'info');
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌊 Soil Moisture Analytics loaded!');
    
    setTimeout(() => {
        if (document.getElementById('soilMoistureMap')) {
            initializeSoilMoistureMap();
            console.log('✅ Soil Moisture Map initialized successfully!');
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
    console.error('Soil Moisture page error:', event.error);
    showNotification('An error occurred. Please try again.', 'error');
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`🌊 Soil Moisture analytics loaded in ${loadTime.toFixed(2)}ms`);
});
