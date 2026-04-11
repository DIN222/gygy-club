// api/chat.js — Шлюз GY-GY CLUB
export const config = { runtime: 'edge' };

export default async function handler(req) {
  try {
    const { prompt, user_id } = await req.json();

    // Направляем поток прямо в наше Облачное Ядро
    const response = await fetch('https://gygy-club.2work21955.workers.dev/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        mode: 'ABSURD',     // Включаем режим безумного джаза
        userPrompt: prompt, 
        user_id: user_id 
      })
    });

    const data = await response.json();

    return new Response(JSON.stringify({ text: data.text }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      text: "🎷 Шеф, пробка в облаках! Нажми на кнопку ещё раз, прочистим трубы..." 
    }), { status: 200 });
  }
}
