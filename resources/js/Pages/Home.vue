<script setup>
//import AppLayout from '@/Layouts/Default.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
</script>


<template>
    <Head title="Home" />
    <div class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center px-8">
        <!-- ロゴ画像、ヘッダー -->
        <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col justify-center items-center pt-6 sm:pt-0">
                <img src="/images/soulpalette.png" class="block h-24 w-auto" alt="Logo">
                <h1 class="text-1xl font-bold mt-4 text-center">Welcome to the expressive<br> dialogue system</h1>
            </div>
        </div>
        <div class="mx-auto max-w my-5">
          <div class="flex h-50 max-w-md items-center justify-evenly colors">
            <div class="h-30 w-30 rounded bg-blue-400 mx-2"></div>
            <div class="h-30 w-30 rounded bg-yellow-400 mx-2"></div>
            <div class="h-30 w-30 rounded bg-green-400 mx-2"></div>
            <div class="h-30 w-30 rounded bg-purple-400 mx-2"></div>
          </div>

        </div>
        <!-- ナビゲーション -->
        <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
            <ul class="navi">
                <li class="items-center">
                    <Link :href="route('moodtracker')">mood tracker</Link>
                </li>
                <li>
                  <Link>mood chat</Link>
                </li>
                <li><Link>expressive counseling</Link></li>
            </ul>
        </div>
    </div>
</template>

<style>
ul.navi li {
  border: 1px solid #ccc;
  height: 2em;
  margin: 10px auto;
  padding: 5px;
  text-align: center;
}
.colors div {
  border: 1px solid #ccc;
  width: 30px;
  height: 30px;
}
</style>
