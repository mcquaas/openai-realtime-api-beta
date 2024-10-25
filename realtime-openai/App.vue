<template>
    <v-app>
      <v-container>
        <h1>Realtime OpenAI Client</h1>
        <v-btn @click="connectToAPI" color="primary">Conectar a la API</v-btn>
        <v-text-field v-model="userMessage" label="Escribe un mensaje"></v-text-field>
        <v-btn @click="sendMessage" color="success">Enviar Mensaje</v-btn>
  
        <v-divider></v-divider>
  
        <div v-for="(message, index) in conversation" :key="index">
          <p>{{ message.text }}</p>
        </div>
      </v-container>
    </v-app>
  </template>
  
  <script>
  import { RealtimeClient } from '@openai/realtime-api-beta';
  
  export default {
    data() {
      return {
        client: null,
        conversation: [],
        userMessage: '',
      };
    },
    methods: {
        async connectToAPI() {
  if (this.client && this.client.isConnected()) {
    console.warn('Ya estás conectado a la API.');
    return;  // Evitar múltiples conexiones
  }

  const apiKey = process.env.VUE_APP_OPENAI_API_KEY;

  // Configurar el cliente de la API en tiempo real
  this.client = new RealtimeClient({
    apiKey: apiKey,
    dangerouslyAllowAPIKeyInBrowser: true,
  });

  // Configurar la sesión
  this.client.updateSession({
    instructions: 'You are a great, upbeat friend.',
    turn_detection: { type: 'none' },
  });

  // Conectarse a la API en tiempo real
  await this.client.connect();
  console.log('Conectado a la API en tiempo real');
},
      async sendMessage() {
        if (this.userMessage.trim() === '') return;
  
        // Enviar mensaje del usuario
        await this.client.sendUserMessageContent([{ type: 'input_text', text: this.userMessage }]);
        this.userMessage = ''; // Limpiar el input después de enviar el mensaje
      }
    }
  };
  </script>
  
  <style>
  /* Agregar estilos opcionales aquí */
  </style>
  