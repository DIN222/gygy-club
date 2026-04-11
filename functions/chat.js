export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // 1. Читаем входящие данные от verses.html
    const { prompt, mode } = await request.json();

    // 2. Берем ключ из переменных окружения Cloudflare
    const apiKey = env.GEMINI_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ text: "ОШИБКА: Ключ GEMINI_KEY не найден в настройках Cloudflare!" }), { status: 500 });
    }

    // 3. Стучимся в Google Gemini
    const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Ты — поэт GY-GY CLUB. Твой стиль: ${mode}. Напиши смешной, абсурдный и ритмичный куплет на тему: ${prompt}. Используй юмор и сарказм.` }]
        }]
      })
    });

    const data = await apiResponse.json();
    
    // Вытаскиваем текст или даем запасной вариант
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "🎷 Облако выдало тишину... Попробуй другое слово!";

    // 4. Возвращаем ответ фронтенду
    return new Response(JSON.stringify({ text: aiText }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ text: "🧨 Ошибка шлюза: " + err.message }), { status: 500 });
  }
}
