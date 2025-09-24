// Route definitions for the application
const routes = {
    // Main pages
    home: '/',
    login: '/login',
    options: '/options',
    
    // Analytics pages
    soilMoisture: '/soil-moisture',
    leafWetness: '/leaf-wetness',
    cropHealth: '/crop-health',
    soilTemperature: '/soil-temperature',
    
    // Reports
    fullReports: '/full-reports',

    // API endpoints
    api: {
        auth: '/api/auth',
        data: '/api/data',
        analytics: '/api/analytics',
        reports: '/api/reports'
    }
};

export default routes;