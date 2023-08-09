<template>
  <section class="min-h-[90vh] grid place-items-center mt-[15vh] md:mt-[10vh]">
    <form
      class="border border-black rounded-md shadow-md flex flex-col gap-5 p-5 w-[80vw] md:w-auto"
      @submit.prevent="updateUser"
    >
      <h2 class="text-center text-3xl capitalize">{{ title }}</h2>
      <div class="flex flex-col gap-2 capitalize">
        <label for="name" name="name">{{ labels[0] }}</label>
        <input
          type="text"
          class="w-full md:max-w-[40vw] px-4 py-2 shadow-md rounded-md text-slate-400"
          disabled
          required
          v-model="userName"
        />
      </div>

      <div class="flex flex-col gap-2 capitalize">
        <label for="email" name="email">{{ labels[1] }}</label>
        <input
          type="email"
          class="w-full md:max-w-[40vw] px-4 py-2 shadow-md rounded-md text-slate-400"
          disabled
          required
          v-model="userEmail"
        />
      </div>

      <div class="flex flex-col gap-2 capitalize">
        <label for="id" name="id">{{ labels[2] }}</label>
        <input
          type="text"
          class="w-full md:max-w-[40vw] px-4 py-2 shadow-md rounded-md text-slate-400"
          disabled
          required
          v-model="userID"
        />
      </div>

      <div class="flex flex-col gap-2 capitalize">
        <label for="number" name="number">{{ labels[4] }}</label>
        <input
          type="tel"
          class="w-full md:max-w-[40vw] px-4 py-2 shadow-md rounded-md text-slate-400"
          :class="{ 'text-black border border-black': isEditing }"
          required
          :disabled="!isEditing"
          v-model="userNumber"
        />
        <p v-show="error" class="text-red-500">Invalid phone number</p>
      </div>

      <div class="flex flex-col gap-2 capitalize">
        <label for="department" name="department">{{ labels[3] }}</label>
        <select
          v-model="userDepartment"
          class="w-full md:max-w-[40vw] px-4 py-2 shadow-md rounded-md text-slate-400"
          :class="{ 'text-black border border-black': isEditing }"
          :disabled="!isEditing"
          required
        >
          <option value="" disabled selected>{{ defaultOption }}</option>
          <option v-for="department in departments" :key="department">
            {{ department }}
          </option>
        </select>
      </div>

      <div class="flex gap-4 justify-end">
        <button
          class="md:w-[7vw] w-[30vw] px-4 py-2 bg-brand1 text-white capitalize self-center rounded-md h-max"
          v-if="isEditing"
          type="submit"
        >
          <p v-if="!loading" class="">{{ button[0] }}</p>
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
        <button
          class="md:w-[7vw] w-[30vw] px-4 py-2 bg-brand2 text-white capitalize self-center rounded-md disabled:opacity-50"
          @click="handleEdit"
          :disabled="isEditing"
        >
          {{ button[1] }}
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import { useUserProfile } from "../../../stores/UserProfile";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../stores/config";
import router from "../../../routes";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default {
  setup() {
    const title = ref("Profile");
    const labels = ref([
      "name",
      "email",
      "student / staff iD",
      "department",
      "phone number",
    ]);
    const button = ref(["save", "edit"]);
    const userProfile = useUserProfile();
    const loading = ref(false);
    const isEditing = ref(false);
    const error = ref(false);

    const departments = ref([
      "Department of Accounting and Finance",
      "Department of Economics, Marketing and Services",
      "Department of Management",
      "Department of Information Technology",
      "Department of Built Environment",
      "Department of Nursing and Midwifery",
      "Department of Physician Assistantship",
      "Department of Law",
      "Department of Theology",
      "Department of Mission",
      "Department of Leadership",
      "Centre for Ministerial Formation",
    ]);

    const userDepartment = ref("");
    const userName = ref();
    const userNumber = ref();
    const userEmail = ref();
    const userID = ref();
    const defaultOption = "Choose Your Department";

    const handleEdit = () => {
      isEditing.value = !isEditing.value;
    };

    onBeforeMount(() => {
      return onAuthStateChanged(auth, async () => {
        if (!auth.currentUser) return router.push("/");

        const email = auth.currentUser.email;
        userEmail.value = email;
        userName.value = auth.currentUser.displayName;

        const getID = () => {
          const ID = email.split("@")[0];
          if (!ID.includes("puc")) return ID;
          const modifiedID = ID.match(/[a-z]/gi)
            .concat(["/"])
            .concat(ID.match(/[0-9]/gi))
            .join("")
            .toUpperCase();
          return modifiedID;
        };
        userID.value = getID();

        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          userNumber.value = docSnap.data()["phone"];
          docSnap.data()["department"]
            ? (userDepartment.value = docSnap.data()["department"])
            : "";
        }
      });
    });

    const updateUser = async () => {
      const numberExpr = /^\+233\d{10}$|^(?:\+233|0)\d{9}$/g;
      if (!userNumber.value.toString().match(numberExpr)) {
        error.value = true;
        return;
      }

      loading.value = true;

      const userRef = doc(db, "users", auth.currentUser.uid);
      // update the user details
      await updateDoc(userRef, {
        department: userDepartment.value,
        phone: userNumber.value,
      });
      loading.value = false;
      isEditing.value = false;
      return;
    };

    return {
      title,
      labels,
      button,
      departments,
      userDepartment,
      userName,
      userNumber,
      userEmail,
      userID,
      defaultOption,
      userProfile,
      handleEdit,
      isEditing,
      loading,
      updateUser,
      error,
    };
  },
  watch: {
    userNumber(newNumber) {
      this.userProfile.setNumber(newNumber);
      this.error = false;
    },
    userDepartment(newDepartment) {
      this.userProfile.setDepartment(newDepartment);
    },
  },
};
</script>

<style>
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
