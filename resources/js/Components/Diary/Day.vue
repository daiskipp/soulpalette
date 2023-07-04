<script setup>
import { ref, defineProps } from 'vue'
const open = ref(false)

const props = defineProps({
  entry: Object,
  date: String,
});

</script>

<template>
  <div>
  <div class="mx-auto mt-10">
    <div v-for="comment in entry.comments" key="comment">
      {{ comment }}
    </div>
  </div>

</div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
