<script setup>
import Header from "./static/Header.vue";
import SideBar from "./static/SideBar.vue";
</script>

<template>
  <section class="h-screen w-screen bg-white absolute top-0 z-50">
    <div class="fixed bg-white top-0 z-[70] w-screen"><Header /></div>
    <div class="flex mt-[10vh]">
      <div class="fixed left-0"><SideBar /></div>
      <div class="ml-[17vw]"><RouterView /></div>
    </div>
  </section>
</template>

<script>
import { onBeforeMount } from "vue";
import { auth } from "../../stores/config";
import { onAuthStateChanged } from "firebase/auth";
import router from "../../routes";

export default {
  setup() {
    onAuthStateChanged(auth, (async) => {
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

    return;
  },
};
</script>
