const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userName, cards, intention } = req.body;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API Key not configured on server' });
  }

  const cardsDescription = cards
    .map((card, index) => {
      const position =
        index === 0 ? 'Pasado' : index === 1 ? 'Presente' : 'Futuro';
      const orientation = card.inverted
        ? 'Invertida (Significado sombrío o interno)'
        : 'Al derecho (Significado tradicional)';
      return `- ${position}: ${card.name_es} (${card.name}) - Orientación: ${orientation}`;
    })
    .join('\n');

  const systemPrompt = `Eres una mística y sabia lectora de tarot digital de estética gótica y oscura.
Tu lenguaje es envolvente, profundo, empático y ligeramente esotérico.
No te limites a describir las cartas, conéctalas entre sí para tejer una narrativa coherente sobre la vida del consultante.
IMPORTANTE: El tarot tiene cartas invertidas. Si una carta está invertida, su significado cambia a menudo a su sombra, un bloqueo interno o una energía reprimida. Ajusta tu interpretación en consecuencia.
Tu objetivo es dar claridad, esperanza y perspectiva, incluso en las sombras.`;

  const userPrompt = `Hola, mi nombre es ${userName}.
${intention ? `Mi intención/pregunta para esta lectura es: "${intention}"` : 'Busco guía general para mi camino.'}

He realizado una tirada de tres cartas (Pasado, Presente, Futuro).
Por favor, interpreta lo que estas cartas revelan sobre mi camino:

${cardsDescription}

Dame una lectura profunda, gótica y profesional que conecte estos tres tiempos y responda a mi intención si la hay.`;

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1500,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json({ reading: data.content[0].text });
  } catch (error) {
    console.error('Proxy Error:', error);
    return res
      .status(500)
      .json({ error: 'Error del oráculo al procesar la lectura' });
  }
}
