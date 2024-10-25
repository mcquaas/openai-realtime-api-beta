<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title>OpenAI API en tiempo real</v-card-title>
        <v-card-text>
          <v-text-field v-model="message" label="Escribe un mensaje" outlined />
          <v-btn @click="sendMessage" color="primary" class="mt-2">
            Enviar
          </v-btn>
          <div v-for="(response, index) in responses" :key="index" class="mt-3">
            <v-chip color="green" text-color="white">{{ response }}</v-chip>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import client from './plugins/openai'; // Importar el cliente de OpenAI

export default {
  data() {
    return {
      message: '', // Mensaje que el usuario ingresa
      responses: [], // Respuestas recibidas desde OpenAI
    };
  },
  methods: {
    async sendMessage() {
      if (this.message.trim() === '') return;

      try {
        await client.connect(); // Conectar a la API de OpenAI
        client.sendUserMessageContent([{ type: 'input_text', text: this.message }]); // Enviar el mensaje

        // Escuchar la actualización de la conversación
        client.on('conversation.updated', (event) => {
          const { item } = event;
          if (item.type === 'message') {
            this.responses.push(item.text); // Agregar la respuesta al array
          }
        });

        this.message = ''; // Limpiar el campo después de enviar el mensaje
      } catch (error) {
        console.error('Error al conectar con OpenAI:', error);
      }
    },
  },
};
</script>

<style scoped>
.mt-2 {
  margin-top: 16px;
}
.mt-3 {
  margin-top: 24px;
}
</style>
