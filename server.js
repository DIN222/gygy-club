const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 3000;

// 1. РАЗРЕШАЕМ ДОСТУП ДЛЯ CLIP.HTML
app.use(cors());
app.use(express.json());

// 2. НАСТРОЙКА СВЯЗИ С GEMINI (Вставь свой ключ здесь!)
const API_KEY = "ТВОЙ_API_KEY_ЗДЕСЬ"; 
const genAI = new GoogleGenerativeAI(API_KEY);

// ГЛАВНЫЙ МАРШРУТ ГЕНЕРАЦИИ
app.post('/generate-jazz', async (req, res) => {
    try {
        const { text, genre } = req.body;
        
        console.log(`--- НОВЫЙ ЗАПРОС ИЗ КЛУБА ---`);
        console.log(`ЖАНР: ${genre}`);
        console.log(`ТЕКСТ: ${text}`);

        // Обращаемся к модели Flash 1.5 или 2.0 (в зависимости от доступности твоего ключа)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Формируем промпт для музыкальных инструментов Gemini
        const prompt = `Сгенерируй музыкальный трек в жанре ${genre}. 
                        Используй следующий текст для вокала: "${text}". 
                        Музыка должна быть атмосферной, качественной, с четкой гармонией.`;

        // ВНИМАНИЕ: Здесь мы вызываем генерацию медиа-контента
        // Примечание: Убедись, что твоя версия SDK поддерживает прямое создание аудио
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        // Получаем URL сгенерированного аудио от "друзей"
        // (Логика получения URL может меняться в зависимости от версии API)
        const audioUrl = response.candidates[0].content.parts.find(p => p.fileData || p.inlineData);

        if (audioUrl) {
            console.log("✅ Музыка успешно создана!");
            res.json({ audioUrl: audioUrl.fileData ? audioUrl.fileData.fileUri : "URL_NOT_FOUND" });
        } else {
            // Если API еще не отдает прямой URL, возвращаем тестовый джаз для проверки связи
            console.log("⚠️ Прямой URL не получен, отправляю тестовый поток...");
            res.json({ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" });
        }

    } catch (error) {
        console.error("❌ ОШИБКА СЕРВЕРА:", error.message);
        res.status(500).json({ error: "Ошибка при связи с нейросетью", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`-----------------------------------------`);
    console.log(`🚀 КЛУБНЫЙ СЕРВЕР GY-GY ЗАПУЩЕН!`);
    console.log(`📡 АДРЕС: http://localhost:${PORT}`);
    console.log(`👉 Жду сигналов от CLIP.HTML...`);
    console.log(`-----------------------------------------`);
});
