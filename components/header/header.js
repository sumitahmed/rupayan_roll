class Header {
    constructor() {
        this.init();
    }

    init() {
        this.setupLogout();
        this.setupUserProfile();
    }

    setupLogout() {
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                // Clear session/local storage
                localStorage.removeItem('user');
                sessionStorage.clear();
                
                // Redirect to login page
                window.location.href = '/login';
            });
        }
    }

    setupUserProfile() {
        const userProfile = document.querySelector('.user-profile');
        if (userProfile) {
            // Get user data from storage
            const userData = JSON.parse(localStorage.getItem('user'));
            if (userData) {
                const username = userProfile.querySelector('.username');
                const avatar = userProfile.querySelector('.avatar');
                
                if (username) {
                    username.textContent = userData.name;
                }
                if (avatar && userData.avatar) {
                    avatar.src = userData.avatar;
                }
            }
        }
    }
}

// Initialize header when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Header();
});