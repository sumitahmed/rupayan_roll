let cropHealthMap;

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

// Initialize map with search functionality
function initializeMapWithSearch() {
    const defaultLat = 19.7515;
    const defaultLng = 75.7139;
    
    cropHealthMap = L.map('cropHealthMap').setView([defaultLat, defaultLng], 10);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(cropHealthMap);
    
    // Add crop health markers
    const cropMarkers = [
        { lat: 19.7495, lng: 75.7120, health: 92, zone: 'A1', status: 'Excellent' },
        { lat: 19.7535, lng: 75.7160, health: 87, zone: 'A2', status: 'Very Good' },
        { lat: 19.7475, lng: 75.7100, health: 78, zone: 'B1', status: 'Good' },
        { lat: 19.7555, lng: 75.7180, health: 73, zone: 'B2', status: 'Fair' }
    ];
    
    cropMarkers.forEach(marker => {
        const color = getCropHealthColor(marker.health);
        
        L.circleMarker([marker.lat, marker.lng], {
            radius: 8,
            fillColor: color,
            color: '#FFFFFF',
            weight: 2,
            fillOpacity: 0.9,
            opacity: 1
        })
        .addTo(cropHealthMap)
        .bindPopup(`
            <div style="text-align: center; min-width: 120px;">
                <div style="font-weight: 700; margin-bottom: 4px;">Zone ${marker.zone}</div>
                <div style="font-weight: 600; margin-bottom: 2px;">Health: ${marker.health}%</div>
                <div style="font-size: 12px; color: #666; font-style: italic;">${marker.status}</div>
            </div>
        `);
    });
}

// Color coding for crop health
function getCropHealthColor(health) {
    if (health >= 90) return '#4CAF50';      // Excellent - Green
    if (health >= 80) return '#8BC34A';      // Very Good - Light Green
    if (health >= 70) return '#FFEB3B';      // Good - Yellow
    if (health >= 60) return '#FF9800';      // Fair - Orange  
    return '#F44336';                        // Poor - Red
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
                
                cropHealthMap.setView([lat, lng], 12);
                
                const searchMarker = L.marker([lat, lng]).addTo(cropHealthMap);
                searchMarker.bindPopup(`
                    <div style="text-align: center; min-width: 150px;">
                        <strong>📍 Search Result</strong><br>
                        <small>${result.display_name.substring(0, 60)}...</small>
                    </div>
                `).openPopup();
                
                setTimeout(() => {
                    cropHealthMap.removeLayer(searchMarker);
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

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (document.getElementById('cropHealthMap')) {
            initializeMapWithSearch();
        }
    }, 500);
    
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
