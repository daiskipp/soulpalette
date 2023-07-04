<script setup>
import { ref, onMounted, watch } from "vue";
//import DefaultLayout from "@/Layouts/Default.vue";



    // ethDataを保存するリアクティブな変数
    const ethData = ref(null);

    onMounted(() => {
      // セッションストレージからethDataを取得
      const storedEthData = sessionStorage.getItem('ethData');
      if (storedEthData) {
        ethData.value = JSON.parse(storedEthData);
      }
      console.log('ethData1', ethData.value);
    });

</script>
<template>
<div class="">
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        test
      </h2>

    <div class="">
      <p>Formatted Eth Data: {{ ethData }}</p>
    </div>
  </div>
</template>
