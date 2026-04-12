
export async function onRequest(context) {
  try {
    const apiKey = context.env.GEMINI_KEY;
    if (!apiKey) return new Response(JSON.stringify({ text: "Ключ не найден!" }));

    const { prompt, mode } = await context.request.json();

    // АКТУАЛЬНЫЙ ПУТЬ 2026 ГОДА:
    // Мы используем Gemini 3 Flash Preview - она самая быстрая и лояльная к лимитам сейчас
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ 
            text: `Ты — мастер юмора в GY-GY CLUB. Стиль: ${mode}. Напиши дерзкий и смешной стишок (4 строки) про: ${prompt}` 
          }] 
        }]
      })
    });

    const data = await res.json();

    if (data.error) {
      // Если 3-flash ещё не "прогрелась" в твоём регионе, скрипт предложит 2.5
      return new Response(JSON.stringify({ text: `Google (Error ${data.error.code}): ${data.error.message}. Попробуй сменить модель на gemini-2.5-flash` }));
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Нейронка в глубоком офлайне...";

    return new Response(JSON.stringify({ text: aiText }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (e) {
    return new Response(JSON.stringify({ text: `Ошибка шлюза: ${e.message}` }));
  }
}
