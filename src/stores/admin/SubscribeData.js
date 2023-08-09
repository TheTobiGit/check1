import { PiniaVuePlugin, defineStore } from "pinia";

export const useSubscribeData = defineStore("subscribeData", {
  state: () => ({
    subscribeDatas: [],
  }),
});