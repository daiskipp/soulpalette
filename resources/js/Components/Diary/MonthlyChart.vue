<script setup>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';
import moment from 'moment';

const props = defineProps({
  monthly: Object,
});

const chartRef = ref(null);

// monthlyDataが更新されたときにチャートを描画する
watch(() => props.monthly, () => {
  const monthlyData = props.monthly.value;
  console.log('monthlyData', props.monthly.value);
  if (monthlyData) {
    const dates = getDatesInMonth();
    const happinessData = mapHappinessData(monthlyData, dates);

    createChart(dates, happinessData);
  }
});

function getDatesInMonth() {
  const startOfMonth = moment().startOf('month');
  const endOfMonth = moment().endOf('month');
  const dates = [];

  let currentDate = startOfMonth.clone();

  while (currentDate.isSameOrBefore(endOfMonth, 'day')) {
    dates.push(currentDate.format('YYYY-MM-DD'));
    currentDate.add(1, 'day');
  }

  return dates;
}

function mapHappinessData(monthlyData, dates) {
  const happinessData = [];

  for (const date of dates) {
    const entry = monthlyData.find((entry) => entry.date === date);
    const happiness = entry ? entry.happiness : 0;
    happinessData.push(happiness);
  }

  return happinessData;
}

function createChart(dates, happinessData) {
  const ctx = chartRef.value.getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Happiness',
          data: happinessData,
          backgroundColor: props.monthly.value[0]?.colors[0],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
        },
      },
    },
  });
}
</script>

<template>
  <div>
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    monthly: Object,
  },
  setup() {
    return {
      chartRef,
    };
  },
};
</script>

<style>
canvas {
  width: 100%;
  height: 300px;
}
</style>
