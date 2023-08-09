<template>
  <section class="w-[83vw] p-5"><RouterView /></section>
</template>

<script>
import { onBeforeMount } from "vue";
import { auth } from "../../../stores/config";
import { onAuthStateChanged } from "firebase/auth";
import router from "../../../routes";

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
