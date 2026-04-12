
export async function onRequest(context) {
  try {
    const apiKey = context.env.GEMINI_KEY;
    if (!apiKey) return new Response(JSON.stringify({ text: "Ключ не найден в настройках!" }));

    const { prompt, mode } = await context.request.json();

    // Переходим на классику, которая доступна всем
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ 
            text: `Ты — юморист в GY-GY CLUB. Напиши смешной, дерзкий стишок (4 строки) на тему: ${prompt}. Стиль: ${mode}` 
          }] 
        }]
      })
    });

    const data = await res.json();

    if (data.error) {
      // Если даже gemini-pro не сработает, выведи нам всё, что он о себе возомнил!
      return new Response(JSON.stringify({ text: `Google (Error ${data.error.code}): ${data.error.message}` }));
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Нейронка молчит как партизан...";

    return new Response(JSON.stringify({ text: aiText }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (e) {
    return new Response(JSON.stringify({ text: `Ошибка шлюза: ${e.message}` }));
  }
}
