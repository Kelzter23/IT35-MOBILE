const token = localStorage.getItem('askaya_worker_token');
const workerName = localStorage.getItem('askaya_worker_name');

if (!token) {
    window.location.href = 'worker-login.html';
}

document.getElementById('workerName').textContent = workerName || 'Worker';

async function loadPendingQuestions() {
    try {
        const response = await fetch(`${API_URL}/questions/pending`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Unauthorized');
        
        const questions = await response.json();
        const container = document.getElementById('questionsContainer');
        
        if (questions.length === 0) {
            container.innerHTML = '<div class="bg-white rounded-2xl p-12 text-center"><i class="ph ph-check-circle text-teal-400 text-6xl mb-4"></i><p class="text-stone-500">No pending questions. Great job!</p></div>';
            return;
        }
        
        container.innerHTML = questions.map(q => `
            <div class="bg-white rounded-2xl shadow-sm border-l-4 border-rose-400 p-6" data-testid="pending-question-card">
                <div class="flex justify-between items-start mb-3">
                    <span class="inline-block px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-full">${q.category}</span>
                    <span class="text-xs text-stone-400">${formatDate(q.timestamp)}</span>
                </div>
                <p class="text-stone-800 mb-4">${q.content}</p>
                <button onclick="openAnswerModal('${q.id}', '${q.category}', '${q.content.replace(/'/g, "\\'")}')"
                    class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full font-medium transition-all" data-testid="answer-question-btn">
                    Answer Question
                </button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error:', error);
        window.location.href = 'worker-login.html';
    }
}

function openAnswerModal(questionId, category, content) {
    document.getElementById('questionId').value = questionId;
    document.getElementById('modalCategory').textContent = category.toUpperCase();
    document.getElementById('modalQuestion').textContent = content;
    document.getElementById('answerModal').classList.remove('hidden');
}

function closeAnswerModal() {
    document.getElementById('answerModal').classList.add('hidden');
    document.getElementById('answerForm').reset();
}

document.getElementById('answerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const questionId = document.getElementById('questionId').value;
    const content = document.getElementById('answerContent').value;
    
    try {
        const response = await fetch(`${API_URL}/answers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ question_id: questionId, content })
        });
        
        if (response.ok) {
            closeAnswerModal();
            showToast('Answer submitted successfully!');
            loadPendingQuestions();
        } else {
            showToast('Failed to submit answer', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Network error', 'error');
    }
});

function logout() {
    localStorage.removeItem('askaya_worker_token');
    localStorage.removeItem('askaya_worker_name');
    window.location.href = 'index.html';
}

loadPendingQuestions();