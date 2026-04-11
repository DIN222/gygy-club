// api/chat.js
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // Разрешаем POST-запросы
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ text: "🎷 Шеф, используй POST!" }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { prompt, mode } = await req.json();

    // Стучимся в Cloudflare
    const cfResponse = await fetch('https://gygy-club.2work21955.workers.dev/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userPrompt: prompt, 
        mode: mode || 'ABSURD' 
      })
    });

    const data = await cfResponse.json();

    return new Response(JSON.stringify({ text: data.text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ text: "🎷 Облако в тумане... Попробуй еще раз!" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
