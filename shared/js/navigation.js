// Navigation logic for the application
const Navigation = {
    // Current page
    currentPage: window.location.pathname,

    // Initialize navigation
    init: function() {
        this.highlightCurrentPage();
        this.setupNavigationEvents();
    },

    // Highlight current page in navigation
    highlightCurrentPage: function() {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === this.currentPage) {
                link.classList.add('active');
            }
        });
    },

    // Setup navigation event listeners
    setupNavigationEvents: function() {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');
            });
        });
    },

    // Navigate to page
    navigateTo: function(path) {
        window.location.href = path;
    },

    // Go back to previous page
    goBack: function() {
        window.history.back();
    }
};