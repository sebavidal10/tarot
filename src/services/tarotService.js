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
 * Generates a tarot reading by calling our secure proxy API.
 * @param {string} userName - The name of the user requesting the reading.
 * @param {Array} cards - Array of card objects { name, name_es, inverted, ... }
 * @param {string} intention - Optional user intention or question.
 * @returns {Promise<string>} The interpretation text.
 */
export const getTarotReading = async (userName, cards, intention = '') => {
  try {
    const response = await fetch('/api/reading', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        cards,
        intention,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error en la conexión con el oráculo');
    }

    const data = await response.json();
    return data.reading;
  } catch (error) {
    console.error('Error fetching reading:', error);
    // Return fallback for resilience
    return getFallbackReading(userName, cards);
  }
};
