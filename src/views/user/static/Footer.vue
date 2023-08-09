<template>
  <section class="bg-brand1 h-[15vh] p-5 flex flex-col justify-center">
    <p class="text-white text-sm md:text-base">{{ rights }}</p>
    <p class="capitalize text-white text-sm md:text-base">
      Designed and Developed by: {{ devs[0] }}, {{ devs[1] }}, {{ devs[2] }} &
      {{ devs[3] }}
    </p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      rights: "© 2023 Pentecost University. All Rights Reserved",
      devs: [
        "alexander gyekye (Alumni-2023)",
        "zerebel tanu (Alumni-2024)",
        "gideon sarfo (Alumni-2024)",
        "joshua oduro (Alumni-2023)",
      ],
    };
  },
};
</script>

<style scoped></style>
