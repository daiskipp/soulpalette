<script setup>
import { ref, onMounted, defineProps } from "vue";
import DefaultLayout from "@/Layouts/Default.vue";
import TodayColors from "@/Components/Diary/TodayColors.vue";
import WeeklyColors from "@/Components/Diary/WeeklyColors.vue";
import MonthlyColors from "@/Components/Diary/MonthlyColors.vue";
import MonthlyChart from "@/Components/Diary/MonthlyChart.vue";
import moment from 'moment';

const props = defineProps({
  user: Object,
});

const todayColors = ref(['', '', '', '']);
const todayEntry = ref({});
const weeklyData = ref([]);
const monthlyData = ref([]);
const today = ref('');
const ethData = ref(null);

async function getEntries() {
  try {
    const storedEthData = sessionStorage.getItem('ethData');
    if (storedEthData) {
      ethData.value = JSON.parse(storedEthData);
    }
    console.log('ethData1', ethData.value);


    // 当日のデータがあればtodayColorsにセット
    today.value = moment().format('YYYY-MM-DD');
    todayEntry.value = ethData.value.find((entry) => entry.date === today.value);
    if (todayEntry.value?.colors) {
      todayColors.value = todayEntry.value.colors;
    }
    console.log('todaycolors', todayColors.value)
    // 直近7日間の配列を作成してweeklyDataにセット
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const date = moment(yesterday).subtract(i, 'day');
      const thisdateEntry = ethData.value.find((entry) => entry.date === date.format('YYYY-MM-DD'));
      const thisDate = {
        day: date.format('YYYY-MM-DD'),
        colors: thisdateEntry ? thisdateEntry.colors : ['', '', '', ''],
        entry: thisdateEntry ? thisdateEntry : {},
      };
      weeklyData.value.push(thisDate);

    }
    monthlyData.value = ethData.value;
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
}

onMounted(getEntries);
</script>

<template>
  <DefaultLayout title="MoodTracker">
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Diary
      </h2>
    </template>
    <div class="contents-center">
      <h4 class="text-xs font-sans font-bold text-center mb-2">TODAY {{ today }}</h4>
      <div class="hover:bg-gray-100">
        <TodayColors :colors="todayColors" :entry="todayEntry" :date="today" mode="today" />
      </div>
      <WeeklyColors :weekly="weeklyData" />
      <MonthlyColors :monthly="monthlyData" />
      <MonthlyChart :monthly="monthlyData" />
    </div>

  </DefaultLayout>
</template>
