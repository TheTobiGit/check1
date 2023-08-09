import { PiniaVuePlugin, defineStore } from "pinia";

export const useworkOrderData = defineStore("workorderData", {
  state: () => ({
    workorderDatas: [],
    vehicleName: "",
    regNum: "",
    date: "",
    workDetails: "",
    serviceProvider: "",
    category: [],
    preferredCompletionDate: "",
    urgency: "",
  }),
  actions: {
    addWorkorderData(formData) {
      this.workorderDatas.push(formData);
    },
  },
});
