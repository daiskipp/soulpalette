<script setup>
import { useForm } from '@inertiajs/vue3';
const form = useForm({
   body: null,
})

</script>
<template>
<div class="container mx-auto px-4">
  <form @submit.prevent="form.post('/diary')" class="w-full max-w-lg">
    <div class="flex flex-wrap mb-6">
      <div class="w-full px-3">
        <div className="ratingz ratingz-xs">
          <input type="radio" name="rating-z" className="bg-orange-400" />
          <input type="radio" name="rating-z" className="bg-orange-400" checked />
          <input type="radio" name="rating-x" className="bg-orange-400" />
          <input type="radio" name="rating-z" className="bg-orange-400" />
          <input type="radio" name="rating-4" className="bg-orange-400" />
        </div>
    </div>
    <div class="w-full px-3">
    <textarea
      class="textarea textarea-bordered h-24 w-full"
      placeholder="Prease write your mood."
      v-model.trim="form.body"
    />
    </div>
    <div class="w-full px-3">
    <textarea
      class="textarea textarea-bordered h-24 w-full"
      placeholder="Prease write your mood."
      v-model.trim="form.body"
    />
    </div>
    <div class="w-full px-3">
    <textarea
      class="textarea textarea-bordered h-24 w-full"
      placeholder="Prease write your mood."
      v-model.trim="form.body"
    />
    <textarea
      class="textarea textarea-bordered h-24 w-full"
      placeholder="Prease write your mood."
      v-model.trim="form.body"
    />
    </div>

  </div>
    <div class="w-full px-3 items-center">
      <button type="submit" class="btn" :disabled="form.processing">send</button>
    </div>
  </form>
</div>
</template>
