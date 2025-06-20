<template>
  <div class="select-none flex flex-col relative overflow-auto h-full">
    <!-- Week Header -->
    <div class="flex sticky top-0 bg-card z-10 border-b mb-3">
      <div class="w-12"></div>
      <div
        v-for="(date, i) in headerDays"
        :key="date.toString()"
        :class="[
          'text-center flex-1 gap-1 pb-2 text-sm text-muted-foreground flex items-center justify-center',
          { 'text-muted-foreground/50': [0, 6].includes(i) },
        ]"
      >
        {{ format(date, 'E', { locale: calendar.locale.value }) }}
        <span
          :class="[
            'h-6 grid place-content-center',
            {
              'bg-primary text-primary-foreground rounded-full size-6': isToday(date),
            },
          ]"
        >
          {{ format(date, 'd') }}
        </span>
      </div>
    </div>

    <!-- Week Grid -->
    <div class="flex flex-1">
      <!-- Time Table -->
      <div class="w-fit">
        <TimeTable />
      </div>

      <!-- Days Grid -->
      <div class="grid grid-cols-7 flex-1">
        <div
          v-for="(hours, i) in weekDates"
          :key="hours[0].toString()"
          :class="[
            'h-full text-sm text-muted-foreground border-l first:border-l-0',
            { 'bg-muted/50': [0, 6].includes(i) },
          ]"
        >
          <EventGroup
            v-for="hour in hours"
            :key="hour.toString()"
            :hour="hour"
            :events="calendar.events.value"
            @event-click="handleEventClick"
          />
        </div>
      </div>
    </div>
  </div>
  <EventDialog
    v-model:open="dialogOpen"
    :date="selectedDate"
    :event="selectedEvent"
    @save="handleEventSave"
  />
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
import { format, isToday } from 'date-fns'
import type { UseCalendarReturn } from '@/composables/useCalendar'
import type { CalendarEvent } from '@/lib/fullcalendar'
import { getWeekDates, getHeaderDays } from '@/lib/fullcalendar'
import { useEventDialog } from '@/composables/useEventDialog'

const calendar = inject<UseCalendarReturn>('calendar')!
const { dialogOpen, selectedDate, selectedEvent, openDialog, closeDialog } = useEventDialog()

const weekDates = computed(() => getWeekDates(calendar.date.value))
const headerDays = computed(() => getHeaderDays(calendar.date.value))

const handleEventClick = (event: CalendarEvent) => {
  openDialog(event.start, event)
}

const handleEventSave = (event: Partial<CalendarEvent>) => {
  if (event.id) {
    const index = calendar.events.value.findIndex((e) => e.id === event.id)
    if (index !== -1) {
      calendar.events.value[index] = { ...calendar.events.value[index], ...event }
    }
  } else {
    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      ...event,
    } as CalendarEvent
    calendar.events.value.push(newEvent)
  }
  closeDialog()
}
</script>
