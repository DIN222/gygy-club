// api/chat.js
export const config = {
  runtime: 'edge', // Используем быструю среду Vercel Edge
};

export default async function handler(req) {
  // 1. Получаем данные из запроса от твоего HTML
  const { prompt, user_id } = await req.json();

  // 2. Формируем "Системную инструкцию" (Душа клуба)
  const systemInstruction = `Ты — искусственный интеллект клуба GY-GY. 
  Твой стиль: киберпанк, лаконичность, таинственность. 
  Ты общаешься с пользователем ID: ${user_id}. 
  Отвечай коротко (не более 2-3 предложений).`;

  // 3. Вызываем API ИИ (здесь пример для Google Gemini)
  const apiKey = process.env.GEMINI_API_KEY; // Ключ берется из настроек Vercel
  const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${systemInstruction}\n\nПользователь спрашивает: ${prompt}` }]
        }]
      })
    });

    const data = await response.json();
    const aiText = data.candidates[0].content.parts[0].text;

    // 4. Возвращаем чистый ответ обратно на витрину
    return new Response(JSON.stringify({ text: aiText }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Связь со шлюзом прервана..." }), { status: 500 });
  }
}
