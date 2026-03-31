
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());

// ПЕРЕХВАТЧИК: Отдаст первый попавшийся HTML файл в папке
app.get('/', (req, res) => {
    const files = fs.readdirSync(__dirname);
    const htmlFile = files.find(f => f.toLowerCase().includes('html'));
    
    if (htmlFile) {
        console.log(`✅ Нашел файл: ${htmlFile}. Отправляю в браузер!`);
        res.sendFile(path.join(__dirname, htmlFile));
    } else {
        res.status(404).send("🆘 ОШИБКА: В папке E:/GY-GY-CLUB нет ни одного .html файла!");
    }
});

const PORT = 9999;
app.listen(PORT, () => {
    console.log("-----------------------------------------");
    console.log("🚀 СУПЕР-СЕРВЕР GY-GY ЗАПУЩЕН!");
    console.log("👉 ЗАХОДИ ПРОСТО: http://localhost:9999");
    console.log("-----------------------------------------");
});
