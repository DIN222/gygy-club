// api/chat.js
export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { prompt, user_id, mode } = await req.json();

  // Вместо прямого вызова Gemini, стучимся в наш развернутый Воркер
  const workerURL = 'https://gygy-club.2work21955.workers.dev/';

  try {
    const response = await fetch(workerURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        mode: mode || 'GOLD', 
        userPrompt: prompt,
        user_id: user_id 
      })
    });

    const data = await response.json();

    return new Response(JSON.stringify({ text: data.text }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Клуб временно в тумане..." }), { status: 500 });
  }
}
