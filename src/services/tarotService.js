const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

/**
 * Generates a fallback reading when the API is unavailable or out of credits.
 */
const getFallbackReading = (userName, cards) => {
  const cardNames = cards.map((c) => c.name_es).join(', ');
  return `(🔮 Lectura Simulada - Modo Sin Créditos)

Saludos, ${userName}. Los astros ven que la conexión con el éter digital es tenue hoy, pero las cartas aún hablan.

Has elegido: ${cardNames}.

**El Pasado (${cards[0].name_es}):** Esta carta indica que vienes de un momento de transición importante. Las energías que dejaste atrás fueron fundamentales para formar quien eres hoy.

**El Presente (${cards[1].name_es}):** En este momento, te encuentras ante una situación que requiere tu atención plena. La energía de esta carta sugiere que tienes las herramientas necesarias, aunque a veces dudes de ti mismo.

**El Futuro (${cards[2].name_es}):** El destino te sonríe con esta carta. Si mantienes el rumbo y confías en tu intuición, el resultado será favorable. No temas a los cambios que se avecinan.

Los caminos están abiertos, solo debes atreverte a caminarlos.`;
};

/**
 * Generates a tarot reading based on the selected cards and user name.
 * @param {string} userName - The name of the user requesting the reading.
 * @param {Array} cards - Array of card objects { name, name_es, ... }
 * @returns {Promise<string>} The interpretation text.
 */
export const getTarotReading = async (userName, cards) => {
  const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;

  // If no key is present, return fallback immediately
  if (!apiKey) {
    console.warn('No API Key found. Using fallback reading.');
    return getFallbackReading(userName, cards);
  }

  // Construct the prompt
  const cardsDescription = cards
    .map((card, index) => {
      const position =
        index === 0 ? 'Pasado' : index === 1 ? 'Presente' : 'Futuro';
      return `- ${position}: ${card.name_es} (${card.name})`;
    })
    .join('\n');

  const systemPrompt = `Eres una mística y sabia lectora de tarot digital. Tu lenguaje es envolvente,
empático y ligeramente esotérico, pero claro y directo en tus consejos.
No te limites a describir las cartas, conéctalas entre sí para tejer una narrativa coherente sobre la vida del consultante.
Tu objetivo es dar claridad, esperanza y perspectiva.`;

  const userPrompt = `Hola, mi nombre es ${userName}.
He realizado una tirada de tres cartas (Pasado, Presente, Futuro).
Por favor, interpreta lo que estas cartas revelan sobre mi camino:

${cardsDescription}

Dame una lectura profunda que conecte estos tres tiempos.`;

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
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

    if (!response.ok) {
      const errorData = await response.json();
      console.warn('API Error, falling back to simulation:', errorData);
      // If it's a credit balance error (400) or unauthorized (401), we use functionality
      if (
        response.status === 400 ||
        response.status === 401 ||
        response.status === 403
      ) {
        return getFallbackReading(userName, cards);
      }
      throw new Error(
        `Error de los espíritus (${response.status}): ${
          errorData.error?.message || 'Conexión interrumpida'
        }`,
      );
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Error fetching reading:', error);
    // Even on network error, we can offer the fallback if we want to be very resilient
    // But for now, let's return the fallback so the user always gets SOMETHING.
    return getFallbackReading(userName, cards);
  }
};
