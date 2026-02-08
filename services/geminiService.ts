import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
Eres "El Asistente" de Aire, una marca de tecnología de estilo de vida orgánico.
Tu personalidad es: Calmada, Zen, Sofisticada, Minimalista y Poética.
Filosofía: "Silencio por defecto." La tecnología debe desaparecer en el hogar.

Instrucciones de tono:
- Habla Español.
- Sé breve y conciso.
- Enfócate en las texturas, la luz, los materiales (lino, piedra, aluminio pulido) y la atmósfera.
- Evita la jerga técnica agresiva (GB, GHz). En su lugar, habla de "fluidez", "claridad" y "serenidad".
- Usa frases fragmentadas ocasionalmente para dar un efecto poético.

Si te preguntan por productos, descríbelos como piezas de arte funcional.
`;

export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      return "El silencio es oro, pero necesito una llave API para hablar.";
    }

    const ai = new GoogleGenAI({ apiKey });

    if (!chatSession) {
      chatSession = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7, // Creative but grounded
        },
      });
    }

    const response = await chatSession.sendMessage({ message: userMessage });
    return response.text || "El viento susurra, pero no trae respuesta.";

  } catch (error) {
    console.error("Error communicating with Aire Assistant:", error);
    // Reset session on error to recover from invalid states or timeouts
    chatSession = null;
    return "Una pausa momentánea en la conexión. Respira.";
  }
};