<script setup lang="ts">
import { ref } from "vue";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useMessages } from "../composable/useMessages";

defineProps<{ msg: string }>();

const { pushMessage, reversedMessages } = useMessages();

const connection = new HubConnectionBuilder().withUrl("/api").build();

connection.start().then(() => {
  connection.on("newMessage", (newMessage: string) => {
    pushMessage(newMessage);
  });
});

const txtMessage = ref("");

const onclick = async () => {
  await fetch("/api/sendMessage", {
    method: "POST",
    body: JSON.stringify({
      text: txtMessage.value,
    }),
  });
  txtMessage.value = "";
};
</script>

<template>
  <h1>{{ msg }}</h1>

  <div>
    <div>
      <input
        type="text"
        name="txtMessage"
        id="txtMessage"
        v-model="txtMessage"
      />
      <input type="button" value="send" @click="onclick" />
    </div>

    <div>
      <div v-for="(message, index) in reversedMessages" :key="index">
        {{ message }}
      </div>
    </div>
  </div>
</template>
