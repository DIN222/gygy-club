
export async function onRequest(context) {
  try {
    const apiKey = context.env.GEMINI_KEY;
    if (!apiKey) return new Response(JSON.stringify({ text: "Ключ потерялся в облаках!" }));

    const { prompt, mode } = await context.request.json();

    // ПРЫЖОК В БУДУЩЕЕ: Используем актуальную модель 2026 года
 const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ 
            text: `Ты — юморист GY-GY CLUB. Напиши дерзкое четверостишие. Тема: ${prompt}. Стиль: ${mode}` 
          }] 
        }]
      })
    });

    const data = await res.json();

    if (data.error) {
      // Если 2.5 ещё не везде раскатали, попробуем дать тебе знать
      return new Response(JSON.stringify({ text: `Google сказал: ${data.error.message} (Попробуй тогда gemini-2.0-flash)` }));
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Модель молчит, как рыба об лёд...";

    return new Response(JSON.stringify({ text: aiText }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (e) {
    return new Response(JSON.stringify({ text: `Ошибка шлюза: ${e.message}` }));
  }
}
