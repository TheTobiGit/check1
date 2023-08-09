<template>
  <section
    id="faqs"
    class="min-h-[50vh] bg-brand1 flex flex-col items-center p-7"
  >
    <h3 class="text-white font-bold text-center mb-10 capitalize">
      {{ title }}
    </h3>

    <div
      v-for="(question, index) in questions"
      :key="index"
      class="bg-white p-3 rounded-t-md w-[80vw] md:w-[50vw] mb-5"
    >
      <div @click="toggleQuestion(index)" class="cursor-pointer">
        <h4 class="font-semibold">{{ question.title }}</h4>
      </div>
      <p v-if="question.isExpanded" class="">{{ question.answer }}</p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: "frequently asked questions",
      questions: [
        {
          title: "How do I report an emergency?",
          answer: "Answer to Question 2",
          isExpanded: false,
        },
        {
          title: "How do I login?",
          answer: "Answer to Question 2",
          isExpanded: false,
        },
      ],
    };
  },
  methods: {
    toggleQuestion(index) {
      this.questions[index].isExpanded = !this.questions[index].isExpanded;
    },
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
