const sessionId = getOrCreateSessionId();
document.getElementById('sessionDisplay').textContent = sessionId;

document.getElementById('questionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const category = document.getElementById('category').value;
    const content = document.getElementById('content').value;
    
    try {
        const response = await fetch(`${API_URL}/questions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category, content, session_id: sessionId })
        });
        
        if (response.ok) {
            document.getElementById('questionForm').reset();
            document.getElementById('successMessage').classList.remove('hidden');
            setTimeout(() => {
                window.location.href = 'feed.html';
            }, 2000);
        } else {
            showToast('Failed to submit question. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Network error. Please check your connection.', 'error');
    }
});