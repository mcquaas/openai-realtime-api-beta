import { RealtimeClient } from '@openai/realtime-api-beta';

const client = new RealtimeClient({
  apiKey: process.env.VUE_APP_OPENAI_API_KEY,
//   serverUrl: 'wss://api.openai.com/realtime',  // O el endpoint correcto
  serverUrl: 'ws://localhost:8081', // Ensure this points to your relay server
  dangerouslyAllowAPIKeyInBrowser: true, // Permitir la API Key en el navegador (solo para pruebas)
});

export default client;
