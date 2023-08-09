<template>
  <section>
    <div class="flex flex-col gap-5">
      <router-link :to="'../admin/vehicles/add'" class="self-end">
        <button
          class="capitalize font-bold py-2 px-4 text-white md:w-[9vw] rounded shadow-md bg-[#FDB515] h-fit w-fit"
        >
          {{ button }}
        </button>
      </router-link>
      <div class="flex gap-20 border-red-300 flex-wrap w-full justify-center">
        <div
          v-for="vehicle in vehicleData.vehicleDatas"
          :key="vehicle"
          class="h-[50vh] w-[20vw] border shadow-md"
        >
          <div class="h-[30vh] border">
            <img :src="vehicle.image[0]" alt="" class="h-full w-full border" />
          </div>
          <div class="h-[20vh] border gap-2 flex flex-col pl-2">
            <p>Car Name: {{ vehicle.name }}</p>
            <p class="capitalize">Car Type: {{ vehicle.carType }}</p>
            <p>Car Brand: {{ vehicle.brand }}</p>
            <p>Capacity: {{ vehicle.capacity }}</p>
            <p>Reg. Number: {{ vehicle.registrationNumber }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useVehicleData } from "../../../stores/admin/VehicleData";
import { onBeforeMount, onMounted, ref } from "vue";
import { auth, NewVehicleData } from "../../../stores/config";
import router from "../../../routes";

export default {
  setup() {
    const vehicleData = useVehicleData();
    const button = "add";
    const isLoading = ref(false);

    onBeforeMount(() => {
      if (
        auth.currentUser.email !== "puc200626@pentvars.edu.gh" &&
        auth.currentUser.email !== "eaninkorah@pentvars.edu.gh" &&
        auth.currentUser.email !== "puc200206@pentvars.edu.gh"
      )
        return router.push("/unknown");

      isLoading.value = true;
      vehicleData.vehicleDatas.splice(0);
      const vehicles = NewVehicleData();
      for (const carType in vehicles) {
        if (Object.hasOwnProperty.call(vehicles, carType)) {
          const element = vehicles[carType];
          for (const car of element) {
            car.carType = carType;
            vehicleData.vehicleDatas.push(car);
          }
        }
      }
      isLoading.value = false;
      return;
    });

    return {
      vehicleData,
      button,
      isLoading,
    };
  },
};
</script>
