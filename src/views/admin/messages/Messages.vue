<template>
  <section class="w-[83vw] p-5 items-center flex flex-col gap-5">
    <h1 class="text-2xl capitalize self-center">{{ title }}</h1>
    <div class="flex flex-col">
      <p v-if="messageData.messageDatas.length === 0">
        {{ noMessage }}
      </p>
      <div
        v-for="message in messageData.messageDatas"
        v-else
        :key="message"
        @click="openModal(message)"
        class="w-[70vw] cursor-pointer"
      >
        <div class="border w-full h-[7vh] flex rounded-sm">
          <div class="w-1/4 flex items-center pl-2">
            <p>{{ message.userName }}</p>
          </div>
          <div class="w-1/4 flex items-center">
            <p>{{ message.userEmail }}</p>
          </div>
          <div class="w-2/4 flex items-center">
            <p class="truncate">{{ message.userMessage }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedMessage" class="modal">
      <div class="modal-content flex flex-col gap-3 h-max w-[70vw]">
        <button
          @click="closeModal"
          class="close-button text-red-500 self-start"
        >
          Close
        </button>
        <h2>{{ selectedMessage.userName }}</h2>
        <p>
          <span class="font-bold">Email:</span>
          {{ selectedMessage.userEmail }}
        </p>
        <p>
          <span class="font-bold">Message:</span>
          {{ selectedMessage.userMessage }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { useMessageData } from "../../../stores/admin/MessageData";
import { auth, db } from "../../../stores/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import router from "../../../routes";
import { onBeforeMount, ref } from "vue";

export default {
  setup() {
    const messageData = useMessageData();
    const noMessage = "No Messages has been sent yet";
    const title = "messages";
    const selectedMessage = ref(null);

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

      messageData.messageDatas.splice(0);
      const querySnapshot = await getDocs(collection(db, "messages"));
      querySnapshot.forEach((doc) => {
        if (doc.data()) {
          messageData.messageDatas.push(doc.data());
        }
      });
    });

    const openModal = (book) => {
      selectedMessage.value = book;
    };

    const closeModal = () => {
      selectedMessage.value = null;
    };

    return {
      messageData,
      noMessage,
      title,
      selectedMessage,
      openModal,
      closeModal,
    };
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.close-button {
  margin-bottom: 10px;
}
</style>
