const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// ГЛАВНЫЙ СЕКРЕТ: говорим серверу брать файлы из ПАПКИ, где лежит сам server.js
app.use(express.static(__dirname));

// Маршрут для генерации музыки
app.post('/generate-jazz', (req, res) => {
    console.log("-----------------------------------------");
    console.log("🚀 КОНТАКТ ЕСТЬ! СИГНАЛ ПРИНЯТ!");
    console.log("Текст:", req.body.text);
    console.log("-----------------------------------------");
    res.json({ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" });
});

app.listen(3000, () => {
    console.log("-----------------------------------------");
    console.log("✅ КЛУБНЫЙ ХОСТИНГ ЗАПУЩЕН");
    console.log("📂 ПРОВЕРЬ: Файл clip.html должен лежать здесь:");
    console.log(path.join(__dirname, 'clip.html'));
    console.log("👉 ССЫЛКА: http://localhost:3000/clip.html");
    console.log("-----------------------------------------");
});
