const express = require('express');
const cors = require('cors');
const path = require('path'); // Добавь это
const app = express();

app.use(cors());
app.use(express.json());

// Эта строка заставит сервер "видеть" твои файлы html
app.use(express.static(__dirname)); 

app.post('/generate-jazz', (req, res) => {
    console.log("!!! КОНТАКТ ЕСТЬ !!!");
    console.log("Текст:", req.body.text);
    res.json({ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" });
});

app.listen(3000, () => {
    console.log("✅ СЕРВЕР ТЕПЕРЬ ХОСТИТ ВЕСЬ КЛУБ!");
    console.log("👉 Введи в браузере: http://localhost:3000/clip.html");
});
