<script setup>
import { defineProps, ref } from "vue";
import { Head, Link, router } from '@inertiajs/vue3';
import DayItem from "@/Components/Diary/DayItem.vue";

const props = defineProps({
  colors: Array,
  entry: Object,
  date: String,
  mode: String,
});

const visible = ref(false);

const openModal = () => {
  if(props.colors[0]){
    visible.value = true;
  }
};

const closeModal = (id) => { // 識別子を引数に追加
  visible.value = false;
};

const dayItemId = ref(null); // DayItemの識別子を保持

</script>

<template>
  <div class="mx-auto max-w-md pt-3 hover:bg-gray-100" @click="openModal">
    <div class="flex h-50 max-w-md items-center justify-evenly colors">
      <div
        v-for="num in [1, 2, 3, 4]"
        :key="num"
        class="h-30 w-30 rounded"
        :style="{backgroundColor: props.colors[num - 1] }"
      ></div>
    </div>
    <div v-if="props.mode === 'today' && props.colors[0]== ''" class="text-center">
      <Link :href="route('moodtracker')" class="btn btn-xs mt-2">select today colors</Link>
    </div>

    <DayItem
      :isVisible="visible"
      :date="props.date"
      :colors="props.colors"
      :happiness="props.entry?.happiness"
      :comments="props.entry?.comments"
      :stamps="props.entry?.stamps"
      @closeModal="closeModal"
      ref="dayItem"
    />

</div>
</template>

<style>
.colors div {
  border: 1px solid #ccc;
  width: 30px;
  height: 30px;
}
</style>
