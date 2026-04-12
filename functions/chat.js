
export async function onRequest(context) {
  const { request, env } = context;

  // Разрешаем только POST запросы
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { prompt } = await request.json();
    const apiKey = env.GEMINI_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Ключ API не найден в настройках Cloudflare" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Используем максимально стабильную модель 2.5-flash
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    // Формируем системную инструкцию: ЖЕСТКО ЗАПРЕЩАЕМ КОММЕНТАРИИ
    const systemInstruction = "Ты — Мастер Юмора GY-GY CLUB. Твоя задача: писать только рифмованные куплеты. " +
                              "ВАЖНО: Выдавай СТРОГО текст стихов. Никаких приветствий, никаких 'ХА-ХА', " +
                              "никаких комментариев до или после текста. Только куплеты.";

  // Достаем prompt и mode из входящего запроса
    const { prompt, mode } = await request.json(); 

    // Формируем полезную нагрузку для Google
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

    // Финальная зачистка на случай, если нейронка всё же решила поболтать
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
