<script setup>
import { defineProps, ref, defineEmits, watchEffect } from "vue";
import TodayColors from "@/Components/Diary/TodayColors.vue";
const props = defineProps({
  weekly: Object,
});

console.log('weekly', props.weekly);
</script>

<template>
  <div class="mx-auto mt-10">
    <ol class="">
      <template v-for="dateitem in weekly">
      <li class="mb-2 border-t-2 border-dashed pt-2 hover:bg-gray-100">
        <h4 class="text-xs font-sans font-bold text-center mb-2">{{ dateitem.day }}</h4>
        <div class="pb-2">
          <TodayColors :entry='dateitem.entry' :colors="dateitem.colors" :date="dateitem.day" mode="otherday" />
        </div>
      </li>
      </template>
    </ol>
  </div>
</template>

<style>
.colors div {
  border: 1px solid #ccc;
  width: 30px;
  height: 30px;
}
</style>
