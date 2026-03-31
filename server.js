
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.get('/clip.html', (req, res) => {
    const filePath = path.join(__dirname, 'clip.html');
    console.log("-----------------------------------------");
    console.log("📂 Я ищу файл по адресу:", filePath);
    
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        console.log("❌ ОШИБКА: Файла clip.html нет в папке!");
        console.log("📂 Список всех файлов, которые я вижу:", fs.readdirSync(__dirname));
        res.status(404).send("Сервер не видит файл clip.html в папке " + __dirname);
    }
});

app.listen(9999, () => {
    console.log("🚀 СЕРВЕР ЗАПУЩЕН! Проверь: http://localhost:9999/clip.html");
});
