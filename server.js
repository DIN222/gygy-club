
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.get('/clip.html', (req, res) => {
    const file = path.join(__dirname, 'clip.html');
    
    // ЛОГ В КОНСОЛЬ (СМОТРИ В СИНЕЕ ОКНО!)
    console.log("-----------------------------------------");
    console.log("🔍 КТО-ТО ПРИШЕЛ ЗА КЛИПОМ!");
    console.log("📍 Я ИЩУ ФАЙЛ ТУТ:", file);
    
    if (fs.existsSync(file)) {
        console.log("✅ НАШЕЛ! ОТПРАВЛЯЮ...");
        res.sendFile(file);
    } else {
        console.log("❌ ОШИБКА: ФАЙЛА НЕТ!");
        console.log("📂 ВОТ ЧТО Я ВИЖУ В ПАПКЕ:", fs.readdirSync(__dirname));
        res.status(404).send("Сервер работает, но файл clip.html не найден в " + __dirname);
    }
});

app.listen(9999, () => {
    console.log("🚀 СЕРВЕР НА ПОРТУ 9999 ЗАПУЩЕН!");
});
