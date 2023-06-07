<script setup>
import { watchEffect, ref, defineEmits } from 'vue';
import Happiness from '@/Components/MoodTracker/Happiness.vue';
import DiaryTextarea from "@/Components/MoodTracker/DiaryTextarea.vue";

const props = defineProps({
  colors: Array,
  happiness: Number,
  comments: Array,
});

const emit = defineEmits(["selectHappiness", "updateComment"]);
const selectHappiness = (happiness) => {
  emit('selectHappiness', happiness);
};

const comments = ref([]);
const updateComment = (index, comment) => {
  props.comments[index] = comment;
  emit('updateComment', props.comments);
  console.log("Diaryvue.comments=")
  console.log(comments.value);
};
watchEffect(() => {

});
</script>

<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <Happiness :happinessColor="colors[0]" @click="selectHappiness" />
    <div class="bg-white py-5" v-for="(color, index) in colors" :key="color">
      <DiaryTextarea :color="color" :index="index" @updateComment="updateComment" />
    </div>
  </div>
</template>
