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
import VueElementLoading from "vue-element-loading";

const props = defineProps({
  user: Object,
  contractAddress: String,
  contractABI: Object,
  contractRPC: String,
  shouldFetchData: Boolean,
});
const shouldFetchData = ref(true); // 初期値として再取得フラグをtrueに設定
const selectedColors = ref([]);
const happiness = ref(0);
const comments = ref([]);
const stamps = ref([]);
const backgroundColor = ref('');
const colorlock = ref(false);
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
  console.log("Comment from Child:", data);
  comments.value = data;
};

const updateStamp = (data) => {
  console.log("Stamp from Child:", data);
  stamps.value = data;
};



const submitData = async () => {
  console.log('User:', props.user);
  console.log('selectedClors:', selectedColors.value);
  console.log('comments:', comments.value);
  console.log('stamps:', stamps.value);
  console.log('happiness:', happiness.value);

  try {
    //ローディングを表示
    backgroundColor.value = selectedColors.value[0];
    isLoading.value = true;
    console.log('backgroundColor:', backgroundColor.value);
    // コントラクトのインスタンスを作成
    if (!window.ethereum) {
      return alert('Please install MetaMask to use this dApp!');
    }
    const web3 = new Web3(window.ethereum);
    const contractRPC = props.contractRPC;
    const contractABI = props.contractABI;
    const contractAddress = props.contractAddress;
    console.log('contractAddress', contractAddress);
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // colorsとcomments,stampsの配列を固定長にする
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
    if (stamps.value.length < 4) {
      while (stamps.value.length < 4) {
        stamps.value.push('');
      }
    }
    console.log('selectedClors:', selectedColors.value);
    console.log('comments:', comments.value);
    console.log('stamps:', stamps.value);

    // チェーンに書き込み
    const transaction = await contract.methods
      .addEntry(selectedColors.value, comments.value, stamps.value, happiness.value, Date.now())
      .send({ from: props.user.eth_address, gas: 3000000 });

    console.log('Transaction hash:', transaction.transactionHash);
    // トランザクションが完了した後の処理を追加
    shouldFetchData.value = true;
    sessionStorage.setItem('shouldFetchData', true );
    router.get('/diary');
  } catch (error) {
    console.error('Error submitting data:', error);
    // エラーメッセージの表示など、エラー処理
    isLoading.value = false;
  }

};

</script>

<template>
  <DefaultLayout title="MoodTracker">
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        MoodTracker
      </h2>
    </template>
    <div class="">
      <TodayColors :colors="selectedColors" @removeColor="removeColor" :colorlock="colorlock"/>
      <div v-if="showDiary == true">
        <Diary
          :colors="selectedColors"
          :comments="comments"
          :stamps="stamps"
          @selectHappiness="selectHappiness"
          @updateComment="updateComment"
          @updateStamp="updateStamp"
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
    <vue-element-loading
      :active="isLoading"
      spinner="bar-fade-scale"
      color="#FF6700"
      :color="{backgroundColor}"
      background-color="#FFFFFF"
     />
  </DefaultLayout>
</template>
