import { ref, computed, type Ref, type ComputedRef, onMounted, onUnmounted } from 'vue'
import {
  type CalendarEvent,
  type View,
  type CalendarProps,
  navigateDate,
  DEFAULT_LOCALE,
  DEFAULT_VIEW,
  DEFAULT_DATE,
  DEFAULT_EVENTS,
} from '@/components/FullCalendar/utils/fullcalendar'
import type { Locale } from 'date-fns'

export interface UseCalendarReturn {
  view: Ref<View>
  date: Ref<Date>
  events: Ref<CalendarEvent[]>
  locale: Ref<Locale>
  today: Ref<Date>

  formattedDate: ComputedRef<string>

  setView: (newView: View) => void
  setDate: (newDate: Date) => void
  setEvents: (newEvents: CalendarEvent[]) => void
  navigateNext: () => void
  navigatePrev: () => void
  goToToday: () => void

  onEventClick?: (event: CalendarEvent) => void
  onChangeView?: (view: View) => void
}

export const useCalendar = (props: CalendarProps = {}): UseCalendarReturn => {
  const {
    defaultDate = DEFAULT_DATE,
    events: defaultEvents = DEFAULT_EVENTS,
    view: defaultView = DEFAULT_VIEW,
    locale = DEFAULT_LOCALE,
    enableHotkeys = true,
    onChangeView,
    onEventClick,
  } = props

  const view = ref<View>(defaultView)
  const date = ref<Date>(new Date(defaultDate))
  const events = ref<CalendarEvent[]>([...defaultEvents])
  const localeRef = ref<Locale>(locale)
  const today = ref<Date>(new Date())

  const formattedDate = computed(() => {
    const currentDate = date.value
    const currentView = view.value

    if (currentView === 'day') {
      return currentDate.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    }

    return currentDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
  })

  const setView = (newView: View): void => {
    view.value = newView
    onChangeView?.(newView)
  }

  const setDate = (newDate: Date): void => {
    date.value = new Date(newDate)
  }

  const setEvents = (newEvents: CalendarEvent[]): void => {
    events.value = [...newEvents]
  }

  const navigateNext = (): void => {
    const newDate = navigateDate(date.value, view.value, 'next')
    setDate(newDate)
  }

  const navigatePrev = (): void => {
    const newDate = navigateDate(date.value, view.value, 'prev')
    setDate(newDate)
  }

  const goToToday = (): void => {
    today.value = new Date()
    setDate(today.value)
  }

  const handleKeyPress = (event: KeyboardEvent): void => {
    if (!enableHotkeys) return

    switch (event.key.toLowerCase()) {
      case 'm':
        event.preventDefault()
        setView('month')
        break
      case 'w':
        event.preventDefault()
        setView('week')
        break
      case 'd':
        event.preventDefault()
        setView('day')
        break
      case 'y':
        event.preventDefault()
        setView('year')
        break
      case 't':
        event.preventDefault()
        goToToday()
        break
      case 'arrowright':
        event.preventDefault()
        navigateNext()
        break
      case 'arrowleft':
        event.preventDefault()
        navigatePrev()
        break
    }
  }

  onMounted(() => {
    if (enableHotkeys) {
      document.addEventListener('keydown', handleKeyPress)
    }
  })

  onUnmounted(() => {
    if (enableHotkeys) {
      document.removeEventListener('keydown', handleKeyPress)
    }
  })

  return {
    view,
    date,
    events,
    locale: localeRef,
    today,

    formattedDate,

    setView,
    setDate,
    setEvents,
    navigateNext,
    navigatePrev,
    goToToday,

    onEventClick,
    onChangeView,
  }
}
