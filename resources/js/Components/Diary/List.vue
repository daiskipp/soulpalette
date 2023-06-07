<script setup>
import Item from "@/Components/Diary/Item.vue";

//diaryListの中身は、日記のサンプルを10個格納した配列
const diaryList = [
  {
    id: 1,
    title: '今日の日記',
    body: '今日はいい天気でした。',
    created_at: '2021-01-01 00:00:00',
    updated_at: '2021-01-01 00:00:00',
  },
  {
    id: 2,
    title: '今日の日記',
    body: '今日はいい天気でした。',
    created_at: '2021-01-01 00:00:00',
    updated_at: '2021-01-01 00:00:00',
  },
  {
    id: 3,
    title: '今日の日記',
    body: '今日はいい天気でした。',
    created_at: '2021-01-01 00:00:00',
    updated_at: '2021-01-01 00:00:00',
  },
  {
    id: 4,
    title: '今日の日記',
    body: '今日はいい天気でした☀️',
    created_at: '2021-01-01 00:00:00',
    updated_at: '2021-01-01 00:00:00',
  },
  {
    id: 5,
    title: '今日の日記',
    body: '今日はいい天気でした。',
    created_at: '2021-01-01 00:00:00',
    updated_at: '2021-01-01 00:00:00',
  },
  {
    id: 6,
    title: '今日の日記',
    body: '今日はいい天気でした。🌞',
    created_at: '2021-01-01 00:00:00',
    updated_at: '2021-01-01 00:00:00',
  },
  {
    id: 7,
    title: '今日の日記',
    body: '今日はいい天気でした。',
    created_at: '2021-01-01 00:00:00',
    updated_at: '2021-01-01 00:00:00',
  },
];


</script>

<template>
  <div class="">
    <Item
      v-for="(item, index) in diaryList"
      :item="item"
      :index="index"
      :key="item.id"
    />
  </div>
</template>
