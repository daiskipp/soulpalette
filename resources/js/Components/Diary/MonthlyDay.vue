<script setup>
import { defineProps, watchEffect, ref, defineEmits } from "vue";
import DayItem from "@/Components/Diary/DayItem.vue";

const props = defineProps({
  dayitem: Object
});


// month: currentDate.month() + 1,
// day: currentDate.date(),
// entry: entry,
// color1: entry ? entry.colors[0] : '',
const visible = ref(false);


const openModal = () => {
  console.log('props.dayitem', props.dayitem);
  if(props.dayitem.color1){
    visible.value = true;
  }
};

const closeModal = (id) => { // 識別子を引数に追加
  visible.value = false;
};
</script>
<template>
  <div
    class="flex items-center justify-center w-full rounded-full cursor-pointer"
  >
    <a
      role="link"
      tabindex="0"
      class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 focus:bg-gray-400 hover:bg-gray-400 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-gray-700 rounded-full"
      :style="{ backgroundColor: dayitem.color1 }"
      @click="openModal(dayitem.entry)"
      >{{ dayitem.day }}</a>
      <DayItem
          :isVisible="visible"
          :date="dayitem.entry.date"
          :colors="dayitem.entry.colors"
          :happiness="dayitem.entry.happiness"
          :comments="dayitem.entry.comments"
          :stamps="dayitem.entry.stamps"
          @closeModal="closeModal"
          ref="dayItem"
        />
  </div>
</template>
