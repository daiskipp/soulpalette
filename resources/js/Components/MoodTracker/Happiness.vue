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
      <div class="flex justify-evenly happiness py-2">
      <div
        v-for="num in [1, 2, 3, 4, 5]"
        :key="num"
        :id="happiness-{num}"
        class="h-30 w-30 rounded-full badge badge-secondar border-solid border-2 "
        :style="{ backgroundColor: getHappinessColor(num) }"
        @click="selectHappiness(num)"
      >{{ num }}
      </div>
    </div>
  </div>
  </div>

</template>
