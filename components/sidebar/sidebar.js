class Sidebar {
    constructor() {
        this.init();
    }

    init() {
        this.highlightCurrentPage();
        this.setupNavigationEvents();
    }

    highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            if (item.getAttribute('href') === currentPath) {
                item.classList.add('active');
            }
        });
    }

    setupNavigationEvents() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Remove active class from all items
                navItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                item.classList.add('active');
            });
        });
    }
}

// Initialize sidebar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Sidebar();
});