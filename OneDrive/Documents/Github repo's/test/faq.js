let allFAQs = [];

async function loadFAQs() {
    try {
        const response = await fetch(`${API_URL}/faq`);
        allFAQs = await response.json();
        displayFAQs(allFAQs);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('faqContainer').innerHTML = '<div class="bg-white rounded-2xl p-12 text-center"><p class="text-stone-500">Error loading FAQs. Using sample data.</p></div>';
        loadSampleFAQs();
    }
}

function loadSampleFAQs() {
    allFAQs = [
        { id: '1', topic: 'What is puberty?', content: 'Puberty is the process of physical changes through which a child\'s body matures into an adult body capable of sexual reproduction. It typically begins between ages 8-13 for girls and 9-14 for boys.', category: 'puberty' },
        { id: '2', topic: 'How long does a period last?', content: 'A typical menstrual period lasts 3-7 days. The menstrual cycle (from the first day of one period to the first day of the next) usually ranges from 21-35 days, with 28 days being average.', category: 'menstruation' },
        { id: '3', topic: 'What are contraceptive options for teens?', content: 'Common options include condoms (barrier method), birth control pills, IUDs, and implants. It\'s important to consult with a healthcare provider to discuss which method is best for you.', category: 'contraception' },
        { id: '4', topic: 'Is it normal to feel anxious during puberty?', content: 'Yes, it\'s completely normal. Puberty brings hormonal changes that can affect mood and emotions. If anxiety feels overwhelming, talking to a counselor or trusted adult can help.', category: 'mental-health' }
    ];
    displayFAQs(allFAQs);
}

function displayFAQs(faqs) {
    const container = document.getElementById('faqContainer');
    
    if (faqs.length === 0) {
        container.innerHTML = '<div class="bg-white rounded-2xl p-12 text-center"><p class="text-stone-500">No FAQs found for this category</p></div>';
        return;
    }
    
    container.innerHTML = faqs.map((faq, index) => `
        <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow" data-testid="faq-item">
            <button onclick="toggleFAQ(${index})" class="w-full text-left flex justify-between items-center">
                <h3 class="text-lg font-bold text-stone-800 pr-4">${faq.topic}</h3>
                <i class="ph ph-caret-down text-stone-400 text-xl faq-icon" id="icon-${index}"></i>
            </button>
            <div id="faq-${index}" class="hidden mt-4 pt-4 border-t border-stone-100">
                <p class="text-stone-600 leading-relaxed">${faq.content}</p>
                <span class="inline-block mt-3 px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full">${faq.category}</span>
            </div>
        </div>
    `).join('');
}

function toggleFAQ(index) {
    const content = document.getElementById(`faq-${index}`);
    const icon = document.getElementById(`icon-${index}`);
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}

function filterFAQ(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-category') === category) {
            btn.classList.remove('bg-stone-100', 'text-stone-700');
            btn.classList.add('bg-teal-500', 'text-white');
        } else {
            btn.classList.remove('bg-teal-500', 'text-white');
            btn.classList.add('bg-stone-100', 'text-stone-700');
        }
    });
    
    if (category === 'all') {
        displayFAQs(allFAQs);
    } else {
        const filtered = allFAQs.filter(faq => faq.category === category);
        displayFAQs(filtered);
    }
}

loadFAQs();