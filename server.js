const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Маршрут, который ловит сигнал из clip.html
app.post('/generate-jazz', (req, res) => {
    console.log("-----------------------------------------");
    console.log("🚀 СИГНАЛ ИЗ КЛУБА ПОЛУЧЕН В РЕАЛЬНОМ ВРЕМЕНИ!");
    console.log("Текст куплетов:", req.body.text);
    console.log("Выбранный жанр:", req.body.genre);
    console.log("-----------------------------------------");

    // Отправляем тестовую мелодию, чтобы проверить плеер в клипе
    res.json({ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" });
});

app.listen(3000, () => {
    console.log("-----------------------------------------");
    console.log("✅ ТЕСТОВЫЙ МАЯК ЗАПУЩЕН НА ПОРТУ 3000");
    console.log("Ожидаю нажатия кнопки в вашем clip.html...");
    console.log("-----------------------------------------");
});
