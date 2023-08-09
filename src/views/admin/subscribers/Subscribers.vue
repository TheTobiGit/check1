<template>
  <section class="w-[83vw] p-5 justify-start flex flex-col gap-5">
    <h1 class="text-2xl capitalize self-center">{{ title }}</h1>
    <div class="flex flex-col">
      <p v-if="subscriberData.subscribeDatas.length === 0">
        {{ noSubscriber }}
      </p>
      <div
        v-for="subscriber in subscriberData.subscribeDatas"
        v-else
        :key="subscriber"
        class="w-[40vw]"
      >
        <div class="border w-full h-[7vh] flex rounded-sm">
          <div class="flex justify-center items-center">
            <p>{{ subscriber.userEmail }}</p>
          </div>
        </div>
      </div>
      <!-- <p v-else>
        {{ noSubscriber }}
      </p> -->
    </div>
  </section>
</template>

<script>
import { useSubscribeData } from "../../../stores/admin/SubscribeData";
import { ref, onBeforeMount } from "vue";
import { auth, db } from "../../../stores/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import router from "../../../routes";

export default {
  setup() {
    const subscriberData = useSubscribeData();
    const noSubscriber = "No user has subscribed yet";
    const title = "subscribers";

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

      subscriberData.subscribeDatas.splice(0);
      const querySnapshot = await getDocs(collection(db, "newsletter"));
      let arr = [];
      querySnapshot.forEach((doc) => {
        if (doc.data()) {
          arr.push(doc.data());
        }
      });

      // filter out the duplicates
      const uniqueEmails = Array.from(
        new Set(arr.map((obj) => obj.userEmail))
      ).map((userEmail) => arr.find((obj) => obj.userEmail === userEmail));

      subscriberData.subscribeDatas.push(...uniqueEmails);
    });

    return {
      subscriberData,
      noSubscriber,
      title,
    };
  },
};
</script>

<style scoped></style>
