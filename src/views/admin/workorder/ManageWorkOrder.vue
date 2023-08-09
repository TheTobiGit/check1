<template>
  <section class="w-[83vw] p-5 items-center flex flex-col gap-5">
    <h1 class="text-2xl capitalize self-center">{{ title }}</h1>
    <div class="flex flex-col">
      <div
        v-for="workorder in workorderData.workorderDatas"
        :key="workorder"
        class="w-[70vw]"
      >
        <div class="border w-full h-[7vh] flex rounded-sm">
          <div class="w-1/4 flex justify-center items-center">
            <p>{{ workorder.vehicleName }}</p>
          </div>
          <div class="w-1/4 flex justify-center items-center">
            <p>{{ workorder.urgency }}</p>
          </div>
          <div class="w-2/4 flex justify-center items-center">
            <p class="truncate">{{ workorder.workDetails }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useworkOrderData } from "../../../stores/admin/WorkOrderData";

export default {
  setup() {
    const workorderData = useworkOrderData();
    const noMessage = "No WorkOrder has been submitted";
    const title = "Work Orders";

    return {
      workorderData,
      noMessage,
      title,
    };
  },
};
</script>
