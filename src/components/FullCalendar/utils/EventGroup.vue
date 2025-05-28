<template>
  <div class="event-group h-20 border-t last:border-b relative">
    <div
      v-for="event in hourEvents"
      :key="event.id"
      :class="[
        'absolute cursor-pointer transition-colors hover:brightness-110',
        dayEventVariants({ variant: event.color }),
      ]"
      :style="{
        top: `${startPosition(event)}%`,
        height: `${eventHeight(event)}%`,
      }"
      @click="handleEventClick(event)"
    >
      <div class="truncate">{{ event.title }}</div>
      <div class="text-xs opacity-75">
        {{ format(event.start, 'HH:mm') }} - {{ format(event.end, 'HH:mm') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { format, differenceInMinutes, isSameHour } from 'date-fns'
import type { CalendarEvent } from '@/components/FullCalendar/utils/fullcalendar'
import { dayEventVariants } from '@/components/FullCalendar/utils/fullcalendar'

interface Props {
  events: CalendarEvent[]
  hour: Date
}

type Emits = {
  'event-click': [event: CalendarEvent]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const hourEvents = computed(() => {
  return props.events.filter((event) => isSameHour(event.start, props.hour))
})

const startPosition = (event: CalendarEvent): number => {
  return (event.start.getMinutes() / 60) * 100
}

const eventHeight = (event: CalendarEvent): number => {
  const durationInMinutes = differenceInMinutes(event.end, event.start)
  return Math.max((durationInMinutes / 60) * 100, 10) // Minimum height of 10%
}

const handleEventClick = (event: CalendarEvent) => {
  emit('event-click', event)
}
</script>

<style scoped>
.event-group {
  @apply select-none;
}
</style>
