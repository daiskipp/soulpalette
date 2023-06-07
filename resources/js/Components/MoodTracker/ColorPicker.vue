<script setup>
import { ref } from 'vue';
const emit = defineEmits(['selectColor']);

const colors = ref([
  "#ee8592",
  "#f1df61",
  "#db5686",
  "#eaa944",
  "#9b1b59",
  "#e0654c",
  "#4b1e49",
  "#a73e35",
  "#1c3a94",
  "#4c3c2d",
  "#35749e",
  "#242328",
  "#71c6c4",
  "#4f503a",
  "#54a76b",
  "#ffffff",
  "#fff575",
]);

const selectColor = (color) => {
    emit('selectColor', color);
};
</script>
<template>
  <div class="flex flex-wrap">
    <div
      v-for="color in colors"
      :key="color"
      class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
    >
      <div class="flex flex-col items-center justify-center w-full h-24">
        <div class="w-10 h-10 rounded-full" :style="{backgroundColor:color}" @click="selectColor(color)"></div>
      </div>
    </div>
  </div>
</template>
