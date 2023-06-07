<script setup>
import { ref, watch, defineProps, computed } from "vue";
import DefaultLayout from "@/Layouts/Default.vue";
import TodayColors from "@/Components/MoodTracker/TodayColors.vue";
import ColorPicker from "@/Components/MoodTracker/ColorPicker.vue";
import WriteDiaryButton from "@/Components/MoodTracker/WriteDiaryButton.vue";
import Diary from "@/Components/MoodTracker/Diary.vue";
import Loading from "@/Components/Loading.vue";
import Web3 from "web3/dist/web3.min.js";
import { router } from '@inertiajs/vue3'

const props = defineProps({
  user: Object,
});

const selectedColors = ref([]);
const happiness = ref(0);
const comments = ref([]);
const isLoading = ref(false);
let colorStep = ref(1);
let showDiary = ref(false);

const selectColor = (color) => {
  if (colorStep.value <= 4 && !selectedColors.value.includes(color)) {
    selectedColors.value = [...selectedColors.value, color];
    colorStep.value += 1;
  }
};

const removeColor = (index) => {
  selectedColors.value.splice(index, 1);
  // Adjust the steps
  colorStep.value -= 1;
};

const selectHappiness = (data) => {
  console.log("Data from Child:", data);
  // 受け取ったデータを親コンポーネント内で利用する処理を追加
  happiness.value = data;
};

const updateComment = (data) => {
  comments.value = data;
};

const submitData = async () => {
  console.log('User:', props.user);
  console.log('selectedClors:', selectedColors.value);
  console.log('comments:', comments.value);
  console.log('happiness:', happiness.value);

  try {
    //ローディングを表示
    const isLoading = ref(false);

    // コントラクトのインスタンスを作成
    if (!window.ethereum) {
      return alert('Please install MetaMask to use this dApp!');
    }
    const web3 = new Web3(window.ethereum);
    const contractABI = [{"inputs":[{"internalType":"string[4]","name":"colors","type":"string[4]"},{"internalType":"string[4]","name":"comments","type":"string[4]"},{"internalType":"int8","name":"happiness","type":"int8"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"addEntry","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"entries","outputs":[{"internalType":"int8","name":"happiness","type":"int8"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"startTimestamp","type":"uint256"},{"internalType":"uint256","name":"endTimestamp","type":"uint256"}],"name":"getEntries","outputs":[{"components":[{"internalType":"string[4]","name":"colors","type":"string[4]"},{"internalType":"string[4]","name":"comments","type":"string[4]"},{"internalType":"int8","name":"happiness","type":"int8"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"internalType":"struct SoulPalette.Entry[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"}];
    const contractAddress = '0x03db1b6bc4eee7fa3f0e3a067e46bd8efa24747b'; // コントラクトのアドレスをセット
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // colorsとcommentsの配列を固定長にする
    if (selectedColors.value.length < 4) {
      while (selectedColors.value.length < 4) {
        selectedColors.value.push('');
      }
    }
    if (comments.value.length < 4) {
      while (comments.value.length < 4) {
        comments.value.push('');
      }
    }

    // チェーンに書き込み
    const transaction = await contract.methods
      .addEntry(selectedColors.value, comments.value, happiness.value, Date.now())
      .send({ from: props.user.eth_address, gas: 3000000 });

    console.log('Transaction hash:', transaction.transactionHash);
    // トランザクションが完了した後の処理を追加
    router.get('/diary');
  } catch (error) {
    console.error('Error submitting data:', error);
    // エラーメッセージの表示など、エラー処理
    isLoading.value = false;
  }

};
// ローディングの監視
watch(isLoading, (value) => {
  if (value) {
    // ローディング表示の処理を追加
    // 例: モーダルやスピナーの表示など
  } else {
    // ローディング非表示の処理を追加
  }
});
</script>

<template>
  <DefaultLayout title="MoodTracker">
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        MoodTracker
      </h2>
    </template>
    <div class="">
      <TodayColors :colors="selectedColors" @removeColor="removeColor" />
      <div v-if="showDiary == true">
        <Diary
          :colors="selectedColors"
          :comments="comments"
          @selectHappiness="selectHappiness"
          @updateComment="updateComment"
        />
        <div class="item-center text-center">
          <button type="submit" class="btn btn-xs" @click="submitData" :disabled="isLoading">
            submit
          </button>
        </div>
      </div>
      <div v-else="">
        <p class="item-center text-center" v-if="colorStep <= 4">
          select a color {{ colorStep }}
        </p>
        <WriteDiaryButton v-if="colorStep > 1" @click="showDiary = true" />
        <ColorPicker @selectColor="selectColor" />
      </div>
    </div>
  </DefaultLayout>
</template>
