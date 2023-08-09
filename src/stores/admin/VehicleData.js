import { PiniaVuePlugin, defineStore } from "pinia";

export const useVehicleData = defineStore("vehicleData", {
  state: () => ({
    vehicleDatas: [],
  }),
});