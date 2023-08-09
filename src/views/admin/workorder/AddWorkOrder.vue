<template>
  <section class="flex justify-center">
    <div class="w-[50vw]">
      <form
        action=""
        class="w-full border border-black shadow-md p-5 flex flex-col gap-6 rounded-sm"
        @submit.prevent="handleSubmit"
      >
        <div class="flex justify-between w-full gap-3">
          <div class="flex flex-col gap-3 w-2/4">
            <label for="vehicleName" class="capitalize">{{ labels[0] }}</label>
            <input
              required
              v-model="workorderData.vehicleName"
              type="text"
              name="vehicleName"
              class="shadow-sm border border-black rounded w-full h-[5vh] px-2"
            />
          </div>
          <div class="flex flex-col gap-3 w-2/4">
            <label for="regNum" class="capitalize">{{ labels[1] }}</label>
            <input
              required
              v-model="workorderData.regNum"
              type="text"
              name="regNum"
              class="shadow-sm border border-black rounded w-full h-[5vh] px-2"
            />
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <label for="date" class="capitalize">{{ labels[2] }}</label>
          <input
            required
            v-model="workorderData.date"
            type="date"
            name="date"
            id=""
            class="shadow-sm border border-black rounded h-[5vh] px-2"
          />
        </div>
        <div class="flex flex-col gap-3">
          <label for="workDetails" class="capitalize">{{ labels[3] }}</label>
          <textarea
            v-model="workorderData.workDetails"
            name="workDetails"
            id=""
            cols="30"
            rows="5"
            class="shadow-sm border border-black rounded p-3"
            required
          ></textarea>
        </div>
        <div class="flex flex-col gap-3">
          <label for="serviceProvider" class="capitalize">{{
            labels[4]
          }}</label>
          <input
            required
            v-model="workorderData.serviceProvider"
            type="text"
            name="serviceProvider"
            id=""
            class="shadow-sm border border-black rounded h-[5vh] px-2"
          />
        </div>
        <div>
          <fieldset class="border border-black rounded py-5">
            <legend class="capitalize px-1">{{ labels[5] }}</legend>
            <div class="flex gap-2 pl-3 flex-wrap">
              <div
                v-for="(categoryItem, index) in category"
                :key="index"
                class="flex gap-2"
              >
                <input
                  type="checkbox"
                  :id="`categoryCheckbox-${index}`"
                  :value="categoryItem"
                  @change="updateCategories(categoryItem)"
                  name="category"
                />
                <label :for="`categoryCheckbox-${index}`" class="capitalize">{{
                  categoryItem
                }}</label>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="flex flex-col gap-3">
          <label for="preferredCompletionDate" class="capitalize">{{
            labels[6]
          }}</label>
          <input
            required
            v-model="workorderData.preferredCompletionDate"
            type="date"
            name="preferredCompletionDate"
            class="shadow-sm border border-black rounded h-[5vh] px-2"
          />
        </div>
        <div>
          <fieldset class="border border-black rounded py-5">
            <legend class="capitalize px-1">{{ labels[7] }}</legend>
            <div class="flex gap-2 pl-3">
              <div
                v-for="(urgencyItem, index) in urgency"
                :key="index"
                class="flex gap-2"
              >
                <input
                  required
                  v-model="workorderData.urgency"
                  type="radio"
                  name="urgency"
                  :value="urgencyItem"
                />
                <p class="capitalize">{{ urgencyItem }}</p>
              </div>
            </div>
          </fieldset>
        </div>
        <button
          type="submit"
          class="self-end bg-brand1 w-[9vw] text-white rounded p-2 uppercase"
        >
          <p v-if="!isLoading" class="">{{ button }}</p>
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
      </form>
    </div>
  </section>
</template>

<script>
import { useworkOrderData } from "../../../stores/admin/WorkOrderData";
import { ref, onBeforeMount } from "vue";
import { auth, db } from "../../../stores/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import Print from "./Print";
import router from "../../../routes";

export default {
  setup() {
    const workorderData = useworkOrderData();
    const button = ref("add");
    const isLoading = ref(false);

    const labels = ref([
      "vehicle name",
      "reg number",
      "date",
      "work details",
      "service provider",
      "category",
      "preferred completion date",
      "urgency",
    ]);

    const category = ref([
      "electricals",
      "servicing",
      "parts replacement",
      "body works",
      "spraying",
      "upholstery",
    ]);

    const urgency = ref(["low", "medium", "high"]);

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
    });

    const handleSubmit = async () => {
      isLoading.value = true;
      let modifiedCategory = "";
      if (workorderData.category.length > 0) {
        modifiedCategory = workorderData.category.reduce(
          (previous, current, undefined, arr) => {
            if (arr[arr.length - 1] === current)
              return previous + " and " + current;
            return previous + ", " + current;
          }
        );
      }

      const formData = {
        vehicleName: workorderData.vehicleName,
        regNum: workorderData.regNum,
        date: workorderData.date,
        workDetails: workorderData.workDetails,
        serviceProvider: workorderData.serviceProvider,
        category: modifiedCategory,
        preferredCompletionDate: workorderData.preferredCompletionDate,
        urgency: workorderData.urgency,
      };

      workorderData.addWorkorderData(formData);
      const printWindow = window.open("", "_blank", "width=600,height=400");
      printWindow.document.open();
      const printData = Print(formData);
      console.log(printData);
      printWindow.document.write(printData);

      isLoading.value = false;
      // const docRef = await addDoc(collection, (db, "workorder"), {
      //   ...formData,
      // }).then(() => (isLoading.value = false));
    };

    return {
      labels,
      category,
      urgency,
      button,
      workorderData,
      handleSubmit,
      isLoading,
    };
  },
  methods: {
    updateCategories(item) {
      if (this.workorderData.category.indexOf(item) === -1)
        return this.workorderData.category.push(item);

      return this.workorderData.category.splice(
        this.workorderData.category.indexOf(item),
        1
      );
    },
  },
};
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
