# 💬 Demo Chatbot Ecommerce - Simulación en Next.js

Este repositorio contiene una versión demo de un chatbot desarrollada con **Next.js**, simulando una interacción típica entre un cliente y un sistema automatizado de ecommerce. Este proyecto tiene fines demostrativos y puede servir como base para integraciones más avanzadas con agentes reales o asistentes de IA.

Se encuentra deployado en Vercel [chatbot_demo]()

---

## 🚀 Tecnologías Utilizadas

- [Next.js](https://nextjs.org/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [Framer Motion](https://www.framer.com/motion/)
- [Heroicons React](https://github.com/tailwindlabs/heroicons)
- [AI SDK (Vercel)](https://sdk.vercel.ai/docs)
- [OpenAI API](https://platform.openai.com/)

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu entorno:

- Node.js >= 18.x
- npm >= 9.x

---

## 🧪 Instalación y Ejecución Local

Sigue estos pasos para clonar y ejecutar el proyecto localmente:

### 1. Clona el repositorio

```bash
git clone https://github.com/Halsey26/chat_demo_ecommerce.git
cd chat_demo_ecommerce
```

### 1. Instala las dependencias necesarias
Si creas un proyecto next.js desde cero.
- En la terminal de tu proyecto:

```bash
npm install react-markdown framer-motion @heroicons/react ai @ai-sdk/openai
```

Si clonas este repositorio:
- También puedes usar ```npm install``` directamente si el archivo package.json ya tiene estas dependencias listadas.

### 3. Crea el archivo .env.local
En la raíz del proyecto, crea un archivo llamado ```.env.local``` y coloca dentro tu clave de API de OpenAI:

```
OPENAI_API_KEY=sk-...
```
⚠️ Nunca compartas públicamente tu clave de API.

 ### 4. Ejecuta el proyecto

```
npm run dev
```
Esto iniciará el servidor en modo desarrollo. Abre tu navegador en: http://localhost:3000/chat


---

## 📁 Estructura General del Proyecto
``` c#
├── app/
│   └── chat/
│       └── page.tsx       # Página principal del chatbot
├── public/                # Recursos estáticos (imágenes, logos, etc.)
├── .env.local             # Clave de OpenAI (no se sube al repositorio)
├── package.json           # Dependencias del proyecto
└── README.md              # Documentación del proyecto
```

--- 

## Notas Adicionales
- Si deseas conocer más sobre la instalación o crear un proyectos de Next.js desde cero [set_up_nextjs]()
- Actualmente se simula la lógica conversacional con conexión a la API de OpenAI. Se puede adaptar para conectar con un backend propio.