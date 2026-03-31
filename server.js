
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// ГЛАВНЫЙ СЕКРЕТ: Указываем серверу, что файлы лежат ПРЯМО ТУТ
app.use(express.static(__dirname));

// Принудительный маршрут для главной страницы клипа
app.get('/clip.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'clip.html'));
});

app.post('/generate-jazz', (req, res) => {
    console.log("-----------------------------------------");
    console.log("🚀 ЕСТЬ КОНТАКТ! КЛИП ПРИСЛАЛ ДАННЫЕ:");
    console.log("Текст куплетов:", req.body.text);
    console.log("Выбранный жанр:", req.body.genre);
    console.log("-----------------------------------------");
    
    // Пока что отдаем тестовый джаз
    res.json({ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" });
});

app.listen(3000, () => {
    console.log("-----------------------------------------");
    console.log("✅ СЕРВЕР GY-GY ПОЛНОСТЬЮ УКОМПЛЕКТОВАН!");
    console.log("📂 РАБОЧАЯ ПАПКА:", __dirname);
    console.log("👉 ЗАХОДИ СЮДА: http://localhost:3000/clip.html");
    console.log("-----------------------------------------");
});
