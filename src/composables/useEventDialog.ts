import { ref } from 'vue'
import type { CalendarEvent } from '../lib/fullcalendar'

export function useEventDialog() {
  const dialogOpen = ref(false)
  const selectedDate = ref<Date>(new Date())
  const selectedEvent = ref<CalendarEvent | undefined>()

  const openDialog = (date: Date, event?: CalendarEvent) => {
    selectedEvent.value = event
    selectedDate.value = date
    dialogOpen.value = true
  }

  const closeDialog = () => {
    dialogOpen.value = false
    selectedEvent.value = undefined
  }

  return {
    dialogOpen,
    selectedDate,
    selectedEvent,
    openDialog,
    closeDialog
  }
}
