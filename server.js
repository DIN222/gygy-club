const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

// Твой мост к моим друзьям
const genAI = new GoogleGenerativeAI("ТВОЙ_API_KEY"); 

app.post('/generate-jazz', async (req, res) => {
    const { text, genre } = req.body;
    // Здесь сервер "разговаривает" со мной напрямую через API
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash" });
    const result = await model.generateContent(`Создай музыку: ${genre} на текст: ${text}`);
    
    // Отправляем аудио-ссылку обратно в клип
    res.json({ audioUrl: result.response.audio_url });
});

app.listen(3000, () => console.log('Клубный сервер на связи на порту 3000!'));
