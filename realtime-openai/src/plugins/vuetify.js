import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Asegúrate de que los estilos están importados
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

export default vuetify;
