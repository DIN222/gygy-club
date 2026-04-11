
module.exports = async (req, res) => {
  // Разрешаем только POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не позволен. Используй POST, Шеф!' });
  }

  try {
    const { prompt, mode } = req.body;

    // Стучимся к Gemini напрямую (или твой прокси)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Ты — поэт GY-GY CLUB. Стиль: ${mode}. Напиши смешной куплет про: ${prompt}` }] }]
      })
    });

    const data = await response.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "🎷 Облако задумалось...";

    res.status(200).json({ text: aiText });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка на стороне шлюза', details: error.message });
  }
};
