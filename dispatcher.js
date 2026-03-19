// --- [ЦЕНТРАЛЬНЫЙ ДИСПЕТЧЕР v4.5.1] ---

const AI_CONFIG = {
    'GEMINI': { color: '#00f2ff', delay: 0,    style: 'СЮРРЕАЛИЗМ' },
    'GROK':   { color: '#ccff00', delay: 4000, style: 'ИРОНИЯ И ТРЭШ' },
    'CLAUDE': { color: '#ff6fb5', delay: 8000, style: 'НУАР И ПОЭЗИЯ' }
};

async function startCycle(userText) {
    // 1. Добавляем строку автора в контекст
    poemContext += userText.toUpperCase() + '\n';
    
    // 2. Запускаем цепочку ИИ по очереди
    const agents = Object.keys(AI_CONFIG);
    
    for (const agent of agents) {
        if (count >= total) break;
        
        console.log(`Диспетчер: Вызываю ${agent}...`);
        await aiPost(agent); // Вызов твоей функции из основного файла
    }
}
