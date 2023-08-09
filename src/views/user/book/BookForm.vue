<template>
  <section v-if="selectedVehicle" class="min-h-[90vh] p-5 mt-[10vh]">
    <h3 class="text-3xl capitalize text-center my-[5vh]">{{ title }}</h3>
    <div class="grid place-items-center">
      <div class="shadow-md border-2">
        <div>
          <img
            :src="selectedVehicle.image"
            :alt="selectedVehicle.name"
            class="w-full h-[40vh]"
          />
        </div>
        <div class="w-[90vw] md:w-[50vw] mt-5 px-3 md:px-10 mb-[6vh]">
          <p class="text-2xl">{{ selectedVehicle.name }}</p>
          <p class="text-xl mb-5">Capacity: {{ selectedVehicle.capacity }}</p>
          <form
            class="shadow-md border rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-3 w-full"
            @submit="handleClick"
            ref="formRef"
          >
            <div class="flex flex-col md:flex-row gap-5 justify-between">
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm mb-2 capitalize font-bold"
                  for="date-from"
                  >{{ labels[0] }}</label
                >
                <input
                  type="date"
                  v-model="bookData.dateFrom"
                  class="shadow appearance-none border rounded py-5 md:py-2 md:px-3 text-gray-700 bg-white md:bg-none leading-tight focus:outline-none focus:shadow-outline text-center w-full md:w-[19vw]"
                  id="date-from"
                  :min="today"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm mb-2 capitalize font-bold"
                  for="date-to"
                  >{{ labels[1] }}</label
                >
                <input
                  type="date"
                  v-model="bookData.dateTo"
                  class="shadow appearance-none border rounded py-5 md:py-2 md:px-3 text-gray-700 bg-white md:bg-none leading-tight focus:outline-none focus:shadow-outline text-center w-full md:w-[19vw]"
                  id="date-to"
                  :min="today"
                  required
                />
              </div>
            </div>
            <div class="flex gap-5 flex-col md:flex-row justify-between">
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm mb-2 capitalize font-bold"
                  for="time-from"
                  >{{ labels[2] }}</label
                >
                <input
                  type="time"
                  v-model="bookData.timeFrom"
                  class="shadow appearance-none border rounded py-5 md:py-2 md:px-3 text-gray-700 bg-white md:bg-none leading-tight focus:outline-none focus:shadow-outline text-center w-full md:w-[19vw]"
                  id="time-from"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm mb-2 capitalize font-bold"
                  for="time-to"
                  >{{ labels[3] }}</label
                >
                <input
                  type="time"
                  v-model="bookData.timeTo"
                  class="shadow appearance-none border rounded py-5 md:py-2 md:px-3 text-gray-700 bg-white md:bg-none leading-tight focus:outline-none focus:shadow-outline text-center w-full md:w-[19vw]"
                  id="time-to"
                  required
                />
              </div>
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm mb-2 capitalize font-bold"
                for="destination"
                >{{ labels[4] }}</label
              >
              <input
                type="text"
                v-model="bookData.destination"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="destination"
                placeholder="Enter your destination...."
                required
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm mb-2 font-bold"
                for="purpose"
                name="purpose"
                >{{ labels[5] }}</label
              >
              <textarea
                name="purpose"
                v-model="bookData.purpose"
                cols="30"
                rows="10"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="purpose"
                placeholder="Enter your purpose of travel...."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="capitalize h-fit w-fit self-end max-w-[28vw] md:w-[9vw] bg-[#FDB515] text-white py-2 px-4 rounded shadow-md font-bold"
            >
              <p v-if="!loading" class="">{{ button }}</p>
              <div v-else class="spinner center">
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
                <div class="spinner-blade"></div>
              </div>
            </button>
            <p v-show="error" class="text-red-500 text-center select-none">
              {{ error }}
            </p>
            <p v-if="success" class="text-green-500 text-center select-none">
              Booking was successful
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useBookData } from "../../../stores/BookData";
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import vehicleData from "../../../data/Vehicles.json";
import { auth, db } from "../../../stores/config";
import { onAuthStateChanged } from "firebase/auth";
import { arrayUnion, doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import router from "../../../routes";

const bookData = useBookData();
const loading = ref(false);
const error = ref(null);
const success = ref(false);
const formRef = ref();

const title = ref("book a vehicle");
const selectedVehicle = ref(null);
const labels = ref([
  "date from",
  "date to",
  "time from",
  "time to",
  "destination",
  "Purpose of Travel",
]);
const dateInputType = ref("date");
const button = ref("book");

const route = useRoute();

onMounted(() => {
  const vehicleId = route.params.vehicleId;
  selectedVehicle.value = getVehicleById(vehicleId);
  scrollToTop();
});

onAuthStateChanged(auth, async () => {
  if (!auth.currentUser) return router.push("/");
});

const handleClick = async (event) => {
  event.preventDefault();
  loading.value = true;

  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  const { phone, department } = docSnap.data();

  if (!docSnap.exists() || !phone || !department) {
    error.value = "Update Profile before booking";
    loading.value = false;
    return;
  }

  const data = {
    dateFrom: bookData.dateFrom,
    dateTo: bookData.dateTo,
    destination: bookData.destination,
    purpose: bookData.purpose,
    timeFrom: bookData.timeFrom,
    timeTo: bookData.timeTo,
    vehicleID: selectedVehicle.value.id,
    userName: auth.currentUser.displayName,
    department: department,
    phoneNumber: phone,
  };

  const userRef = doc(db, "users", auth.currentUser.uid);
  const bookingsRef = doc(db, "booking", auth.currentUser.uid);
  // update the user details
  await updateDoc(userRef, {
    bookings: arrayUnion({
      ...data,
    }),
  });

  // update the bookings details
  await setDoc(
    bookingsRef,
    {
      data: arrayUnion({ ...data }),
    },
    { merge: true }
  ).catch(() => {
    error.value = "Unable to place booking";
    loading.value = false;
  });

  success.value = true;
  setTimeout(() => {
    router.push("/").then(() => {
      window.location.reload();
    });
  }, 2000);
};

const today = computed(() => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
});

