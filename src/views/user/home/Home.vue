<script setup>
import Hero from "./Hero.vue";
import Vehicles from "./Vehicles.vue";
import ContactUs from "./ContactUs.vue";
import FAQs from "./FAQs.vue";
import Newsletter from "./Newsletter.vue";
import { onMounted } from "vue";

onMounted(() => {
  scrollToTop();
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
  });
}
</script>

<template>
  <Hero />
  <Vehicles />
  <ContactUs />
  <FAQs />
  <Newsletter />
</template>

<script></script>
