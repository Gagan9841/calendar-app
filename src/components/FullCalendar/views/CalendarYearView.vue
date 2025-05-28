<template>
  <div class="select-none grid grid-cols-4 gap-10 overflow-auto h-full p-4">
    <div v-for="(days, monthIndex) in months" :key="days[0].toString()" class="min-h-0">
      <!-- Month Name -->
      <span class="text-xl font-semibold mb-4 block">
        {{ format(setMonth(calendar.date.value, monthIndex), 'MMMM') }}
      </span>

      <!-- Weekday Headers -->
      <div class="grid grid-cols-7 gap-2 my-5">
        <div v-for="day in weekDays" :key="day" class="text-center text-xs text-muted-foreground">
          {{ day }}
        </div>
      </div>

      <!-- Month Grid -->
      <div class="grid gap-x-2 text-center grid-cols-7 text-xs tabular-nums">
        <div
          v-for="date in days"
          :key="date.toString()"
          :class="{
            'text-muted-foreground': getMonth(date) !== monthIndex,
          }"
        >
          <div
            :class="[
              'aspect-square grid place-content-center size-full tabular-nums cursor-pointer hover:bg-muted/50 rounded',
              {
                'bg-primary text-primary-foreground rounded-full':
                  isSameDay(calendar.today.value, date) && getMonth(date) === monthIndex,
              },
            ]"
            @click="handleDateClick(date)"
          >
            {{ format(date, 'd') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
import { format, setMonth, getMonth, isSameDay } from 'date-fns'
import type { UseCalendarReturn } from '@/composables/useCalendar'
import { getYearMonths, generateWeekdays } from '@/components/FullCalendar/utils/fullcalendar'

const calendar = inject<UseCalendarReturn>('calendar')!

const months = computed(() => getYearMonths(calendar.date.value))
const weekDays = computed(() => generateWeekdays(calendar.locale.value))

const handleDateClick = (date: Date) => {
  calendar.setDate(date)
  calendar.setView('day')
}
</script>
