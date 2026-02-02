document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch(`${API_URL}/health-workers/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('askaya_worker_token', data.token);
            localStorage.setItem('askaya_worker_name', data.name);
            window.location.href = 'worker-dashboard.html';
        } else {
            const error = await response.json();
            const errorDiv = document.getElementById('errorMessage');
            errorDiv.querySelector('p').textContent = error.detail || 'Login failed';
            errorDiv.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Network error. Please try again.', 'error');
    }
});