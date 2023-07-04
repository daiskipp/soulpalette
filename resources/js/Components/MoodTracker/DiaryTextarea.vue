<script setup>
import { defineProps, ref, defineEmits, watch } from "vue";
import Emoji from "@/Components/MoodTracker/Emoji.vue";
import Popper from "vue3-popper";

const props = defineProps({
  index: Number,
  color: String,
  comment: String,
  emoji: String,
});

const emit = defineEmits(["update"]);
const comment = ref("");
const emoji = ref("");


watch(comment, (newValue) => {
  comment.value = newValue;
  emit('updateComment', props.index, comment.value);
});

const emojiClick = (selectemoji) => {
  props.emoji= selectemoji;
  emoji.value = selectemoji;
  emit('updateStamp', props.index, selectemoji);
};
</script>

<template>
  <div>

    <div
      class="w-full px-3 rounded-lg p-2"
      :style="{ backgroundColor: color }"
      >
      <div class="p-1" style="background-color: #FFF;">
        <Popper placement="top">
          <span v-if="emoji">{{ emoji }}</span>
          <span v-else><img src="/images/smileys_people.svg" width="25" height="25" alt=""></span>
          <template #content>
            <Emoji :emoji="emoji" :index="index" @emojiClick="emojiClick"/>
          </template>
        </Popper>
      </div>
      <textarea
        class="textarea textarea-bordered h-24 w-full mx-auto rounded-none"
        placeholder="Prease write your mood."
        v-model="comment"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
