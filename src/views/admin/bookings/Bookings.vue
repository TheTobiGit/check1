<template>
  <section class="w-[83vw] p-5 items-center flex flex-col gap-5">
    <h1 class="text-2xl capitalize self-center">{{ title }}</h1>
    <div class="flex flex-col">
      <p v-if="bookingData.bookingDatas.length === 0">
        {{ noBook }}
      </p>
      <div
        v-for="book in bookingData.bookingDatas"
        v-else
        :key="book"
        @click="openModal(book)"
        class="w-[70vw] cursor-pointer"
      >
        <div class="border w-full h-[7vh] flex rounded-sm">
          <div class="w-1/4 flex items-center pl-2">
            <p>{{ book.userName }}</p>
          </div>
          <div class="w-1/4 flex items-center">
            <p>{{ book.destination }}</p>
          </div>
          <div class="w-2/4 flex items-center">
            <p class="truncate">{{ book.purpose }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedBook" class="modal">
      <div class="modal-content flex flex-col gap-3 h-max w-[70vw]">
        <button
          @click="closeModal"
          class="close-button text-red-500 self-start"
        >
          Close
        </button>
        <h2>{{ selectedBook.userName }}</h2>
        <p>
          <span class="font-bold">Vehicle Name:</span>
          {{ selectedBook.vehicleID }}
        </p>
        <p>
          <span class="font-bold">Phone Number:</span>
          {{ selectedBook.phoneNumber }}
        </p>
        <p>
          <span class="font-bold">Destination:</span>
          {{ selectedBook.destination }}
        </p>
        <p>
          <span class="font-bold">Purpose:</span> {{ selectedBook.purpose }}
        </p>

        <p>
          <span class="font-bold">Date From:</span> {{ selectedBook.dateFrom }}
        </p>
        <p><span class="font-bold">Date To:</span> {{ selectedBook.dateTo }}</p>
        <p>
          <span class="font-bold">Time From:</span> {{ selectedBook.timeFrom }}
        </p>
        <p><span class="font-bold">Time To:</span> {{ selectedBook.timeTo }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { useBookingData } from "../../../stores/admin/BookingData";
import { ref, onBeforeMount } from "vue";
import { auth, db } from "../../../stores/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import router from "../../../routes";
import vehicleData from "../../../data/Vehicles.json";

export default {
  setup() {
    const bookingData = useBookingData();
    const button = "edit";
    const isLoading = ref(false);
    const noBook = "No bookings has been made yet";
    const title = "bookings";
    const selectedBook = ref(null);

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

      bookingData.bookingDatas.splice(0);
      const querySnapshot = await getDocs(collection(db, "booking"));
      querySnapshot.forEach((doc) => {
        if (doc.data().data) {
          bookingData.bookingDatas.push(...doc.data().data);
        }
      });
    });

    const openModal = (book) => {
      selectedBook.value = book;
    };

    const closeModal = () => {
      selectedBook.value = null;
    };

    return {
      bookingData,
      button,
      isLoading,
      noBook,
      title,
      selectedBook,
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
