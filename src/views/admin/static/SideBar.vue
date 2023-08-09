<template>
  <section
    class="w-[17vw] bg-[#2A5198] min-h-[90vh] text-white text-xl flex justify-center"
  >
    <ul class="flex flex-col gap-10 text-left mt-10">
      <li>
        <span @click="toggleSubMenu('Vehicles')" class="cursor-pointer">
          {{ navItems[0] }}
          <svg
            :class="{ 'rotate-90': isSubMenuOpen === 'Vehicles' }"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 inline-block ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </span>
        <ul v-if="isSubMenuOpen === 'Vehicles'" class="ml-4 mt-2">
          <li>
            <router-link :to="'../admin/vehicles/add'">Add New</router-link>
          </li>
          <li>
            <router-link :to="'../admin/vehicles/manage'">Manage</router-link>
          </li>
        </ul>
      </li>
      <router-link :to="'./bookings'">
        <li>{{ navItems[1] }}</li>
      </router-link>
      <router-link :to="'./messages'">
        <li>{{ navItems[2] }}</li>
      </router-link>
      <router-link :to="'./subscribers'">
        <li>{{ navItems[3] }}</li>
      </router-link>
      <li>
        <span @click="toggleSubMenu('Work Order')" class="cursor-pointer">
          {{ navItems[4] }}
          <svg
            :class="{ 'rotate-90': isSubMenuOpen === 'Work Order' }"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 inline-block ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </span>
        <ul v-if="isSubMenuOpen === 'Work Order'" class="ml-4 mt-2">
          <li>
            <router-link :to="'../admin/workorder/add'">Add New</router-link>
          </li>
          <li>
            <router-link :to="'../admin/workorder/manage'">Manage</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const navItems = [
      "Vehicles",
      "Bookings",
      "Messages",
      "Subscribers",
      "Work Order",
    ];

    const isSubMenuOpen = ref(null);

    function toggleSubMenu(item) {
      if (isSubMenuOpen.value === item) {
        isSubMenuOpen.value = null;
      } else {
        isSubMenuOpen.value = item;
      }
    }

    return {
      navItems,
      isSubMenuOpen,
      toggleSubMenu,
    };
  },
};
</script>

<style>
.rotate-90 {
  transform: rotate(90deg);
}
</style>
