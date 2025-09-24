// ✅ TEMPORARY LOGIN - Accept any username/password
function handleLogin(event) {
    event.preventDefault(); // Prevent form from submitting normally
    
    // Get input values
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    
    // ✅ ACCEPT ANY NON-EMPTY USERNAME AND PASSWORD
    if (username && password) {
        // Show loading state
        showLoadingState();
        
        // Simulate login process
        setTimeout(() => {
            // Save user session (for demo purposes)
            sessionStorage.setItem('user', JSON.stringify({
                username: username,
                loginTime: new Date().toISOString()
            }));
            
            // Show success message
            showNotification('✅ Login successful! Redirecting...', 'success');
            
            // Redirect to options page
            setTimeout(() => {
                window.location.href = '../Options/options.html';
            }, 1000);
            
        }, 1500);
        
    } else {
        // Show error for empty fields
        showNotification('❌ Please enter both username and password', 'error');
    }
}

// Show loading state
function showLoadingState() {
    const loginBtn = document.querySelector('#login-btn') || document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.textContent = 'Logging in...';
        loginBtn.disabled = true;
        loginBtn.style.opacity = '0.7';
    }
}

// Reset login button
function resetLoginButton() {
    const loginBtn = document.querySelector('#login-btn') || document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.textContent = 'Login';
        loginBtn.disabled = false;
        loginBtn.style.opacity = '1';
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#22C55E' : '#EF4444'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Hide notification
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize login page
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#login-form') || document.querySelector('.login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Also handle direct button click
    const loginBtn = document.querySelector('#login-btn') || document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogin(e);
        });
    }
    
    console.log('🔐 Login page loaded - Any username/password accepted!');
});
