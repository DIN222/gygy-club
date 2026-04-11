
export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ text: "🎷 Только POST, Шеф!" });
  }

  try {
    const { prompt, mode } = req.body;

    const cfResponse = await fetch('https://gygy-club.2work21955.workers.dev/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userPrompt: prompt, 
        mode: mode || 'ABSURD' 
      })
    });

    const data = await cfResponse.json();
    return res.status(200).json({ text: data.text });

  } catch (error) {
    return res.status(200).json({ text: "🎷 Облако в тумане, но шлюз работает! Попробуй еще раз." });
  }
}
