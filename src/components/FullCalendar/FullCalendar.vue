<template>
  <div class="full-calendar">
    <CalendarHeader />

    <div class="calendar-content h-full">
      <CalendarDayView v-if="calendar.view.value === 'day'" />
      <CalendarWeekView v-else-if="calendar.view.value === 'week'" />
      <CalendarMonthView v-else-if="calendar.view.value === 'month'" />
      <CalendarYearView v-else-if="calendar.view.value === 'year'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, computed } from 'vue'
import { useCalendar } from '@/composables/useCalendar'
import { type CalendarProps } from '@/components/FullCalendar/utils/fullcalendar'

const props = withDefaults(defineProps<CalendarProps>(), {
  defaultDate: () => new Date(),
  events: () => [],
  view: 'month',
  enableHotkeys: true,
})

const calendar = useCalendar(props)

provide('calendar', calendar)

defineExpose({
  setView: calendar.setView,
  setDate: calendar.setDate,
  setEvents: calendar.setEvents,
  navigateNext: calendar.navigateNext,
  navigatePrev: calendar.navigatePrev,
  goToToday: calendar.goToToday,
  view: computed(() => calendar.view.value),
  date: computed(() => calendar.date.value),
  events: computed(() => calendar.events.value),
})
</script>

<style scoped>
.full-calendar {
  @apply h-full flex flex-col;
}

.calendar-content {
  @apply flex-1 overflow-hidden;
}
</style>
