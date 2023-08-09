import { PiniaVuePlugin, defineStore } from "pinia";

export const useSubscriberData = defineStore("subscriberData", {
  state: () => ({
    userEmail: "",
  }),
});