watch(dateInputType, (newValue) => {
  if (newValue === "text") {
    setTimeout(() => {
      dateInputType.value = "date";
    }, 100);
  }
});

function getVehicleById(vehicleId) {
  const allVehicles = [
    ...vehicleData.buses,
    ...vehicleData.vans,
    ...vehicleData.trucks,
  ];
  return allVehicles.find((vehicle) => vehicle.id === parseInt(vehicleId));
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    // behavior: "smooth",
  });
}
</script>

<style scoped>
.spinner {
  font-size: 28px;
  position: relative;
  display: inline-block;
  width: 1em;
  height: 100%;
}

.spinner.center {
  margin: auto;
}

.spinner .spinner-blade {
  position: absolute;
  left: 0.4629em;
  bottom: 0;
  width: 0.074em;
  height: 0.2777em;
  border-radius: 0.0555em;
  background-color: transparent;
  -webkit-transform-origin: center -0.2222em;
  -ms-transform-origin: center -0.2222em;
  transform-origin: center -0.2222em;
  animation: spinner-fade9234 1s infinite linear;
}

.spinner .spinner-blade:nth-child(1) {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
  -webkit-transform: rotate(0deg);
  -ms-transform: rotate(0deg);
  transform: rotate(0deg);
}

.spinner .spinner-blade:nth-child(2) {
  -webkit-animation-delay: 0.083s;
  animation-delay: 0.083s;
  -webkit-transform: rotate(30deg);
  -ms-transform: rotate(30deg);
  transform: rotate(30deg);
}

.spinner .spinner-blade:nth-child(3) {
  -webkit-animation-delay: 0.166s;
  animation-delay: 0.166s;
  -webkit-transform: rotate(60deg);
  -ms-transform: rotate(60deg);
  transform: rotate(60deg);
}

.spinner .spinner-blade:nth-child(4) {
  -webkit-animation-delay: 0.249s;
  animation-delay: 0.249s;
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
}

.spinner .spinner-blade:nth-child(5) {
  -webkit-animation-delay: 0.332s;
  animation-delay: 0.332s;
  -webkit-transform: rotate(120deg);
  -ms-transform: rotate(120deg);
  transform: rotate(120deg);
}

.spinner .spinner-blade:nth-child(6) {
  -webkit-animation-delay: 0.415s;
  animation-delay: 0.415s;
  -webkit-transform: rotate(150deg);
  -ms-transform: rotate(150deg);
  transform: rotate(150deg);
}

.spinner .spinner-blade:nth-child(7) {
  -webkit-animation-delay: 0.498s;
  animation-delay: 0.498s;
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}

.spinner .spinner-blade:nth-child(8) {
  -webkit-animation-delay: 0.581s;
  animation-delay: 0.581s;
  -webkit-transform: rotate(210deg);
  -ms-transform: rotate(210deg);
  transform: rotate(210deg);
}

.spinner .spinner-blade:nth-child(9) {
  -webkit-animation-delay: 0.664s;
  animation-delay: 0.664s;
  -webkit-transform: rotate(240deg);
  -ms-transform: rotate(240deg);
  transform: rotate(240deg);
}

.spinner .spinner-blade:nth-child(10) {
  -webkit-animation-delay: 0.747s;
  animation-delay: 0.747s;
  -webkit-transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  transform: rotate(270deg);
}

.spinner .spinner-blade:nth-child(11) {
  -webkit-animation-delay: 0.83s;
  animation-delay: 0.83s;
  -webkit-transform: rotate(300deg);
  -ms-transform: rotate(300deg);
  transform: rotate(300deg);
}

.spinner .spinner-blade:nth-child(12) {
  -webkit-animation-delay: 0.913s;
  animation-delay: 0.913s;
  -webkit-transform: rotate(330deg);
  -ms-transform: rotate(330deg);
  transform: rotate(330deg);
}

@keyframes spinner-fade9234 {
  0% {
    background-color: #69717d;
  }

  100% {
    background-color: transparent;
  }
}
</style>
