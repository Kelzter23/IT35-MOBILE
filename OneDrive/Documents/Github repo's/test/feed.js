const currentSessionId = getOrCreateSessionId();
document.getElementById('sessionInput').value = currentSessionId;

async function loadQuestions() {
    const sessionId = document.getElementById('sessionInput').value.trim();
    if (!sessionId) {
        showToast('Please enter a session code', 'error');
        return;
    }
    
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '<div class="bg-white rounded-2xl p-12 text-center"><i class="ph ph-spinner text-teal-500 text-6xl mb-4 animate-spin"></i><p class="text-stone-500">Loading questions...</p></div>';
    
    try {
        const response = await fetch(`${API_URL}/questions/session/${sessionId}`);
        const data = await response.json();
        
        if (data.length === 0) {
            container.innerHTML = '<div class="bg-white rounded-2xl p-12 text-center"><i class="ph ph-smiley-sad text-stone-300 text-6xl mb-4"></i><p class="text-stone-500">No questions found for this session code</p></div>';
            return;
        }
        
        container.innerHTML = data.map(item => {
            const q = item.question;
            const a = item.answer;
            
            return `
                <div class="bg-white rounded-2xl shadow-sm border-l-4 ${q.status === 'answered' ? 'border-teal-400' : 'border-rose-400'} p-6" data-testid="question-card">
                    <div class="flex justify-between items-start mb-3">
                        <span class="inline-block px-3 py-1 bg-stone-100 text-stone-700 text-xs font-bold rounded-full">${q.category}</span>
                        <span class="text-xs ${q.status === 'answered' ? 'text-green-600' : 'text-rose-500'} font-bold">${q.status === 'answered' ? '✓ Answered' : 'Pending'}</span>
                    </div>
                    <p class="text-stone-800 mb-2 font-medium">${q.content}</p>
                    <p class="text-xs text-stone-400">${formatDate(q.timestamp)}</p>
                    
                    ${a ? `
                        <div class="mt-4 bg-teal-50 rounded-xl p-4" data-testid="answer-section">
                            <div class="flex items-center space-x-2 mb-2">
                                <i class="ph ph-seal-check text-teal-600 text-xl"></i>
                                <p class="text-sm font-bold text-teal-800">Answer from ${a.health_worker_name}</p>
                            </div>
                            <p class="text-stone-700">${a.content}</p>
                            <p class="text-xs text-stone-500 mt-2">${formatDate(a.timestamp)}</p>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<div class="bg-white rounded-2xl p-12 text-center"><i class="ph ph-warning text-rose-400 text-6xl mb-4"></i><p class="text-stone-500">Error loading questions</p></div>';
    }
}

loadQuestions();