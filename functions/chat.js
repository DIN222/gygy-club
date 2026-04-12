
export async function onRequest(context) {
  try {
    const apiKey = context.env.GEMINI_KEY;
    if (!apiKey) return new Response(JSON.stringify({ text: "Ключ не найден в Environment Variables!" }));

    const { prompt, mode } = await context.request.json();

    // ВАЖНО: Используем v1beta (она более лояльна к Flash) и имя с -latest
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

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
      // Выводим детальную ошибку, чтобы понять, в чем затык
      return new Response(JSON.stringify({ text: `Ошибка Google (${data.error.code}): ${data.error.message}` }));
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Нейронка задумалась и ушла в себя...";

    return new Response(JSON.stringify({ text: aiText }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (e) {
    return new Response(JSON.stringify({ text: `Ошибка шлюза: ${e.message}` }));
  }
}
