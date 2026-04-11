export async function onRequest(context) {
  // Обработка предварительного запроса браузера (CORS)
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  // Если это не POST, всё равно пытаемся ответить красиво
  if (context.request.method !== "POST") {
    return new Response(JSON.stringify({ text: "Шеф, шли POST-запрос!" }), { status: 200 });
  }

  try {
    const { prompt, mode } = await context.request.json();
    const apiKey = context.env.GEMINI_KEY;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Стиль: ${mode}. Напиши смешной куплет про: ${prompt}` }] }]
      })
    });

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "🎷 Тишина в эфире...";

    return new Response(JSON.stringify({ text }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ text: "Ошибка: " + e.message }), { status: 500 });
  }
}
