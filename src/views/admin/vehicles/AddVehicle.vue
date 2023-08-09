<template>
  <section class="">
    <div class="grid place-items-center mt-10">
      <form action="" class="flex flex-col gap-10">
        <div
          class="border border-black rounded-md shadow-md flex flex-col gap-10 p-10 w-max"
        >
          <div class="flex gap-20">
            <div class="flex flex-col gap-5">
              <label for="brand" name="brand" class="capitalize">{{
                labels[0]
              }}</label>
              <input
                type="text"
                class="max-w-[50vw] px-4 py-2 border border-black shadow-md rounded-md"
              />
            </div>
            <div class="flex flex-col gap-5">
              <label for="name" name="name" class="capitalize">{{
                labels[1]
              }}</label>
              <input
                type="text"
                class="max-w-[50vw] px-4 py-2 border border-black shadow-md rounded-md"
              />
            </div>
          </div>
          <div class="flex gap-20">
            <div class="flex flex-col gap-5">
              <label for="capacity" name="capacity" class="capitalize">{{
                labels[2]
              }}</label>
              <input
                type="number"
                class="max-w-[50vw] px-4 py-2 border border-black shadow-md rounded-md"
              />
            </div>
            <div class="flex flex-col gap-5">
              <label for="reg.number" name="reg.number" class="capitalize">{{
                labels[3]
              }}</label>
              <input
                type="text"
                class="max-w-[50vw] px-4 py-2 border border-black shadow-md rounded-md"
              />
            </div>
          </div>
          <div class="flex flex-col gap-5">
            <label for="brand" name="brand" class="capitalize">{{
              labels[4]
            }}</label>
            <select
              v-model="choosevehicleType"
              class="max-w-[40vw] px-4 py-2 border border-black shadow-md rounded-md"
            >
              <option value="" disabled>{{ defaultOption }}</option>
              <option v-for="vehicleType in vehicleType" :key="vehicleType">
                {{ vehicleType }}
              </option>
            </select>
          </div>
          <div class="flex flex-col gap-5">
            <label for="image" name="image" class="capitalize">{{
              labels[5]
            }}</label>
            <input
              type="file"
              src=""
              alt=""
              accept=".png, .jpg, .jpeg"
              multiple
              class="w-fit"
              placeholder="upload image"
            />
          </div>
        </div>
        <div class="flex justify-end">
          <button
            class="w-[5vw] px-4 py-2 uppercase bg-[#2a5198] text-white self-center rounded-md"
          >
            {{ button }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { onBeforeMount } from "vue";
export default {
  setup() {
    onBeforeMount(async () => {
      if (
        auth.currentUser.email !== "puc200626@pentvars.edu.gh" &&
        auth.currentUser.email !== "eaninkorah@pentvars.edu.gh" &&
        auth.currentUser.email !== "puc200206@pentvars.edu.gh"
      )
        return router.push("/unknown");
    });
  },
  data() {
    return {
      labels: [
        "vehicle brand",
        "vehicle name",
        "capacity",
        "registration number",
        "vehicle type",
        "vehicle images",
      ],
      button: "add",
      vehicleType: ["bus", "truck", "van"],

      defaultOption: "Select Vehicle Type",
      choosevehicleType: "",
    };
  },
};
</script>

<style scoped>
/* input[type="file"] {
  appearance: initial;
  -moz-appearance: initial;
  -webkit-appearance: initial;
  box-sizing: border-box;

} */
</style>
