let soilTemperatureMap;

// Handle file upload
function handleUpload() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv,.xlsx,.json';
    fileInput.multiple = true;
    
    fileInput.onchange = function(event) {
        const files = event.target.files;
        if (files.length > 0) {
            showNotification(`✅ Successfully uploaded ${files.length} file(s) for temperature analysis!`, 'success');
        }
    };
    
    fileInput.click();
}

// Initialize map with search functionality
function initializeSoilTemperatureMap() {
    const defaultLat = 37.7749;
    const defaultLng = -122.4194;
    
    soilTemperatureMap = L.map('soilTemperatureMap').setView([defaultLat, defaultLng], 10);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(soilTemperatureMap);
    
    // Add soil temperature markers
    const temperatureMarkers = [
        { lat: 37.7730, lng: -122.4180, temp: 15, zone: 'A1', status: 'Low', condition: 'Soil Overheating Risk' },
        { lat: 37.7768, lng: -122.4208, temp: 18, zone: 'A2', status: 'Low', condition: 'Requires Cooling' },
        { lat: 37.7710, lng: -122.4160, temp: 22, zone: 'B1', status: 'Optimal', condition: 'Good Temperature' },
        { lat: 37.7788, lng: -122.4228, temp: 16, zone: 'B2', status: 'Low', condition: 'Monitor Closely' }
    ];
    
    temperatureMarkers.forEach(marker => {
        const color = getTemperatureColor(marker.temp);
        
        L.circleMarker([marker.lat, marker.lng], {
            radius: 8,
            fillColor: color,
            color: '#FFFFFF',
            weight: 2,
            fillOpacity: 0.9,
            opacity: 1
        })
        .addTo(soilTemperatureMap)
        .bindPopup(`
            <div style="text-align: center; min-width: 120px;">
                <div style="font-weight: 700; margin-bottom: 4px;">Zone ${marker.zone}</div>
                <div style="font-weight: 600; margin-bottom: 2px;">Temperature: ${marker.temp}°C</div>
                <div style="font-size: 12px; color: #666; font-style: italic;">${marker.status}</div>
                <div style="font-size: 11px; color: #FF5722; font-weight: 500; margin-top: 2px;">${marker.condition}</div>
            </div>
        `);
    });
}

// Color coding for temperature levels
function getTemperatureColor(temp) {
    if (temp >= 30) return '#D32F2F';        // Very High - Dark Red (Critical)
    if (temp >= 25) return '#FF5722';        // High - Red (Hot)
    if (temp >= 20) return '#FF9800';        // Good - Orange (Optimal)  
    if (temp >= 15) return '#FFC107';        // Low - Amber (Cool)
    return '#2196F3';                        // Very Low - Blue (Cold)
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
                
                soilTemperatureMap.setView([lat, lng], 12);
                
                const searchMarker = L.marker([lat, lng]).addTo(soilTemperatureMap);
                searchMarker.bindPopup(`
                    <div style="text-align: center; min-width: 150px;">
                        <strong>📍 Search Result</strong><br>
                        <small>${result.display_name.substring(0, 60)}...</small>
                    </div>
                `).openPopup();
                
                setTimeout(() => {
                    soilTemperatureMap.removeLayer(searchMarker);
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
                showNotification('📊 Temperature analytics feature coming soon!', 'info');
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
        
        // T key for temperature info
        if (e.key === 't' || e.key === 'T') {
            showNotification('🌡️ Monitoring soil temperature for optimal crop growth...', 'info');
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌡️ Soil Temperature Analytics loaded!');
    
    setTimeout(() => {
        if (document.getElementById('soilTemperatureMap')) {
            initializeSoilTemperatureMap();
            console.log('✅ Soil Temperature Map initialized successfully!');
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
    console.error('Soil Temperature page error:', event.error);
    showNotification('An error occurred. Please try again.', 'error');
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`🌡️ Soil Temperature analytics loaded in ${loadTime.toFixed(2)}ms`);
});
