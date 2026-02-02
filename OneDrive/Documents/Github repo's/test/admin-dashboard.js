async function loadAnalytics() {
    try {
        const response = await fetch(`${API_URL}/analytics`);
        const data = await response.json();
        
        document.getElementById('totalQuestions').textContent = data.total_questions;
        document.getElementById('answeredQuestions').textContent = data.answered_questions;
        document.getElementById('totalWorkers').textContent = data.total_workers;
        document.getElementById('pendingWorkers').textContent = data.pending_workers;
    } catch (error) {
        console.error('Error loading analytics:', error);
    }
}

async function loadPendingWorkers() {
    try {
        const response = await fetch(`${API_URL}/health-workers/pending`);
        const workers = await response.json();
        
        const container = document.getElementById('pendingWorkersContainer');
        
        if (workers.length === 0) {
            container.innerHTML = '<div class="bg-white rounded-2xl p-12 text-center"><p class="text-stone-500">No pending applications</p></div>';
            return;
        }
        
        container.innerHTML = workers.map(w => `
            <div class="bg-white rounded-2xl shadow-sm p-6" data-testid="pending-worker-card">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div class="flex-1">
                        <h3 class="text-lg font-bold text-stone-900 mb-1">${w.name}</h3>
                        <p class="text-sm text-stone-600 mb-2">${w.email}</p>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full">${w.credentials}</span>
                            <span class="px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-full">${w.specialization}</span>
                        </div>
                        <p class="text-xs text-stone-400 mt-2">Registered: ${formatDate(w.registered_at)}</p>
                    </div>
                    <div class="flex gap-3">
                        <button onclick="approveWorker('${w.id}', 'approved')" 
                            class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium transition-all" data-testid="approve-worker-btn">
                            Approve
                        </button>
                        <button onclick="approveWorker('${w.id}', 'rejected')" 
                            class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-medium transition-all" data-testid="reject-worker-btn">
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading workers:', error);
    }
}

async function approveWorker(workerId, status) {
    try {
        const response = await fetch(`${API_URL}/health-workers/${workerId}/approve`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        
        if (response.ok) {
            showToast(`Worker ${status}!`);
            loadAnalytics();
            loadPendingWorkers();
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Action failed', 'error');
    }
}

loadAnalytics();
loadPendingWorkers();