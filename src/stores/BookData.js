import { PiniaVuePlugin, defineStore } from "pinia";

export const useBookData = defineStore("bookData", {
  state: () => ({
    bookDatas: [],
  }),
});
