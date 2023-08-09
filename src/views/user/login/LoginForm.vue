<template>
  <section class="h-screen grid place-items-center">
    <div
      class="border h-[70vh] border-black rounded-md shadow-md flex flex-col p-10 gap-2 w-[90vw] md:w-auto"
    >
      <div class="h-[40vh] w-full">
        <img src="../../../assets/logoo.png" alt="" class="h-full" />
      </div>
      <h2 class="text-center text-3xl capitalize mb-10 font-bold">
        {{ title }}
      </h2>

      <button
        @click="handleClick"
        class="px-4 py-2 w-fit hover:bg-[#2a5198] hover:text-white border border-black shadow-md text-[#8E8D8D] self-center rounded-md hover:opacity-90"
        v-bind:disabled="loading"
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
      <p v-show="error" class="text-red-500 text-center">
        Only use assigned school email ending '@pentvars.edu.gh'
      </p>
    </div>
  </section>
</template>

<script>
import { onBeforeMount, onMounted, ref } from "vue";
import router from "../../../routes";
import { login } from "../../../stores/UserData";
import { auth, db } from "../../../stores/config";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default {
  setup() {
    const title = "login";
    const button = "Continue with school mail";
    const loading = ref(false);
    const error = ref(false);

    const handleClick = async () => {
      loading.value = true;
      error.value = false;
      return await login();
    };

    onAuthStateChanged(auth, async () => {
      if (!auth.currentUser) return;

      // check if admin
      if (
        auth.currentUser.email === "puc200626@pentvars.edu.gh" ||
        auth.currentUser.email === "eaninkorah@pentvars.edu.gh" ||
        auth.currentUser.email === "puc200206@pentvars.edu.gh"
      )
        return router.push("/admin");

      // check if user has already updated their details
      const userRef = doc(db, "users", auth.currentUser.uid);
      const usersData = await getDoc(userRef);
      const { phone, department } = usersData.data();

      // if fields are not already updated
      if (!phone || !department) return router.push("/onboard");

      // else homepage
      return router.push("/");
    });

    onMounted(async () => {
      loading.value = true;
      return await getRedirectResult(auth)
        .then(() => {
          setTimeout(() => {
            loading.value = false;
          }, 1000);
        })
        .catch(() => {
          error.value = true;
          loading.value = false;
        });
    });

    return {
      title,
      button,
      loading,
      handleClick,
      error,
    };
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
