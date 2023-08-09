<script setup>
import Header from "./views/user/static/Header.vue";
import Footer from "./views/user/static/Footer.vue";
import Loader from "./views/user/static/Loader.vue";
</script>

<template>
  <div v-if="isLoading" class="h-screen w-screen grid place-items-center">
    <Loader />
  </div>
  <div v-else>
    <div class="fixed top-[0] w-full z-[30] bg-white">
      <Header />
    </div>
    <RouterView />
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    // Simulating component loading delay
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
};
</script>
