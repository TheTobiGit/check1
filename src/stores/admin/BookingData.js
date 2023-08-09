import { PiniaVuePlugin, defineStore } from "pinia";

export const useBookingData = defineStore("bookingData", {
  state: () => ({
    bookingDatas: [],
  }),
});