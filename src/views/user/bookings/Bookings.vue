<template>
  <section class="mt-[10vh] p-5 min-h-[90vh]">
    <h3 class="text-3xl capitalize text-center my-[5vh]">{{ title }}</h3>
    <div class="flex flex-col gap-[3vh] items-center justify-center">
      <p
        v-if="bookData.bookDatas.length === 0"
        class="text-3xl absolute top-[50%]"
      >
        {{ noBook }}
      </p>
      <div
        v-for="books in bookData.bookDatas"
        v-else
        :key="books.id"
        class="shadow-md border-2 min-h-[20vh] w-[60vw]"
      >
        <div
          v-if="isLoading"
          class="w-full h-[20vh] flex justify-center items-center"
        >
          <div class="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div v-else class="flex gap-5">
          <div class="w-1/3 h-full border">
            <img :src="books.image" class="h-full w-full" alt="image" />
          </div>

          <div class="flex flex-col gap-3 w-2/3 justify-center">
            <p>Name: {{ books.name }}</p>
            <p>Destination: {{ books.destination }}</p>
            <p class="truncate">Purpose: {{ books.purpose }}</p>
            <p>Time From: {{ books.timeFrom }} - Time To: {{ books.timeTo }}</p>
            <p>Date From: {{ books.dateFrom }} - Date To: {{ books.dateTo }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useBookData } from "../../../stores/BookData";
import { onBeforeMount, ref, onMounted } from "vue";
import { auth, db, NewVehicleData } from "../../../stores/config";
import { doc, getDoc } from "firebase/firestore";
import router from "../../../routes";

export default {
  setup() {
    const title = "Booking History";
    const bookData = useBookData();
    const vehicles = NewVehicleData();
    const isLoading = ref(false);
    const noBook = "Oops.. 😥 You have not booked for a vehicle yet";

    onBeforeMount(async () => {
      if (!auth.currentUser) return router.push("/");
      isLoading.value = true;

      const bookingRef = doc(db, "booking", auth.currentUser.uid);

      const docSnap = await getDoc(bookingRef);
      if (docSnap.exists()) {
        const bookingArray = await docSnap.data()["data"];
        if (!bookingArray?.length > 0) return;
        for (const item of bookingArray) {
          for (const carType in vehicles) {
            const element = vehicles[carType];
            element.forEach((car) => {
              if (item["vehicleID"] === car.id) {
                item.image = car.image[0];
                item.name = car.name;
              }
            });
          }
        }

        bookData.bookDatas = bookingArray;
      }
      isLoading.value = false;
    });

    onMounted(() => {
      scrollToTop();
    });

    function scrollToTop() {
      window.scrollTo({
        top: 0,
      });
    }

    return {
      title,
      bookData,
      noBook,
      isLoading,
    };
  },
};
</script>

<style scoped>
.spinner {
  position: absolute;
  width: 9px;
  height: 9px;
}

.spinner div {
  position: absolute;
  width: 50%;
  height: 150%;
  background: #000000;
  transform: rotate(calc(var(--rotation) * 1deg))
    translate(0, calc(var(--translation) * 1%));
  animation: spinner-fzua35 1s calc(var(--delay) * 1s) infinite ease;
}

.spinner div:nth-child(1) {
  --delay: 0.1;
  --rotation: 36;
  --translation: 150;
}

.spinner div:nth-child(2) {
  --delay: 0.2;
  --rotation: 72;
  --translation: 150;
}

.spinner div:nth-child(3) {
  --delay: 0.3;
  --rotation: 108;
  --translation: 150;
}

.spinner div:nth-child(4) {
  --delay: 0.4;
  --rotation: 144;
  --translation: 150;
}

.spinner div:nth-child(5) {
  --delay: 0.5;
  --rotation: 180;
  --translation: 150;
}

.spinner div:nth-child(6) {
  --delay: 0.6;
  --rotation: 216;
  --translation: 150;
}

.spinner div:nth-child(7) {
  --delay: 0.7;
  --rotation: 252;
  --translation: 150;
}

.spinner div:nth-child(8) {
  --delay: 0.8;
  --rotation: 288;
  --translation: 150;
}

.spinner div:nth-child(9) {
  --delay: 0.9;
  --rotation: 324;
  --translation: 150;
}

.spinner div:nth-child(10) {
  --delay: 1;
  --rotation: 360;
  --translation: 150;
}

@keyframes spinner-fzua35 {
  0%,
  10%,
  20%,
  30%,
  50%,
  60%,
  70%,
  80%,
  90%,
  100% {
    transform: rotate(calc(var(--rotation) * 1deg))
      translate(0, calc(var(--translation) * 1%));
  }

  50% {
    transform: rotate(calc(var(--rotation) * 1deg))
      translate(0, calc(var(--translation) * 1.5%));
  }
}
</style>
