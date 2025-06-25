// Archivo: src/app/chat/route.ts
import { openai } from "@ai-sdk/openai";
import {  
  streamText, 
  createDataStreamResponse, 
  Message 
} from "ai";

// Opcional: límite de streaming en segundos
export const maxDuration = 30;

// Funcion del chatbot
export async function POST(req: Request) {
  // Recibimos solo los mensajes de la petición
  const { messages , id_usuario , id_conversacion}: {
     messages: Message[]; id_usuario:string; id_conversacion:string
    } = await req.json();

  // Extraemos el ultimo mensaje del usuario
  const userMessage = [...messages].reverse().find( (msg) => msg.role == 'user' )?.content || "";

  //cadena vacia al inicio del bot
  let finalBotMessage = "";

  return createDataStreamResponse({
    execute: async (dataStream) => {
      // Llamamos directamente al modelo y dejamos que gestione el streaming
      const result = streamText({
        model: openai("gpt-4o-mini"),
        messages,
        system: `
        Instrucciones para el asistente:
Eres un asistente virtual de un ecommerce. Tu tarea es ayudar a los usuarios a encontrar productos, brindar información específica sobre ellos y asistir con el estado de sus pedidos. Responde siempre de manera amigable y clara.

Cuando un usuario mencione una categoría o tipo de producto (como “cámaras”, “zapatillas”, “audífonos”), sugiere que estás buscando en el catálogo y responde como si tuvieras acceso a esa información.

Cuando un usuario pregunte por un producto específico (como marca o modelo), responde como si estuvieras consultando el sistema para obtener detalles clave (precio, disponibilidad, características).

Cuando te pidan el estado de una orden, solicita el número de pedido (si no lo han dado) y responde como si estuvieras consultando el sistema de tracking.

**No utilices formato markdown, tablas, imágenes ni listas.**

Tu objetivo es simular cómo sería la respuesta del chatbot real, permitiendo la recolección de datos de interacciones para análisis posterior.

Ejemplos de interacciones:
- “Estoy buscando zapatillas deportivas.”
→ “¡Genial! Estoy buscando las opciones que tenemos en zapatillas deportivas. Un momento...”

- “¿Tienen cámaras Canon?”
→ “¡Claro! Déjame revisar nuestras cámaras Canon disponibles para mostrarte los detalles.”

- “Mi pedido 82394 no ha llegado.”
→ “Lo lamento. Estoy revisando el estado del pedido 82394 para darte más información. Un momento...”

- “Quiero ver más detalles del iPhone 13.”
→ “¡Buena elección! Te daré los detalles del iPhone 13 en cuanto termine de consultarlos.”

Siempre empieza tu mensaje de bienvenida:
        - "¡Hola! Soy tu asistente virtual. Puedo ayudarte a:
          1️⃣ Encontrar productos
          2️⃣ Consultar el estado de tus pedidos
          3️⃣ Brindar información específica sobre productos.

        `,
        // onToken: (token) => {
        //   console.log("token recibido:", token);
        //   finalBotMessage += token;
        // },
      });

      // Fusionamos la respuesta en el stream
      result.mergeIntoDataStream(dataStream);

      //variables de ID
      // const idUsuario = crypto.randomUUID();
      // const idConversacion= crypto.randomUUID();

      // esperamos a que se genere la respuesta del bot
      const finalBotMessage = await result.text;

      //  Al terminar el stream, 
      // usuario
      await fetch("http://localhost:8000/logs", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id_conversacion: id_conversacion,
          id_usuario:id_usuario,
          rol:'user',
          mensaje:userMessage,
          fecha: new Date().toISOString(),
        }),
      });
      
      // bot
      await fetch("http://localhost:8000/logs", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id_conversacion: id_conversacion,
          id_usuario:'bot',
          rol:'bot',
          mensaje:finalBotMessage,
          fecha: new Date().toISOString(),
        }),
      });
      console.log('Enviado a FastApi')
      // console.log("User final:", userMessage);
      // console.log("Bot final:", finalBotMessage);

    },
  });
}
