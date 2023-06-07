<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <Link :href="'/'">
      <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-col justify-center items-center pt-6 sm:pt-0">
                <img src="/images/soulpalette.png" class="block h-24 w-auto" alt="Logo">
                <h1 class="text-1xl font-bold mt-4 text-center">Welcome to the expressive<br> dialogue system</h1>
            </div>
        </div>
    </Link>
</template>
