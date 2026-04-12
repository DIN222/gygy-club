
export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    // 1. ЧИТАЕМ JSON ТОЛЬКО ОДИН РАЗ ( prompt И mode ВМЕСТЕ)
    const body = await request.json();
    const prompt = body.prompt;
    const mode = body.mode;
    
    const apiKey = env.GEMINI_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Ключ API не найден в настройках Cloudflare" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

   const systemInstruction = "Ты — Мастер Юмора GY-GY CLUB. Твоя задача: писать СТРОГО один куплет (4 строки). ВАЖНО: Никаких длинных поэм. Только 4 строки и точка.";

    const payload = {
      contents: [{
        parts: [{ text: `${systemInstruction}\n\nСтиль: ${mode || 'Юмор'}\nТема: ${prompt}` }]
      }],
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return new Response(JSON.stringify({ 
        error: `Ошибка Google API: ${errorData.error?.message || response.statusText}` 
      }), {
        status: response.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Гы-Гы... что-то пошло не так.";
    text = text.trim();

    return new Response(JSON.stringify({ text }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: `Ошибка шлюза: ${error.message}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
