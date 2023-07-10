<script setup>
import { ref, onMounted, defineProps, watch } from "vue";
import DefaultLayout from "@/Layouts/Default.vue";
import TodayColors from "@/Components/Diary/TodayColors.vue";
import WeeklyColors from "@/Components/Diary/WeeklyColors.vue";
import MonthlyColors from "@/Components/Diary/MonthlyColors.vue";
import MonthlyChart from "@/Components/Diary/MonthlyChart.vue";
import Web3 from "web3/dist/web3.min.js";
import moment from 'moment';

const props = defineProps({
  user: Object,
  contractAddress: String,
  contractABI: Object,
  contractRPC: String,
});

const todayColors = ref(['', '', '', '']);
const todayEntry = ref({});
const weeklyData = ref([]);
const monthlyData = ref([]);
const today = ref('');
const ethData = ref(null);
const shouldFetchData = ref(false);

function getEthData() {
  return new Promise((resolve, reject) => {
    // ユーザーのethアドレスを取得
    const userEthAddress = props.user?.eth_address;
    console.log('userEthAddress0', userEthAddress);
    const storedEthData = JSON.parse(sessionStorage.getItem('ethData'));
    if (userEthAddress && !storedEthData) {
      // ポリゴンチェーンからデータを取得
      const contractRPC = props.contractRPC;
      const contractABI = props.contractABI;
      const contractAddress = props.contractAddress;
      console.log('props', props)
      const web3 = new Web3(contractRPC);

      const timeZoneOffsetMinutes = new Date().getTimezoneOffset();
      const currentTimestamp = moment().subtract(timeZoneOffsetMinutes, 'minutes').valueOf().toString();
      const twoMonthsAgoTimestamp = moment().subtract(2, 'months').subtract(timeZoneOffsetMinutes, 'minutes').valueOf().toString();

      const contract = new web3.eth.Contract(contractABI, contractAddress);

      contract.methods.getEntries(userEthAddress, twoMonthsAgoTimestamp, currentTimestamp)
        .call()
        .then(result => {
          // レスポンスの処理
          const entries = result.map((entry) => {
            return {
              colors: entry.colors,
              comments: entry.comments,
              stamps: entry.stamps,
              happiness: entry.happiness,
              date: moment(parseInt(entry.timestamp)).format('YYYY-MM-DD'),
              unixtimestamp: entry.timestamp,
            };
          });
          console.log('enries', entries);
          const entriesByDate = {};
          entries.forEach((entry) => {
            const { date, unixtimestamp } = entry;
            if (!entriesByDate[date] || unixtimestamp > entriesByDate[date].unixtimestamp) {
              entriesByDate[date] = entry;
            }
          });
          console.log('entriesByDate', entriesByDate);
          const data = Object.values(entriesByDate);
          console.log('getEthData', data);
          resolve(data);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    } else {
      resolve(storedEthData);
    }
  });
}

async function getEntries() {
  try {
    console.log('ethData0', ethData.value);

    if (ethData.value === null || shouldFetchData === true) {
      ethData.value = await getEthData();
    }

    console.log('ethData1', ethData.value);
    console.log('show.props.ethData', props.ethData);
    // 当日のデータがあればtodayColorsにセット
    today.value = moment().format('YYYY-MM-DD');
    todayEntry.value = ethData.value && ethData.value.find((entry) => entry.date === today.value);
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
      const thisdateEntry = ethData.value && ethData.value.find((entry) => entry.date === date.format('YYYY-MM-DD'));
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
  <DefaultLayout title="MoodTracker" v-if="ethData !== null">
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
  <div v-else>
    Loading...
  </div>
</template>
