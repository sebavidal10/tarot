const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

export const getTarotReading = async (userName, cards) => {
  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: `Eres un experto lector de tarot místico...`, // tu prompt aquí
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Error en la API');
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
