import { reactive, computed } from "vue";

export const useMessages = () => {
  const messages = reactive<string[]>([]);

  const reversedMessages = computed(() => {
    return messages.slice().reverse();
  });

  const pushMessage = (msg: string) => {
    messages.push(msg);
  };

  return {
    reversedMessages,
    pushMessage,
  };
};
