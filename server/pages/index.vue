<template>
  <div>
    Channel: <input class="inputMessage" type="text" v-model="channel" @keyup.enter="setChannel" placeholder="Set Channel..." />
    <div class="chatArea">
      <ul class="messages" ref="messages">
        <li class="message" v-for="(message, index) in messages" :key="index">
          <i :title="message.date">{{ message.date.split("T")[1].slice(0, -2) }}</i>: {{ message.text }}
        </li>
      </ul>
    </div>
    Message: <input class="inputMessage" type="text" v-model="message" @keyup.enter="sendMessage" placeholder="Type here..." />
  </div>
</template>

<script>
import socket from "~/plugins/socket.io.js";
// import axios from "~/plugins/axios";

export default {
  data() {
    return {
      channel: undefined
    }
  },
  async asyncData(context, callback) {
    // let { data } = await axios.get("/api/users");
    socket.emit("last-messages", function (messages) {
      callback(null, {
        // users: data,
        messages,
        message: ""
      });
    });
  },
  watch: {
    messages: "scrollToBottom"
  },
  beforeMount() {
    socket.on("new-message", (message) => {
      this.messages.push(message);
    });
  },
  mounted() {
    this.scrollToBottom();
  },
  methods: {
    setChannel() {
      if (!this.channel.trim()) return;
      let channel = {
        date: new Date().toJSON(),
        text: this.channel.trim()
      };
      socket.emit("set-channel", channel);
    },
    sendMessage() {
      if (!this.message.trim()) return;
      let message = {
        date: new Date().toJSON(),
        text: this.message.trim()
      };
      this.messages.push(message);
      this.message = "";
      socket.emit("send-message", message);
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
      });
    }
  },
  head: {
    title: "Nuxt.js with Socket.io"
  }
};
</script>

<style>
</style>
