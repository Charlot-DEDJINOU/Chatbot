<script>
import IconMicro from './icons/IconMicro.vue'
import IconPaper from './icons/IconPaper.vue'
import IconSmile from './icons/IconSmile.vue'
import IconSend from './icons/IconSend.vue'
import Message from './Message.vue'
import { ref } from 'vue'
import data from 'emoji-mart-vue-fast/data/facebook.json'
import 'emoji-mart-vue-fast/css/emoji-mart.css'
import { Picker, EmojiIndex, Emoji } from 'emoji-mart-vue-fast/src'

export default {
  components: {
    IconMicro,
    IconSend,
    IconPaper,
    IconSmile,
    Message,
    Picker,
    Emoji
  },
  setup() {
    const emojiIndex = new EmojiIndex(data)
    const lastHeight = ref(0)
    const showSticker = ref(false)
    const showMicroClient2 = ref(true)
    const newMessageClient2 = ref('')
    const messagesClient2 = ref([])

    const showEmoji = (emoji) => {
      newMessageClient2.value += emoji.native

      setMicro()
    }

    const handleAdjustHeight = () => {
      const textarea = document.getElementsByTagName('textarea')[0]
      if (lastHeight.value >= textarea.scrollHeight || textarea.scrollHeight < 150) {
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
        lastHeight.value = textarea.scrollHeight
      }

      setMicro()
    }

    const setMicro = () => {
      if (newMessageClient2.value.trim() !== '') showMicroClient2.value = false
      else showMicroClient2.value = true
    }

    const ws = new WebSocket('ws://localhost:3001')

    ws.onopen = () => {
      console.log('Client 2 connecté')
    }

    ws.onmessage = (message) => {
      messagesClient2.value.push(JSON.parse(message.data))

      setTimeout(scrollBody, 1000)
    }

    const sendMessage = () => {
      if (newMessageClient2.value.trim() !== '') {
        const data = {
          recepteur: 'Espoir Destiny',
          destinateur: 'Charlot Joël',
          message: newMessageClient2.value
        }
        messagesClient2.value.push(data)
        ws.send(JSON.stringify(data))
        newMessageClient2.value = ''
        setMicro()

        setTimeout(scrollBody, 1000)
      }
    }

    const scrollBody = () => {
      var element = document.getElementsByClassName('client2')[0]
      element.scrollTop = element.scrollHeight
    }

    return {
      emojiIndex,
      showEmoji,
      handleAdjustHeight,
      showSticker,
      showMicroClient2,
      newMessageClient2,
      sendMessage,
      messagesClient2
    }
  }
}
</script>

<template>
  <div class="container_chartboot">
    <div class="header">
      <img src="../assets/home6.jpg" />
      <div>
        <p>Charlot Joël</p>
        <i>En ligne</i>
      </div>
    </div>
    <div class="body client2">
      <Message
        v-for="(message, index) in messagesClient2"
        :key="index"
        :name="message.destinateur"
        :message="message.message"
      />
    </div>
    <div class="footer">
      <div class="messages">
        <div class="message">
          <span class="smile"><IconSmile @click="() => (showSticker = !showSticker)" /></span>
          <textarea v-model="newMessageClient2" @input="handleAdjustHeight"></textarea>
          <span class="file"><IconPaper /></span>
        </div>
        <span class="micro"
          ><IconMicro v-if="showMicroClient2" /><IconSend
            v-if="!showMicroClient2"
            @click="sendMessage"
        /></span>
      </div>
      <Picker
        :data="emojiIndex"
        set="apple"
        :show-search="false"
        :show-preview="false"
        :skin="1"
        :perLine="9"
        @select="showEmoji"
        title="Espoir"
        color="green"
        class="emoticones"
        v-if="showSticker"
      />
    </div>
  </div>
</template>

<style scoped>
.emoticones {
  display: flex;
  flex-wrap: wrap;
  height: 150px;
  width: 250px;
}
::-webkit-scrollbar {
  width: 3px;
}
.container_chartboot {
  width: 355px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Marck Script';
  font-style: normal;
  font-weight: 800;
  box-shadow: 0px 0px 2px 3px rgba(0, 0, 0, 0.3);
  margin: 50px;
}
.container_chartboot .header {
  width: 100%;
  height: 17%;
  background-color: #16c953;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.container_chartboot .header img {
  width: 75px;
  height: 75px;
  border-radius: 50%;
}
.container_chartboot .header div {
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: white;
}
.container_chartboot .header div p {
  font-size: 25px;
}
.container_chartboot .body {
  width: 100%;
  height: 430px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.container_chartboot .footer {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}
.container_chartboot .footer .messages {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  margin-bottom: 3px;
}
.container_chartboot .footer .messages span {
  display: inline-block;
}
.container_chartboot .footer .messages .smile :hover {
  cursor: pointer;
}
.container_chartboot .footer .messages .micro {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #16c953;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0px;
}
.container_chartboot .footer .messages .message {
  width: 85%;
  min-height: 95%;
  height: auto;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: flex-end;
  padding: 0px 10px;
}
.container_chartboot .footer .messages .message textarea {
  width: 80%;
  min-height: 100%;
  margin: 0px 3px;
  height: auto;
  resize: none;
  background: none;
  outline: none;
  border: none;
  font-family: 'Marck Script';
  font-style: normal;
}
.container_chartboot .footer span {
  color: rgba(0, 0, 0, 0.25);
  height: 100%;
  width: 25px;
  height: 25px;
}
.container_chartboot .footer .messages .message span {
  margin-bottom: 15px;
}
.container_chartboot .footer .file {
  transform: rotate(30deg);
}
</style>
