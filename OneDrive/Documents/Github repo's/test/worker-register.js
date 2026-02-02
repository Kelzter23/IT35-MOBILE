document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        credentials: document.getElementById('credentials').value,
        specialization: document.getElementById('specialization').value
    };
    
    try {
        const response = await fetch(`${API_URL}/health-workers/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            document.getElementById('registerForm').reset();
            document.getElementById('successMessage').classList.remove('hidden');
            setTimeout(() => {
                window.location.href = 'worker-login.html';
            }, 3000);
        } else {
            const error = await response.json();
            showToast(error.detail || 'Registration failed', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Network error. Please try again.', 'error');
    }
});