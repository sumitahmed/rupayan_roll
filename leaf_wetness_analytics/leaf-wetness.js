let leafWetnessMap;

// Handle file upload
function handleUpload() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv,.xlsx,.json';
    fileInput.multiple = true;
    
    fileInput.onchange = function(event) {
        const files = event.target.files;
        if (files.length > 0) {
            showNotification(`✅ Successfully uploaded ${files.length} file(s) for wetness analysis!`, 'success');
        }
    };
    
    fileInput.click();
}

// Initialize map with search functionality
function initializeLeafWetnessMap() {
    const defaultLat = 10.8505;
    const defaultLng = 76.2711;
    
    leafWetnessMap = L.map('leafWetnessMap').setView([defaultLat, defaultLng], 10);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(leafWetnessMap);
    
    // Add leaf wetness markers
    const wetnessMarkers = [
        { lat: 10.8485, lng: 76.2695, wetness: 25, zone: 'A1', status: 'Low', risk: 'Low Disease Risk' },
        { lat: 10.8525, lng: 76.2730, wetness: 35, zone: 'A2', status: 'Low', risk: 'Minimal Risk' },
        { lat: 10.8465, lng: 76.2675, wetness: 20, zone: 'B1', status: 'Very Low', risk: 'No Risk' },
        { lat: 10.8545, lng: 76.2750, wetness: 30, zone: 'B2', status: 'Low', risk: 'Low Risk' }
    ];
    
    wetnessMarkers.forEach(marker => {
        const color = getWetnessColor(marker.wetness);
        
        L.circleMarker([marker.lat, marker.lng], {
            radius: 8,
            fillColor: color,
            color: '#FFFFFF',
            weight: 2,
            fillOpacity: 0.9,
            opacity: 1
        })
        .addTo(leafWetnessMap)
        .bindPopup(`
            <div style="text-align: center; min-width: 120px;">
                <div style="font-weight: 700; margin-bottom: 4px;">Zone ${marker.zone}</div>
                <div style="font-weight: 600; margin-bottom: 2px;">Wetness: ${marker.wetness}%</div>
                <div style="font-size: 12px; color: #666; font-style: italic;">${marker.status}</div>
                <div style="font-size: 11px; color: #4CAF50; font-weight: 500; margin-top: 2px;">${marker.risk}</div>
            </div>
        `);
    });
}

// Color coding for wetness levels (Low wetness = good)
function getWetnessColor(wetness) {
    if (wetness >= 80) return '#F44336';        // Very High - Red (Disease Risk)
    if (wetness >= 60) return '#FF9800';        // High - Orange (Moderate Risk)
    if (wetness >= 40) return '#FFC107';        // Moderate - Amber (Some Risk)  
    if (wetness >= 20) return '#4CAF50';        // Low - Green (Good)
    return '#2E7D32';                           // Very Low - Dark Green (Excellent)
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
                
                leafWetnessMap.setView([lat, lng], 12);
                
                const searchMarker = L.marker([lat, lng]).addTo(leafWetnessMap);
                searchMarker.bindPopup(`
                    <div style="text-align: center; min-width: 150px;">
                        <strong>📍 Search Result</strong><br>
                        <small>${result.display_name.substring(0, 60)}...</small>
                    </div>
                `).openPopup();
                
                setTimeout(() => {
                    leafWetnessMap.removeLayer(searchMarker);
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
                showNotification('📊 Wetness analytics feature coming soon!', 'info');
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
        
        // W key for wetness info
        if (e.key === 'w' || e.key === 'W') {
            showNotification('🍃 Monitoring leaf wetness for disease prevention...', 'info');
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍃 Leaf Wetness Analytics loaded!');
    
    setTimeout(() => {
        if (document.getElementById('leafWetnessMap')) {
            initializeLeafWetnessMap();
            console.log('✅ Leaf Wetness Map initialized successfully!');
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
    console.error('Leaf Wetness page error:', event.error);
    showNotification('An error occurred. Please try again.', 'error');
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`🍃 Leaf Wetness analytics loaded in ${loadTime.toFixed(2)}ms`);
});
