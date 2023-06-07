<script setup>
import { defineProps, ref, defineEmits } from "vue";
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";

const props = defineProps({
  index: Number,
  color: String,
  comment: String,
});

const emit = defineEmits(["update"]);
const comment = ref("");

const onChangeComment = (text) => {
  console.log(text);
  comment.value = text;
  emit('updateComment', props.index, comment.value);
};
</script>

<template>
  <div>
    <div class="w-full px-3">
      Prease write your mood.
      <EmojiPicker
        pickerType="textarea"
        mode="append"
        class="textarea textarea-bordered h-24 w-full"
        :style="{ backgroundColor: color }"
        placeholder="Prease write your mood."
        @update:text="onChangeComment"
      />
    </div>
  </div>
</template>
