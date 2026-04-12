export async function onRequest(context) {
  try {
    const apiKey = context.env.GEMINI_KEY;
    
    // Проверка ключа (покажет первые 4 символа для безопасности)
    if (!apiKey) {
        return new Response(JSON.stringify({ text: "ОШИБКА: Скрипт не видит GEMINI_KEY в настройках Cloudflare!" }));
    }

    const { prompt } = await context.request.json();

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Напиши одну короткую шутку про: ${prompt}` }] }]
      })
    });

    const data = await res.json();
    
    // Если Google вернул ошибку, мы её увидим
    if (data.error) {
        return new Response(JSON.stringify({ text: "Google Error: " + data.error.message }));
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Нейронка промолчала...";

    return new Response(JSON.stringify({ text: aiText }));

  } catch (e) {
    return new Response(JSON.stringify({ text: "Ошибка шлюза: " + e.message }));
  }
}
