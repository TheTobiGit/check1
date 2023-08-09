<template>
  <section
    class="grid grid-cols-2 md:grid-cols-3 md:place-items-center px-2 md:px-0 h-[10vh] shadow-sm bottom-border"
  >
    <router-link :to="'/'" class="h-[10vh] flex items-center">
      <img src="../../../assets/logo.png" alt="" class="h-[60%] md:h-[80%]" />
    </router-link>
    <nav class="hidden md:flex">
      <ul
        class="flex flex-col md:flex-row gap-5 uppercase text-brand1 font-bold"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30"
          viewBox="0 -960 960 960"
          width="48"
          class="md:hidden self-end"
          @click="toggleNav"
        >
          <path
            d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"
          />
        </svg>
        <li>
          <router-link :to="'/'">home</router-link>
        </li>
        <li v-for="item in navItems" :key="item" class="cursor-pointer">
          <a
            :href="getComponentId(item)"
            @click.prevent="scrollToSection(getComponentId(item))"
            >{{ item }}</a
          >
        </li>
      </ul>
    </nav>
    <div class="flex items-center justify-end gap-2">
      <div class="" v-if="!user">
        <router-link :to="'/login'">
          <button
            class="w-[30vw] md:w-[10vw] uppercase text-white bg-brand1 rounded-md p-2 hover:opacity-90"
          >
            login
          </button>
        </router-link>
      </div>
      <p
        :class="{
          'z-50 md:z-0 whitespace-normal md:truncate text-center mt-[25vh] pr-0 md:pr-3 md:pl-0 md:mt-0 absolute right-[16%] md:relative md:right-0':
            profileShow,
        }"
        class="pr-3 text-brand1 truncate"
        v-else
      >
        {{ user }}
      </p>
      <div class="flex flex-col" v-if="user">
        <div
          :class="{
            'absolute right-[15%] top-5 z-50 md:relative md:top-0 md:right-0':
              profileShow,
          }"
          class="flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded-full py-1 select-none"
          @click="toggleProfile"
          id="nav-menu"
        >
          <div
            :class="{ 'w-[17vw] h-[10vh] md:w-8 md:h-8': profileShow }"
            class="rounded-full w-8 h-8 ring-2 ring-offset-1 space-x-1"
          >
            <img
              :src="profilePicture && profilePicture"
              class="h-full w-full object-cover rounded-full"
              alt=""
            />
          </div>
          <span
            :class="{ 'rotate-[-90deg] md:rotate-180': profileShow }"
            class="material-icons-outlined text-brand1 h-full rotate-90 md:rotate-0"
          >
            expand_more
          </span>
        </div>
        <div
          class="shadow-md h-[100vh] pt-[23vh] md:pt-0 md:h-max w-[50vw] md:w-[20vh] capitalize absolute md:top-[9vh] top-0 right-0 md:right-[7%] bg-white rounded-sm z-10"
          v-if="profileShow"
        >
          <ul class="flex flex-col select-none gap-2">
            <router-link
              :to="'/profile'"
              class="cursor-pointer hover:bg-slate-200 hover:text-black text-slate-500 p-2"
            >
              <li @click="toggleProfile" class="flex items-center gap-3">
                <span class="material-icons-outlined"> account_circle </span>
                {{ profileItems[0] }}
              </li>
            </router-link>
            <router-link
              :to="'/bookings'"
              class="cursor-pointer hover:bg-slate-200 hover:text-black text-slate-500 p-2"
            >
              <li @click="toggleProfile" class="flex items-center gap-3">
                <span class="material-icons-outlined"> backpack </span>
                {{ profileItems[1] }}
              </li>
            </router-link>
            <li
              class="text-red-400 hover:text-red-600 hover:bg-red-200 flex items-center gap-3 cursor-pointer p-2"
              @click="signOut"
            >
              <span class="material-icons-outlined"> power_settings_new </span>
              {{ profileItems[2] }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../stores/config";
import { logout } from "../../../stores/UserData";

export default {
  setup() {
    const navItems = ref(["vehicles", "contact us", "faqs"]);
    const profileItems = ref(["profile", "bookings", "logout"]);

    const profileShow = ref(false);
    const profilePicture = ref();
    const toggleProfile = () => {
      profileShow.value = !profileShow.value;

      document.addEventListener("click", (event) => {
        const navMenu = document.querySelector("#nav-menu");
        const isClickInsideMenu = navMenu.contains(event.target);

        if (!isClickInsideMenu) {
          profileShow.value = false;
          return;
        }
      });
      return;
    };

    const user = ref(null);

    const getComponentId = (item) => {
      const componentIds = {
        vehicles: "#vehicles",
        "contact us": "#contactus",
        faqs: "#faqs",
      };

      return componentIds[item.toLowerCase()];
    };

    const scrollToSection = (id) => {
      const element = document.querySelector(id);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    onAuthStateChanged(auth, () => {
      if (!auth.currentUser) return logout();

      user.value = auth.currentUser.displayName;
      profilePicture.value = auth.currentUser.photoURL;
      return;
    });

    const signOut = () => logout().then(() => window.location.reload());

    const handleBlur = () => {
      const profile = document.querySelector("#profile");

      console.log(profile);
    };

    return {
      user,
      navItems,
      profileItems,
      getComponentId,
      scrollToSection,
      profileShow,
      toggleProfile,
      signOut,
      profilePicture,
      handleBlur,
    };
  },
};
</script>

<style scoped>
.bottom-border {
  position: relative;
}

.bottom-border::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3.5px;

  /* Set the background color for each section */
  background-color: black;
  background-image: linear-gradient(to right, #00aeef 0%, #00aeef 33%),
    linear-gradient(to right, #fdb515 33%, #fdb515 66%),
    linear-gradient(to right, #2a5198 66%, #2a5198 100%);
  background-repeat: no-repeat;
  background-size: 33% 100%;
  /* Divide the width evenly into 3 sections */
  background-position: 0 0, 33% 0, 66% 0;
}
</style>
