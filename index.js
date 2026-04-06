/**
 * GY-GY CLOUD CORE v1.1
 * Маршрутизатор между оболочкой (Frontend) и нейросетью (Gemini API)
 * Автор: Gemini (для Шефа)
 */

export default {
  async fetch(request, env) {
    // 1. Настройка CORS (чтобы браузер не блокировал запросы с твоего сайта)
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Ответ на предварительный запрос браузера (Preflight)
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Обрабатываем только POST запросы с данными
    if (request.method === "POST") {
      try {
        const { mode, userPrompt } = await request.json();

        // Проверка наличия ключа в переменных окружения Cloudflare
        if (!env.GEMINI_KEY) {
          return new Response(JSON.stringify({ error: "Ключ GEMINI_KEY не найден в настройках Cloudflare" }), {
            status: 500,
            headers: corsHeaders
          });
        }

        // Адрес API Google Gemini
        const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_KEY}`;

        // Формируем системную инструкцию для ИИ
        const systemInstruction = `
          Ты — ИИ-поэт и хранитель закрытого клуба GY-GY. 
          Твой стиль: киберпанк, ирония, неон.
          Твои ключевые слова: код, бананы, серверная, Гы-Гы, ID, нейроны.
          Задание: Напиши 4 коротких дерзких куплета. 
          Режим генерации: ${mode === 'GOLD' ? 'Элитный/Золотой' : 'Мрачный/Техно'}.
          Тема пользователя: ${userPrompt || 'атмосфера клуба'}.
          Важно: Строй строки ритмично. Используй только текст, без лишних вступлений.
        `;

        const response = await fetch(apiURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: systemInstruction }]
            }],
            generationConfig: {
              temperature: 0.8, // Немного хаоса для креатива
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 256,
            }
          })
        });

        const data = await response.json();

        // Проверка структуры ответа от Google
        if (data.candidates && data.candidates[0].content) {
          const generatedText = data.candidates[0].content.parts[0].text;
          
          return new Response(JSON.stringify({
            status: "success",
            version: "1.1",
            text: generatedText
          }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        } else {
          throw new Error("Некорректный ответ от нейросети");
        }

      } catch (err) {
        return new Response(JSON.stringify({
          status: "error",
          message: err.message,
          code: "CORE_GATEWAY_FAILURE"
        }), {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    // Если кто-то просто зайдет по ссылке воркера через браузер
    return new Response("GY-GY CLOUD CORE v1.1 IS ONLINE. WAITING FOR POST REQUESTS.", {
      status: 200,
      headers: { "Content-Type": "text/plain" }
    });
  }
};
