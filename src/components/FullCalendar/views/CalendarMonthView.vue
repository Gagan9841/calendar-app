<template>
  <div class="select-none h-full flex flex-col">
    <!-- Weekday Headers -->
    <div class="grid grid-cols-7 justify-items-center gap-px sticky top-0 bg-background border-b">
      <div
        v-for="(day, i) in weekDays"
        :key="day"
        :class="[
          'mb-2 text-right text-sm text-muted-foreground pr-2',
          { 'text-muted-foreground/50': [0, 6].includes(i) },
        ]"
      >
        {{ day }}
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="grid overflow-hidden -mt-px flex-1 auto-rows-fr p-px grid-cols-7 gap-px">
      <div
        v-for="date in monthDates"
        :key="date.toString()"
        @click="() => dateClicked(date)"
        :class="[
          'hover:bg-muted/50 ring-1 p-2 text-sm cursor-pointer ring-border overflow-auto',
          'flex flex-col items-center justify-start',
          'md:h-20 md:items-center md:justify-center',
          { 'text-muted-foreground/50': !isSameMonth(calendar.date.value, date) },
          { 'bg-accent text-accent-foreground': isToday(date) },
        ]"
      >
        <!-- Date Number -->
        <span
          :class="[
            'size-6 grid place-items-center rounded-full mb-1',
            'md:mb-0 md:size-8 md:text-base',
            { 'bg-primary text-primary-foreground': isToday(date) },
          ]"
        >
          {{ format(date, 'd') }}
        </span>

        <!-- Events for this date -->
        <div
          v-for="event in getEventsForDate(date)"
          :key="event.id"
          class="px-1 rounded text-sm flex items-center gap-1 cursor-pointer hover:bg-muted/50"
          @click="handleEventClick(event)"
        >
          <div :class="['shrink-0', monthEventVariants({ variant: event.color })]" />
          <span class="flex-1 truncate">{{ event.title }}</span>
          <time class="tabular-nums text-muted-foreground/50 text-xs">
            {{ format(event.start, 'HH:mm') }}
          </time>
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
import { format, isSameMonth, isToday } from 'date-fns'
import type { UseCalendarReturn } from '@/composables/useCalendar'
import type { CalendarEvent } from '@/lib/fullcalendar'
import { useEventDialog } from '@/composables/useEventDialog'
import {
  getDaysInMonth,
  generateWeekdays,
  monthEventVariants,
  filterEventsByDate,
} from '@/lib/fullcalendar'

const emit = defineEmits<{
  'date-clicked': [date: Date]
}>()

const calendar = inject<UseCalendarReturn>('calendar')!
const { dialogOpen, selectedDate, selectedEvent, openDialog, closeDialog } = useEventDialog()

const monthDates = computed(() => getDaysInMonth(calendar.date.value))
const weekDays = computed(() => generateWeekdays(calendar.locale.value))

const getEventsForDate = (date: Date): CalendarEvent[] => {
  return filterEventsByDate(calendar.events.value, date)
}

const handleEventClick = (event: CalendarEvent) => {
  openDialog(event.start, event)
}

const dateClicked = (date: Date) => {
  emit('date-clicked', date)
  openDialog(date)
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
