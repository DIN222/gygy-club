
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
    // Получаем список ВСЕХ файлов в текущей папке
    const allFiles = fs.readdirSync(__dirname);
    
    console.log("-----------------------------------------");
    console.log("📂 СЕРВЕР ВИДИТ СЛЕДУЮЩИЕ ФАЙЛЫ:");
    console.log(allFiles);
    console.log("-----------------------------------------");

    // Отправляем этот список прямо в браузер, чтобы ты его увидел
    res.send(`
        <h1>Ошибка: HTML-файл не найден!</h1>
        <p>Я ищу в папке: <b>${__dirname}</b></p>
        <p>Вот список файлов, которые я там вижу:</p>
        <ul>${allFiles.map(f => `<li>${f}</li>`).join('')}</ul>
        <hr>
        <p><i>Совет: Если твой файл называется clip.html.txt, переименуй его в clip.html</i></p>
    `);
});

app.listen(9999, () => {
    console.log("🚀 СКАНЕР ЗАПУЩЕН! Зайди на http://localhost:9999");
});
