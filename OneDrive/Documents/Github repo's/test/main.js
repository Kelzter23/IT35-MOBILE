const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:8001/api' 
    : '/api';

function getOrCreateSessionId() {
    let sessionId = localStorage.getItem('askaya_session_id');
    if (!sessionId) {
        sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
        localStorage.setItem('askaya_session_id', sessionId);
    }
    return sessionId;
}

function copySessionId() {
    const sessionId = getOrCreateSessionId();
    navigator.clipboard.writeText(sessionId).then(() => {
        alert('Session code copied to clipboard!');
    });
}

function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    toast.className = `fixed top-6 right-6 ${bgColor} text-white px-6 py-4 rounded-xl shadow-lg z-50`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}