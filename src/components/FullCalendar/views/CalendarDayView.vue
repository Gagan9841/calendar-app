<template>
  <div class="select-none flex relative pt-2 overflow-auto h-full">
    <TimeTable />

    <div class="flex-1">
      <EventGroup
        v-for="hour in hours"
        :key="hour.toString()"
        :hour="hour"
        :events="calendar.events.value"
        @event-click="handleEventClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
import { setHours } from 'date-fns'
import type { UseCalendarReturn } from '@/composables/useCalendar'
import type { CalendarEvent } from '@/lib/fullcalendar'

const calendar = inject<UseCalendarReturn>('calendar')!

const hours = computed(() => {
  return [...Array(24)].map((_, i) => setHours(calendar.date.value, i))
})

const handleEventClick = (event: CalendarEvent) => {
  calendar.onEventClick?.(event)
}
</script>
