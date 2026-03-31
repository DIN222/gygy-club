
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.get('/clip.html', (req, res) => {
    // Эта строка выведет в терминал точный путь, по которому сервер лезет за файлом
    const filePath = path.join(__dirname, 'clip.html');
    console.log("🔍 Ищу файл по адресу:", filePath); 
    res.sendFile(filePath);
});

app.listen(9999, () => {
    console.log("-----------------------------------------");
    console.log("🚀 СЕРВЕР GY-GY: ПРОВЕРКА ПУТЕЙ");
    console.log("📂 ТЕКУЩАЯ ПАПКА:", __dirname);
    console.log("👉 ССЫЛКА: http://localhost:9999/clip.html");
    console.log("-----------------------------------------");
});
