import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify'; // Asegúrate de tener este archivo

const app = createApp(App);

app.use(vuetify); // Aplica Vuetify a tu aplicación
app.mount('#app');
