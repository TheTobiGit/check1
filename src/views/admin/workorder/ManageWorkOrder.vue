<template>
  <section class="w-[83vw] p-5 items-center flex flex-col gap-5">
    <h1 class="text-2xl capitalize self-center">{{ title }}</h1>
    <div class="flex flex-col">
      <div
        v-for="workorder in workorderData.workorderDatas"
        :key="workorder"
        @click="openModal(order)"
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
    <div v-if="selectedOrder" class="modal">
      <div class="modal-content flex flex-col gap-3 h-max w-[70vw]">
        <button
          @click="closeModal"
          class="close-button text-red-500 self-start"
        >
          Close
        </button>
        <h2>{{ selectedOrder.vehicleName }}</h2>
        <p>
          <span class="font-bold">regNum:</span>
          {{ selectedOrder.regNum }}
        </p>
        <p>
          <span class="font-bold">Date:</span>
          {{ selectedOrder.date }}
        </p>
        <p>
          <span class="font-bold">Work Details:</span>
          {{ selectedOrder.workDetails }}
        </p>
        <p>
          <span class="font-bold">Service Provider:</span>
          {{ selectedOrder.serviceProvider }}
        </p>
        <p>
          <span class="font-bold">Preferred Completion Date:</span>
          {{ selectedOrder.preferredCompletionDate }}
        </p>
        <p>
          <span class="font-bold">:</span>
          {{ selectedOrder.urgency }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { useworkOrderData } from "../../../stores/admin/WorkOrderData";

export default {
  setup() {
    const workorderData = useworkOrderData();
    const noOrder = "No WorkOrder has been submitted";
    const title = "Work Orders";
    const selectedOrder = ref(null);

    const openModal = (order) => {
      selectedOrder.value = order;
    };

    const closeModal = () => {
      selectedOrder.value = null;
    };

    return {
      workorderData,
      noOrder,
      title,
      selectedOrder,
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
