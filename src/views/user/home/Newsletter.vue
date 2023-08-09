<template>
  <section
    class="bg-brand2 min-h-[40vh] md:min-h-[50vh] py-10 flex flex-col items-center justify-center gap-7"
  >
    <h3 class="font-bold text-center capitalize">{{ title }}</h3>
    <p class="text-center">{{ info }}</p>
    <form class="flex items-center" @submit.prevent="handleClick">
      <input
        type="email"
        v-model="subscriberData.userEmail"
        name=""
        id=""
        placeholder="Enter your email...."
        class="p-4 rounded-md min-w-[50vw]"
      />
      <button
        class="capitalize bg-[#2A5198] text-white rounded-md relative right-9 p-3.5 min-w-[10vw] text-2xl"
        type="submit"
      >
        {{ button }}
      </button>
    </form>
  </section>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import { useSubscriberData } from "../../../stores/SubscriberData";
import { db } from "../../../stores/config";
import { collection, addDoc } from "firebase/firestore";

export default {
  setup() {
    const title = ref("newsletter signUp");
    const info = ref("signup to our newsletter and receive updates");
    const button = ref("subscribe");
    const subscriberData = useSubscriberData();

    const handleClick = async () => {
      const { userEmail } = subscriberData;

      const docRef = await addDoc(collection(db, "newsletter"), {
        userEmail: userEmail,
      })
        .then(() => {
          window.alert("Successfully subscribed to the newsletter");
          window.location.reload();
          return;
        })
        .catch(() => {
          window.alert("Unable to submit your request");
          window.location.reload();
          return;
        });
      return;
    };

    return {
      title,
      info,
      button,
      subscriberData,
      handleClick,
    };
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
