// Application constants and settings
const constants = {
    // API configuration
    API_BASE_URL: 'https://api.agrisense.ai',
    API_VERSION: 'v1',
    
    // Authentication
    TOKEN_KEY: 'agrisense_token',
    REFRESH_TOKEN_KEY: 'agrisense_refresh_token',
    
    // Data refresh intervals (in milliseconds)
    REFRESH_INTERVALS: {
        SOIL_MOISTURE: 300000,    // 5 minutes
        LEAF_WETNESS: 300000,     // 5 minutes
        CROP_HEALTH: 900000,      // 15 minutes
        SOIL_TEMPERATURE: 300000  // 5 minutes
    },
    
    // Chart colors
    COLORS: {
        PRIMARY: '#11ac00',
        SECONDARY: '#634589',
        DANGER: '#dc3545',
        WARNING: '#ffc107',
        SUCCESS: '#28a745',
        INFO: '#17a2b8'
    },
    
    // Data thresholds
    THRESHOLDS: {
        SOIL_MOISTURE: {
            LOW: 20,
            OPTIMAL: 40,
            HIGH: 80
        },
        LEAF_WETNESS: {
            DRY: 20,
            MOIST: 50,
            WET: 80
        },
        SOIL_TEMPERATURE: {
            COLD: 10,
            OPTIMAL: 25,
            HOT: 35
        }
    },
    
    // Local storage keys
    STORAGE_KEYS: {
        USER_PREFERENCES: 'user_preferences',
        DASHBOARD_LAYOUT: 'dashboard_layout',
        LAST_UPDATE: 'last_update'
    }
};

export default constants;