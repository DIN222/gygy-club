
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());

// Главный отладочный маршрут
app.get('/clip.html', (req, res) => {
    const fullPath = path.join(__dirname, 'clip.html');
    
    console.log("-----------------------------------------");
    console.log("🔍 ЗАПРОС ПРИНЯТ!");
    console.log("📂 Я ищу файл тут:", fullPath);
    
    if (fs.existsSync(fullPath)) {
        console.log("✅ ФАЙЛ НАЙДЕН! Отправляю в браузер...");
        res.sendFile(fullPath);
    } else {
        console.log("❌ ОШИБКА: Файла по этому адресу НЕТ!");
        console.log("📂 Список файлов в моей папке:", fs.readdirSync(__dirname));
        res.status(404).send(`Ошибка: Сервер не видит файл clip.html в папке ${__dirname}`);
    }
});

app.listen(9999, () => {
    console.log("🚀 СЕРВЕР ЗАПУЩЕН НА ПОРТУ 9999");
    console.log("📍 ТЕКУЩАЯ РАБОЧАЯ ДИРЕКТОРИЯ:", __dirname);
});
