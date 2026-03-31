
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// ГЛАВНЫЙ СЕКРЕТ: Указываем серверу брать статические файлы из текущей папки
app.use(express.static(path.join(__dirname)));

// Прямой маршрут для нашего клипа
app.get('/clip.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'clip.html'));
});

// Обработка сигналов от кнопок
app.post('/generate-jazz', (req, res) => {
    console.log("-----------------------------------------");
    console.log("🚀 ЕСТЬ КОНТАКТ! КЛИП ПРИСЛАЛ ДАННЫЕ:");
    console.log("Текст:", req.body.text);
    console.log("Жанр:", req.body.genre);
    console.log("-----------------------------------------");
    res.json({ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" });
});

const PORT = 9999;
app.listen(PORT, () => {
    console.log("-----------------------------------------");
    console.log("✅ СЕРВЕР GY-GY ЗАПУЩЕН!");
    console.log("📂 ПРОВЕРЬ: Файл clip.html должен лежать ТУТ:");
    console.log(path.join(__dirname, 'clip.html'));
    console.log(`👉 АДРЕС: http://localhost:${PORT}/clip.html`);
    console.log("-----------------------------------------");
});
