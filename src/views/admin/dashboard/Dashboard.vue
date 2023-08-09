<template>
  <section
    class="h-[90vh] grid grid-cols-3 place-items-center text-2xl absolute w-screen left-0 bg-white z-50"
  >
    <div class="grid place-items-center">
      <router-link :to="'./vehicles/add'">
        <div
          class="uppercase text-white bg-[#2A5198] w-[20vw] h-[20vh] rounded shadow-md grid place-items-center cursor-pointer"
        >
          <span class="material-icons-outlined text-6xl"> bus_alert </span>
          <p
            class="text-base font-bold flex w-full justify-end items-center gap-1"
          >
            {{ cardTypes[0] }}
            <span class="material-icons-outlined mr-3">
              keyboard_arrow_right
            </span>
          </p>
        </div>
      </router-link>
    </div>
    <router-link :to="'./bookings'">
      <div class="grid place-items-center">
        <div
          class="uppercase text-white bg-[#FDB515] w-[20vw] h-[20vh] rounded shadow-md grid place-items-center cursor-pointer"
        >
          <span class="material-icons-outlined text-6xl"> bookmarks </span>
          <p
            class="text-base font-bold flex w-full justify-end items-center gap-1"
          >
            {{ cardTypes[1] }}
            <span class="material-icons-outlined mr-3">
              keyboard_arrow_right
            </span>
          </p>
        </div>
      </div>
    </router-link>
    <router-link :to="'./messages'">
      <div class="grid place-items-center">
        <div
          class="uppercase text-white bg-[#2A5198] w-[20vw] h-[20vh] rounded shadow-md grid place-items-center cursor-pointer"
        >
          <span class="material-icons-outlined text-6xl">
            mark_email_unread
          </span>
          <p
            class="text-base font-bold flex w-full justify-end items-center gap-1"
          >
            {{ cardTypes[2] }}
            <span class="material-icons-outlined mr-3">
              keyboard_arrow_right
            </span>
          </p>
        </div>
      </div>
    </router-link>
    <router-link :to="'./subscribers'">
      <div class="grid place-items-center">
        <div
          class="uppercase text-white bg-[#2A5198] w-[20vw] h-[20vh] rounded shadow-md grid place-items-center cursor-pointer"
        >
          <span class="material-icons-outlined text-6xl">
            workspace_premium
          </span>
          <p
            class="text-base font-bold flex w-full justify-end items-center gap-1"
          >
            {{ cardTypes[3] }}
            <span class="material-icons-outlined mr-3">
              keyboard_arrow_right
            </span>
          </p>
        </div>
      </div>
    </router-link>
    <router-link :to="'./workorder/manage'">
      <div class="grid place-items-center">
        <div
          class="uppercase text-white bg-[#FDB515] w-[20vw] h-[20vh] rounded shadow-md grid place-items-center cursor-pointer"
        >
          <span class="material-icons-outlined text-6xl"> engineering </span>
          <p
            class="text-base font-bold flex w-full justify-end items-center gap-1"
          >
            {{ cardTypes[4] }}
            <span class="material-icons-outlined mr-3">
              keyboard_arrow_right
            </span>
          </p>
        </div>
      </div>
    </router-link>
  </section>
</template>

<script>
import { auth } from "../../../stores/config";
import { onAuthStateChanged } from "firebase/auth";
import router from "../../../routes";
import { onBeforeMount } from "vue";
export default {
  setup() {
    const cardTypes = [
      "vehicles",
      "bookings",
      "messages",
      "subscribers",
      "work order",
    ];

    onAuthStateChanged(auth, () => {
      if (!auth.currentUser) return router.push("/login");
    });

    onBeforeMount(async () => {
      if (
        auth.currentUser.email !== "puc200626@pentvars.edu.gh" &&
        auth.currentUser.email !== "eaninkorah@pentvars.edu.gh" &&
        auth.currentUser.email !== "puc200206@pentvars.edu.gh"
      )
        return router.push("/unknown");
    });

    return {
      cardTypes,
    };
  },
};
</script>
