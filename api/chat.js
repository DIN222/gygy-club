
// api/chat.js
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // 1. Проверяем метод. Если это не POST, мы вежливо просим не баловаться.
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ text: "🎷 Шеф, используй POST!" }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { prompt, mode } = await req.json();

    // 2. Стучимся в Cloudflare
    const cfResponse = await fetch('https://gygy-club.2work21955.workers.dev/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userPrompt: prompt, 
        mode: mode || 'ABSURD' 
      })
    });

    if (!cfResponse.ok) {
        throw new Error(`Cloudflare error: ${cfResponse.status}`);
    }

    const data = await cfResponse.json();

    // 3. Возвращаем чистый джаз
    return new Response(JSON.stringify({ text: data.text }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // На всякий случай для свободы
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ text: "🎷 Облако в тумане... Но мы пробьемся! Попробуй еще раз." }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
