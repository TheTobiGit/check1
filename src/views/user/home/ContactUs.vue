<template>
  <section id="contactus" class="flex flex-col items-center mb-20">
    <h2 class="text-center mb-10 capitalize">{{ title }}</h2>
    <div class="bg-brand3 p-6 rounded-md w-[90vw] md:w-[50vw]">
      <form @submit.prevent="handleClick">
        <div class="mb-4">
          <label for="name" class="block mb-2 text-white capitalize">{{
            labels[0]
          }}</label>
          <input
            v-model="messageData.userName"
            required
            type="text"
            id="name"
            placeholder="Enter your full name..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block mb-2 text-white capitalize">{{
            labels[1]
          }}</label>
          <input
            v-model="messageData.userEmail"
            required
            type="email"
            id="email"
            placeholder="Enter your email..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="message" class="block mb-2 text-white capitalize">{{
            labels[2]
          }}</label>
          <textarea
            v-model="messageData.userMessage"
            required
            id="message"
            placeholder="Message..."
            class="w-full h-[30vh] px-3 py-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <button
          type="submit"
          class="bg-brand1 hover:bg-blue-600 text-white rounded-md p-2 max-w-[28vw] md:w-[9vw] ml-[80%] hover:opacity-90"
        >
          Submit
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import { useMessageData } from "../../../stores/MessageData";
import { db } from "../../../stores/config";
import { collection, addDoc } from "firebase/firestore";

export default {
  setup() {
    const title = ref("contact us");
    const labels = ref(["name", "email", "message"]);
    const messageData = useMessageData();

    const handleClick = async () => {
      const { userName, userEmail, userMessage } = messageData;
      console.log(userName, userEmail, userMessage);
      const docRef = await addDoc(collection(db, "messages"), {
        userName: userName,
        userEmail: userEmail,
        userMessage: userMessage,
      })
        .then(() => {
          window.alert("Message submitted successfully");
          window.location.reload();
          return;
        })
        .catch(() => {
          window.alert("Could not send message");
          window.location.reload();
          return;
        });
      return;
    };

    return {
      title,
      labels,
      messageData,
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
