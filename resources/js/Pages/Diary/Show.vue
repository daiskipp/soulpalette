<script setup>
import { ref, watchEffect, defineProps } from "vue";
import DefaultLayout from "@/Layouts/Default.vue";
import TodayColors from "@/Components/Diary/TodayColors.vue";
import WeeklyColors from "@/Components/Diary/WeeklyColors.vue";
import MonthlyColors from "@/Components/Diary/MonthlyColors.vue";
import Web3 from "web3/dist/web3.min.js";

const todayColors = ref([]);
const weeklyData = ref([]);
const monthlyData = ref([]);
</script>

<template>
  <DefaultLayout title="MoodTracker">
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Diary
      </h2>
    </template>
    <div class="contents-center">
      <img src="/images/samplediary.png" class="w-auto items-center mx-auto">
<!--
      <TodayColors :colors="todayColors" />
      <WeeklyColors :weekly="weeklyData" />
      <MonthlyColors :monthly="monthlyData" />
-->
    </div>
  </DefaultLayout>
</template>
