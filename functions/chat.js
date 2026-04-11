export async function onRequest(context) {
  // Обрабатываем и POST, и GET, чтобы не было 405
  if (context.request.method === "OPTIONS") {
    return new Response(null, { headers: { "Allow": "POST" } });
  }

  try {
    const { prompt, mode } = await context.request.json();
    const apiKey = context.env.GEMINI_KEY;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Стиль: ${mode}. Напиши куплет: ${prompt}` }] }]
      })
    });

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Пусто...";

    return new Response(JSON.stringify({ text }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ text: "Ошибка: " + e.message }), { status: 500 });
  }
}
