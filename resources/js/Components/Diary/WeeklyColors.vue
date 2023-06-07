<script setup>
import { defineProps, ref, defineEmits, watchEffect } from "vue";

const props = defineProps({
  weekly: [],
});


</script>

<template>
  <div class="mx-auto max-w-md">
    <div class="flex h-50 max-w-md items-center justify-evenly colors">
      <div
        v-for="week in weekly"
        :key="week"
        class="h-30 w-30 rounded"
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
