// AgriSense AI Dashboard JavaScript
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

// Full Report Generation
function generateFullReport() {
    console.log('Generating comprehensive agricultural report...');
    
    // Show loading state
    const reportBtn = document.querySelector('.full-report-btn');
    const originalText = reportBtn.querySelector('.report-text').innerHTML;
    
    reportBtn.querySelector('.report-text').innerHTML = 'LOADING...';
    reportBtn.style.pointerEvents = 'none';
    reportBtn.style.opacity = '0.7';
    
    // Simulate report generation
    setTimeout(() => {
        alert('Full Agricultural Report Generated Successfully!\n\nReport includes:\n- Detailed crop health analysis\n- Soil condition assessment\n- Weather impact analysis\n- Pest and disease detection\n- Yield predictions\n- Recommendations');
        
        // Reset button
        reportBtn.querySelector('.report-text').innerHTML = originalText;
        reportBtn.style.pointerEvents = 'auto';
        reportBtn.style.opacity = '1';
    }, 2000);
}

// File Upload Handler
function handleUpload() {
    console.log('Initiating file upload...');
    
    // Create hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.accept = '.jpg,.jpeg,.png,.pdf,.csv,.xlsx,.json';
    fileInput.style.display = 'none';
    
    // Handle file selection
    fileInput.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        
        if (files.length > 0) {
            console.log('Files selected:', files.map(f => f.name));
            
            // Show upload progress
            showUploadProgress(files);
            
            // Simulate file processing
            setTimeout(() => {
                processUploadedFiles(files);
            }, 2000);
        }
    });
    
    // Trigger file picker
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
}

// Show upload progress
function showUploadProgress(files) {
    const uploadBtn = document.querySelector('.upload-btn');
    const originalContent = uploadBtn.innerHTML;
    
    uploadBtn.innerHTML = '<span class="upload-icon">⏳</span>Uploading...';
    uploadBtn.style.pointerEvents = 'none';
    uploadBtn.style.background = '#FFA726';
    
    // Reset after processing
    setTimeout(() => {
        uploadBtn.innerHTML = originalContent;
        uploadBtn.style.pointerEvents = 'auto';
        uploadBtn.style.background = '#2CFF05';
    }, 2500);
}

// Process uploaded files
function processUploadedFiles(files) {
    const fileTypes = {
        images: files.filter(f => f.type.startsWith('image/')),
        documents: files.filter(f => f.type === 'application/pdf'),
        data: files.filter(f => f.name.endsWith('.csv') || f.name.endsWith('.xlsx') || f.name.endsWith('.json'))
    };
    
    let message = `Successfully processed ${files.length} file(s):\n\n`;
    
    if (fileTypes.images.length > 0) {
        message += `📸 Images: ${fileTypes.images.length} (Crop/soil analysis ready)\n`;
    }
    if (fileTypes.documents.length > 0) {
        message += `📄 Documents: ${fileTypes.documents.length} (Text extraction complete)\n`;
    }
    if (fileTypes.data.length > 0) {
        message += `📊 Data files: ${fileTypes.data.length} (Data parsing complete)\n`;
    }
    
    message += '\nFiles are now available for analysis in your dashboard.';
    alert(message);
    
    // Update metrics (simulate)
    updateDashboardMetrics();
}

// Update dashboard metrics after file upload
function updateDashboardMetrics() {
    const metrics = document.querySelectorAll('.metric-value');
    
    // Simulate metric updates with small animations
    metrics.forEach((metric, index) => {
        metric.style.transform = 'scale(1.1)';
        metric.style.color = '#4CAF50';
        
        setTimeout(() => {
            metric.style.transform = 'scale(1)';
            metric.style.color = '';
        }, 500);
    });
}

// Chart viewing functionality
function viewChart(chartType) {
    console.log(`Opening ${chartType} chart...`);
    
    const chartData = {
        zone: {
            title: 'Zone Distribution Analysis',
            description: 'Detailed breakdown of agricultural zones with health indicators'
        },
        heatmap: {
            title: 'Temperature & Moisture Heat Map',
            description: 'Real-time visualization of field conditions'
        }
    };
    
    const chart = chartData[chartType];
    if (chart) {
        alert(`Opening: ${chart.title}\n\n${chart.description}\n\nThis will open in a new detailed view window.`);
        
        // Simulate chart opening animation
        const chartContainer = event.currentTarget;
        chartContainer.style.transform = 'scale(0.95)';
        setTimeout(() => {
            chartContainer.style.transform = 'scale(1)';
        }, 200);
    }
}

// Plot viewing functionality
function viewPlot(plotNumber) {
    console.log(`Opening Plot ${plotNumber} analysis...`);
    
    const plotData = {
        1: {
            name: 'North Field Section',
            crops: 'Wheat, Corn',
            health: '94%',
            issues: 'Minor irrigation needed'
        },
        2: {
            name: 'South Field Section', 
            crops: 'Soybeans, Barley',
            health: '87%',
            issues: 'Pest monitoring required'
        }
    };
    
    const plot = plotData[plotNumber];
    if (plot) {
        alert(`Plot ${plotNumber}: ${plot.name}\n\nCrops: ${plot.crops}\nHealth Status: ${plot.health}\nRecommendations: ${plot.issues}\n\nOpening detailed analysis...`);
        
        // Simulate plot opening animation
        const plotContainer = event.currentTarget;
        plotContainer.style.transform = 'scale(0.95)';
        setTimeout(() => {
            plotContainer.style.transform = 'scale(1)';
        }, 200);
    }
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('AgriSense Dashboard initialized');
    
    // Add hover effects to metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click handlers for metric cards
    metricCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const metricType = this.querySelector('.metric-label').textContent;
            alert(`Viewing detailed ${metricType} analytics...\n\nThis will open comprehensive insights and historical data.`);
        });
    });
    
    // Simulate real-time data updates
    startRealTimeUpdates();
});

// Simulate real-time data updates
function startRealTimeUpdates() {
    setInterval(() => {
        // Update temperature with small random variations
        const tempElement = document.querySelector('.metric-card.moderate .metric-value');
        if (tempElement && tempElement.textContent.includes('°C')) {
            const currentTemp = parseInt(tempElement.textContent);
            const newTemp = currentTemp + (Math.random() - 0.5) * 2;
            tempElement.textContent = Math.round(newTemp) + '°C';
        }
        
        // Occasionally update other metrics
        if (Math.random() < 0.1) {
            updateRandomMetric();
        }
    }, 30000); // Update every 30 seconds
}

// Update a random metric
function updateRandomMetric() {
    const metrics = document.querySelectorAll('.metric-value');
    const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
    
    if (randomMetric) {
        randomMetric.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
            randomMetric.style.animation = '';
        }, 1000);
    }
}

// Export functions for external use
window.AgriSense = {
    generateFullReport,
    handleUpload,
    viewChart,
    viewPlot
};