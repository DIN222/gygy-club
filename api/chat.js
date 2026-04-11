// api/chat.js
export const config = {
  runtime: 'edge', // Оставляем Edge для скорости
};

export default async function handler(req) {
  try {
    // 1. Принимаем данные от фронтенда (твоего HTML/JS)
    const { prompt, user_id } = await req.json();

    // 2. Наш облачный адрес (Core-ядро)
    const workerURL = 'https://gygy-club.2work21955.workers.dev/';

    // 3. Стучимся в Cloudflare
    const response = await fetch(workerURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        mode: 'GOLD',       // Наш премиальный режим пошива
        userPrompt: prompt, // Тема от юзера
        user_id: user_id    // Тот самый цифровой след
      })
    });

    if (!response.ok) {
        throw new Error(`Ошибка облака: ${response.status}`);
    }

    const data = await response.json();

    // 4. Отправляем готовый кусок джаза обратно в чат
    return new Response(JSON.stringify({ text: data.text }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    // Если облако на переучете — вежливо извиняемся
    return new Response(JSON.stringify({ 
      text: "🎷 Извини, Шеф, в облаках туман... Попробуй через минуту, настроим струны!" 
    }), { status: 200 }); // Возвращаем 200, чтобы фронтенд не падал, а вывел текст ошибки
  }
}
