<script setup>
import { defineProps } from "vue";

const props = defineProps({
  colors: Array,
});


</script>

<template>
  <div class="mx-auto max-w-md">
    <div class="flex h-50 max-w-md items-center justify-evenly colors">
      <div
        v-for="num in [1, 2, 3, 4]"
        :key="num"
        class="h-30 w-30 rounded"
        :style="{backgroundColor: [props.colors[num - 1]] }"
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
