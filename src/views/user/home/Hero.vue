<template>
  <section
    ref="hero"
    class="hero grid place-items-center min-h-[90vh] mb-20 overflow-hidden mt-[10vh]"
    :style="{ backgroundImage: `url(${images[currentImageIndex]})` }"
  >
    <p
      class="max-w-4xl text-[2rem] md:text-[4rem] text-center text-white font-bold"
    >
      {{ text }}
    </p>
  </section>
</template>

<script>
import { ref, onMounted, watch } from "vue";

export default {
  setup() {
    const text = ref("Welcome To The Pentecost University Transport Unit");

    const hero = ref(null);

    const images = ref([
      "src/assets/hero2.jpg",
      "src/assets/hero3.jpg",
      "src/assets/hero4.jpg",
      "src/assets/hero.jpg",
    ]);

    const currentImageIndex = ref(0);

    onMounted(() => {
      setInterval(() => {
        currentImageIndex.value =
          (currentImageIndex.value + 1) % images.value.length;

        setTimeout(() => {
          if (hero.value) {
            hero.value.style.backgroundImage = `url(${
              images.value[currentImageIndex.value]
            })`;
          }
        }, 100);
      }, 4000);
    });

    return {
      text,
      images,
      currentImageIndex,
      hero,
    };
  },
};
</script>

<style scoped>
.hero {
  background-image: url("../../../assets/hero.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transition: background-image 0.5s ease-in-out;
}
</style>
