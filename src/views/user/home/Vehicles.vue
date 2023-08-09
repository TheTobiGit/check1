<template>
  <section id="vehicles">
    <h2 class="text-center mb-20 capitalize">{{ title }}</h2>
    <div class="mb-10 ml-5">
      <button
        v-for="vehicle in vehicles"
        :key="vehicle"
        :class="[
          'rounded-md',
          'hover:bg-brand1',
          'hover:text-white',
          'p-2',
          'mr-3',
          'capitalize',
          'min-w-[8vw]',
          'border',
          ' border-2',
          'border-brand1',
          { 'bg-brand1 text-white': selectedVehicle === vehicle },
        ]"
        @click="selectVehicle(vehicle)"
      >
        {{ vehicle }}
      </button>
    </div>
    <div class="card flex justify-around gap-10 flex-wrap mb-[15vh]">
      <div
        v-for="vehicle in selectedVehicles"
        :key="vehicle.id"
        class="border h-[53vh] min-w-[78vw] md:min-w-[50vw] lg:min-w-[28vw] shadow-md rounded-md flex flex-col items-center gap-3"
      >
        <img
          :src="vehicle.image[0]"
          :alt="vehicle.name"
          class="h-3/4 w-full rounded-sm"
        />
        <p class="name mr-auto ml-3">{{ vehicle.name }}</p>
        <button
          class="capitalize text-white bg-brand2 rounded-md p-2 ml-auto max-w-[28vw] md:max-w-[9vw] mr-3 hover:opacity-80"
          @click="bookNow(vehicle)"
        >
          {{ book }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue";
import { NewVehicleData } from "../../../stores/config";
import { useRouter } from "vue-router";
import { auth } from "../../../stores/config";

export default {
  setup() {
    const title = "vehicles";
    const vehicles = ["view all", "buses", "vans", "trucks"];
    const book = "book now";
    const selectedVehicle = ref("view all");
    const vehicle = ref([]);
    const vehicleData = ref();
    const router = useRouter();

    const selectedVehicles = computed(() => {
      if (
        selectedVehicle.value === "view all" ||
        selectedVehicle.value === ""
      ) {
        return vehicleData.value.buses.concat(
          vehicleData.value.vans,
          vehicleData.value.trucks
        );
      } else {
        return vehicleData.value[selectedVehicle.value];
      }
    });

    onBeforeMount(async () => {
      vehicleData.value = NewVehicleData();
      setTimeout(() => {
        selectVehicle("");
      }, 1000);
    });

    const selectVehicle = (vehicle) => {
      selectedVehicle.value = vehicle;
    };

    const bookNow = (vehicle) => {
      if (!auth.currentUser) return window.alert("Login to book now");
      router.push({ name: "Book", params: { vehicleId: vehicle.id } });
    };

    return {
      title,
      vehicles,
      book,
      selectedVehicle,
      vehicle,
      selectedVehicles,
      selectVehicle,
      bookNow,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 4rem;
}

h2 {
  font-size: 3rem;
}

h3 {
  font-size: 2rem;
}
</style>
