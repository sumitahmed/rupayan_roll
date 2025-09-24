class ChartUtils {
    static defaultColors = [
        '#11ac00', // Primary green
        '#634589', // Secondary purple
        '#ff6b6b', // Red
        '#4dabf7', // Blue
        '#ffd43b', // Yellow
        '#a8e6cf', // Mint
        '#3bc9db', // Cyan
        '#ff922b', // Orange
    ];

    static defaultConfig = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        }
    };

    // Create a new chart instance
    static createChart(canvas, type, data, options = {}) {
        return new Chart(canvas, {
            type,
            data,
            options: { ...this.defaultConfig, ...options }
        });
    }

    // Update chart data
    static updateChart(chart, newData) {
        chart.data = newData;
        chart.update();
    }

    // Create legend items
    static createLegend(container, data) {
        container.innerHTML = '';
        data.datasets.forEach((dataset, index) => {
            const legendItem = document.createElement('div');
            legendItem.className = 'legend-item';
            
            const color = document.createElement('span');
            color.className = 'legend-color';
            color.style.backgroundColor = dataset.backgroundColor;

            const label = document.createElement('span');
            label.textContent = dataset.label;

            legendItem.appendChild(color);
            legendItem.appendChild(label);
            container.appendChild(legendItem);
        });
    }

    // Format date for chart labels
    static formatDate(date, format = 'short') {
        const options = {
            short: { hour: '2-digit', minute: '2-digit' },
            medium: { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' },
            long: { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
        };
        return new Date(date).toLocaleString(undefined, options[format]);
    }

    // Generate gradient background
    static createGradient(ctx, color) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, color + '40'); // 25% opacity
        gradient.addColorStop(1, color + '00'); // 0% opacity
        return gradient;
    }
}