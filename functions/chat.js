
export async function onRequest(context) {
  try {
    const apiKey = context.env.GEMINI_KEY;
    if (!apiKey) return new Response(JSON.stringify({ text: "Ключ GEMINI_KEY не найден!" }));

    const { prompt, mode } = await context.request.json();

    // Используем стабильную версию v1 и модель gemini-1.5-flash
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ 
            text: `Стиль: ${mode || 'смешной'}. Напиши короткий, дерзкий, рифмованный куплет (4 строки) на тему: ${prompt}. Юмор обязателен!` 
          }] 
        }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 200,
        }
      })
    });

    const data = await res.json();

    if (data.error) {
      return new Response(JSON.stringify({ text: `Ошибка API: ${data.error.message}` }));
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Хьюстон, у нас пустой ответ...";

    return new Response(JSON.stringify({ text: aiText }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (e) {
    return new Response(JSON.stringify({ text: `Ошибка шлюза: ${e.message}` }));
  }
}
