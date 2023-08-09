import { PiniaVuePlugin, defineStore } from "pinia";

export const useMessageData = defineStore("messageData", {
  state: () => ({
    messageDatas: [],
  }),
});