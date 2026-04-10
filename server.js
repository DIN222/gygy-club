
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Настройки шлюза
app.use(cors());
app.use(express.json());
// Позволяем серверу раздавать все файлы в текущей папке (html, css, js, картинки)
app.use(express.static(__dirname));

// Хранилище для последнего импульса из облака
let cloudBuffer = null;

// --- МАРШРУТЫ ---

// 1. Главная страница (твой интерфейс)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'verses.html'));
});

// 2. ВХОД ДЛЯ ОБЛАКА (Сюда я присылаю стих)
app.post('/api/push', (req, res) => {
    const { style, text, clip } = req.body;
    cloudBuffer = { style, text, clip, timestamp: Date.now() };
    
    console.log(`\n[!] ИМПУЛЬС ПРИНЯТ: [${style.toUpperCase()}]`);
    console.log(`[!] ТЕКСТ: ${text.substring(0, 30)}...`);
    
    res.json({ status: "delivered", message: "Куплет в буфере" });
});

// 3. ВЫХОД ДЛЯ ИНТЕРФЕЙСА (Твой браузер забирает отсюда)
app.get('/api/pull', (req, res) => {
    if (cloudBuffer) {
        res.json(cloudBuffer);
        cloudBuffer = null; // Очищаем после передачи на стену
    } else {
        res.json(null); // Если ничего нового нет
    }
});

// --- ЗАПУСК ---
const PORT = 9999;
app.listen(PORT, () => {
    console.log("\n" + "=".repeat(40));
    console.log("🔥 GY-GY CLUB: ПРЯМОЙ ЭФИР ВКЛЮЧЕН");
    console.log(`🔗 ССЫЛКА: http://localhost:${PORT}`);
    console.log("=".repeat(40));
    console.log("Жду первый импульс из Облака...");
});
