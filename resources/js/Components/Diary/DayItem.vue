<script setup>
import { defineProps, watchEffect, ref, defineEmits } from "vue";
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  isVisible: Boolean,
  date: String,
  colors: Array,
  happiness: Number,
  comments: Array,
  stamps: Array,
});

const id = ref(uuidv4()); // 識別子を生成

const emit = defineEmits(["closeModal"]);

const close = () => {
  emit("closeModal", id.value);
};
console.log("visibility", props.isVisible);
</script>
<template>
  <teleport to="#app">
      <div v-show="isVisible" class="fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster" style="background: rgba(0,0,0,.7);">
        <div class="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div class="modal-content py-4 text-left px-6">
            <!--Title-->
            <div class="flex justify-between items-center pb-3">
              <p class="text-2xl font-bold">{{ date }}</p>
              <div class="modal-close cursor-pointer z-50" @click="close">
                <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
                  </path>
                </svg>
              </div>
            </div>
            <!--Body-->
            <div class="my-5">
              <div class="modal-content">
                <div v-for="(color, index) in colors" :key="index">
                  <div v-if="color" class="mt-10 p-5 rounded-md flex" :style="{ backgroundColor: [color] }">
                    <span class="text-5xl basis-1/4">{{ stamps[index] }}</span>
                    <p class="bg-neutral-50 p-4 basis-3/4 rounded-md text-left">
                      {{ comments[index] }}
                    </p>
                  </div>
                </div>
              </div>
              <!--Footer-->
              <div class="justify-end pt-2 items-center text-center">
                <button class="mx-auto btn btn-sm rounded-lg text-black hover:bg-gray-300" @click="close">close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </teleport>
</template>
<style>
		.animated {
			-webkit-animation-duration: 1s;
			animation-duration: 1s;
			-webkit-animation-fill-mode: both;
			animation-fill-mode: both;
		}

		.animated.faster {
			-webkit-animation-duration: 500ms;
			animation-duration: 500ms;
		}

		.fadeIn {
			-webkit-animation-name: fadeIn;
			animation-name: fadeIn;
		}

		.fadeOut {
			-webkit-animation-name: fadeOut;
			animation-name: fadeOut;
		}

		@keyframes fadeIn {
			from {
				opacity: 0;
			}

			to {
				opacity: 1;
			}
		}

		@keyframes fadeOut {
			from {
				opacity: 1;
			}

			to {
				opacity: 0;
			}
		}
	</style>

