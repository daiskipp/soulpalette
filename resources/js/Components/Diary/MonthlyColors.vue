<script setup>
import { ref, watchEffect, defineProps } from "vue";
import moment from "moment";
import MonthlyDay from "@/Components/Diary/MonthlyDay.vue";

const props = defineProps({
  monthly: Object,
});

const calendar = ref([]);
const thisMonth = ref('');

watchEffect(() => {
  const monthlyData = [...new Set(props.monthly)];
  calendar.value = createCalendar(moment().startOf("month"), monthlyData);
  thisMonth.value = moment().format('MMMM YYYY');
});

// カレンダーを作成
function createCalendar(date, monthly) {
  const calendar = [];
  const startOfWeek = date.clone().startOf("week");
  const endOfWeek = date.clone().endOf("month").endOf("week");
  let currentDate = startOfWeek.clone();
  while (currentDate.isSameOrBefore(endOfWeek, "day")) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const entry = monthly.find((entry) => entry.date == currentDate.format('YYYY-MM-DD'));
      week.push({
        month: currentDate.month() + 1,
        day: currentDate.date(),
        entry: entry,
        color1: entry ? entry.colors[0] : '',
      });
      currentDate.add(1, "day");
    }
    calendar.push('week', week);
  }

  return calendar;
}


</script>

<template>
  <!-- component -->
  <div class="flex items-center justify-center py-8 px-4">
    <div class="max-w-sm w-full">
      <div class="md:p-8 p-5 bg-white rounded-t">
        <div class="text-center justify-between">
          <span
            tabindex="0"
            class="focus:outline-none text-base font-bold "
            >
            {{ thisMonth }}
          </span>
          <!--
          <div class="flex items-center">
            <button
              aria-label="calendar backward"
              class="focus:text-gray-400 hover:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-chevron-left"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="15 6 9 12 15 18" />
              </svg>
            </button>
            <button
              aria-label="calendar forward"
              class="focus:text-gray-400 hover:text-gray-400 ml-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-chevron-right"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
          -->
        </div>
        <div class="flex items-center justify-between pt-1 overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr>
                <th>
                  <div class="w-full flex justify-center">
                    <p class="text-base font-medium text-center">Mo</p>
                  </div>
                </th>
                <th>
                  <div class="w-full flex justify-center">
                    <p class="text-base font-medium text-center">Tu</p>
                  </div>
                </th>
                <th>
                  <div class="w-full flex justify-center">
                    <p class="text-base font-medium text-center">We</p>
                  </div>
                </th>
                <th>
                  <div class="w-full flex justify-center">
                    <p class="text-base font-medium text-center">Th</p>
                  </div>
                </th>
                <th>
                  <div class="w-full flex justify-center">
                    <p class="text-base font-medium text-center">Fr</p>
                  </div>
                </th>
                <th>
                  <div class="w-full flex justify-center">
                    <p class="text-base font-medium text-center">Sa</p>
                  </div>
                </th>
                <th>
                  <div class="w-full flex justify-center">
                    <p class="text-base font-medium text-center">Su</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="week in calendar"
                :key="week[0].month + '-' + week[0].day"
              >
                <td v-for="day in week" :key="day.month + '-' + day.day">
                  <div class="w-full h-full" v-if="day.color1">
                    <MonthlyDay :dayitem="day" />
                  </div>

                  <div v-else
                    class="px-2 py-2 cursor-pointer flex w-full justify-center rounded-full"
                  >
                    <p class="text-base dark:text-black-100 text-blrack-800">{{ day.day }}</p>
                  </div>

                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
