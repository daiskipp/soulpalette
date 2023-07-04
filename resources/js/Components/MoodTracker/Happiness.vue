<script setup>
import { defineProps, ref, defineEmits } from "vue";

const props = defineProps({
  happinessColor: String,
  happiness: Number
});

const emit = defineEmits(["click"]);

const selectedHappiness = ref(null);

const selectHappiness = (num) => {
  if (selectedHappiness.value === num) {
    selectedHappiness.value = null;
  } else {
    selectedHappiness.value = num;
    emit("click", num);
  }
};

const getHappinessColor = (num) => {
  return selectedHappiness.value === num ? props.happinessColor : "";
};
</script>

<template>
  <div class="mx-auto cmax-w-md w-full m-5">
    <div class="h-50 ">
      <p class="item-center text-center">select your happiness</p>
      <div class="flex justify-evenly happiness py-2 w-full h-full">
      <div
        v-for="num in [1, 2, 3, 4, 5]"
        :key="num"
        :id="happiness-{num}"
        class="flex items-center justify-center w-full rounded-full cursor-pointer"
        @click="selectHappiness(num)"
      >
        <span
          class="border-1 outline-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 focus:bg-gray-400 hover:bg-gray-400 text-base w-10 h-10 flex items-center justify-center font-medium text-black rounded-full"
          :class="{ outlineColor: happinessColor }"
          style="border: 1px solid #ccc;"
          :style="{ backgroundColor: getHappinessColor(num) }"
          >{{ num }}</span>
      </div>
    </div>
  </div>
  </div>

</template>
