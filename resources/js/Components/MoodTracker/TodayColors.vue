// TodayColors.vue
<script setup>
import { defineProps, ref, defineEmits, watchEffect } from "vue";

const props = defineProps({
  colors: Array,
});

const emit = defineEmits(["removeColor"]);

let number = ref(props.colors.length);

watchEffect(() => {
  const uniqueColors = [...new Set(props.colors)];
  number.value = uniqueColors.length;
});

const selectNumber = (num) => {
  if (props.colors[num - 1]) {
    emit("removeColor", num - 1);
  }
};
</script>

<template>
  <div class="mx-auto max-w-md">
    <div class="flex h-50 max-w-md items-center justify-evenly colors">
      <div
        v-for="num in [1, 2, 3, 4]"
        :key="num"
        class="h-30 w-30 rounded"
        :style="{backgroundColor: [props.colors[num - 1]] }"
        @click="selectNumber(num)"
      ></div>
    </div>
  </div>
</template>

<style>
.colors div {
  border: 1px solid #ccc;
  width: 30px;
  height: 30px;
}
</style>
