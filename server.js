
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());

// Авто-поиск любого HTML файла в папке
app.get('/', (req, res) => {
    const files = fs.readdirSync(__dirname);
    const htmlFile = files.find(f => f.toLowerCase().includes('html'));

    if (htmlFile) {
        console.log(`✅ СИСТЕМА: Нашел файл "${htmlFile}" и отправляю его!`);
        res.sendFile(path.join(__dirname, htmlFile));
    } else {
        console.log("❌ СИСТЕМА: В папке вообще нет HTML-файлов!");
        console.log("📂 Вижу только это:", files);
        res.status(404).send("Ошибка: Файл не найден. Проверь консоль PowerShell.");
    }
});

// Маршрут для приема данных от кнопки
app.post('/generate-jazz', (req, res) => {
    console.log("-----------------------------------------");
    console.log("🚀 ЕСТЬ КОНТАКТ! ДАННЫЕ ПРИШЛИ:");
    console.log("Текст из BOX:", req.body.text);
    console.log("-----------------------------------------");
    res.json({ status: "success", message: "Сигнал принят Клубом!" });
});

app.listen(9999, () => {
    console.log("-----------------------------------------");
    console.log("🔥 СЕРВЕР ПЕРЕЗАГРУЖЕН В РЕЖИМЕ ПОИСКА!");
    console.log("👉 ЗАХОДИ СЮДА: http://localhost:9999");
    console.log("-----------------------------------------");
});
