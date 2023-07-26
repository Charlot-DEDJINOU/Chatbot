import { ref } from 'vue';

const WebSocketService = {
  messages: ref([]),

  connect() {
    const ws = new WebSocket('ws://localhost:3001');

    ws.onopen = () => {
      console.log('Connexion établie');
    };

    ws.onmessage = (event) => {
      const message = event.data;
      console.log('Message reçu :', message);
      this.messages.value.push(message);
    };

    ws.onclose = () => {
      console.log('Connexion WebSocket fermée');
    };
  },

  sendMessage(message) {
    ws.send(message);
  },
};

export default WebSocketService;
