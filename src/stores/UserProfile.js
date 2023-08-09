import { PiniaVuePlugin, defineStore } from "pinia";

export const useUserProfile = defineStore("userProfile", {
  state: () => ({
    userName: "Gideon Sarfo",
    userNumber: "0551641245",
    userDepartment: "Department of Information Technology",
    userID: "PUC/200206",
    userEmail: "sPnL4@example.com",
  }),
  actions: {
    setDepartment(department) {
      this.userDepartment = department;
    },
    setNumber(number) {
      this.userNumber = number;
    },
  },
});
