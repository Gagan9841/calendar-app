import { type VariantProps, cva } from 'class-variance-authority'
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  format,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
  subYears,
  setMonth,
  getMonth,
  isSameDay,
  isSameMonth,
  isToday,
  isSameHour,
  setHours,
  differenceInMinutes,
  type Locale
} from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'

export type View = 'day' | 'week' | 'month' | 'year'

export interface CalendarEvent {
  id: string
  start: Date
  end: Date
  title: string
  color?: VariantProps<typeof monthEventVariants>['variant']
}

export interface CalendarProps {
  defaultDate?: Date
  events?: CalendarEvent[]
  view?: View
  locale?: Locale
  enableHotkeys?: boolean
  onChangeView?: (view: View) => void
  onEventClick?: (event: CalendarEvent) => void
}

export interface CalendarContext {
  view: View
  setView: (view: View) => void
  date: Date
  setDate: (date: Date) => void
  events: CalendarEvent[]
  locale: Locale
  setEvents: (events: CalendarEvent[]) => void
  onChangeView?: (view: View) => void
  onEventClick?: (event: CalendarEvent) => void
  enableHotkeys?: boolean
  today: Date
}

// Variant definitions for styling
export const monthEventVariants = cva('size-2 rounded-full', {
  variants: {
    variant: {
      default: 'bg-primary',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      pink: 'bg-pink-500',
      purple: 'bg-purple-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const dayEventVariants = cva('font-bold border-l-4 rounded p-2 text-xs', {
  variants: {
    variant: {
      default: 'bg-muted/30 text-muted-foreground border-muted',
      blue: 'bg-blue-500/30 text-blue-600 border-blue-500',
      green: 'bg-green-500/30 text-green-600 border-green-500',
      pink: 'bg-pink-500/30 text-pink-600 border-pink-500',
      purple: 'bg-purple-500/30 text-purple-600 border-purple-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

// Utility functions
export const getDaysInMonth = (date: Date): Date[] => {
  const startOfMonthDate = startOfMonth(date)
  const startOfWeekForMonth = startOfWeek(startOfMonthDate, {
    weekStartsOn: 0,
  })

  let currentDate = startOfWeekForMonth
  const calendar: Date[] = []

  while (calendar.length < 42) {
    calendar.push(new Date(currentDate))
    currentDate = addDays(currentDate, 1)
  }

  return calendar
}

export const generateWeekdays = (locale: Locale): string[] => {
  const daysOfWeek: string[] = []
  for (let i = 0; i < 7; i++) {
    const date = addDays(startOfWeek(new Date(), { weekStartsOn: 0 }), i)
    daysOfWeek.push(format(date, 'EEEEEE', { locale }))
  }
  return daysOfWeek
}

export const getWeekDates = (date: Date): Date[][] => {
  const start = startOfWeek(date, { weekStartsOn: 0 })
  const weekDates: Date[][] = []

  for (let i = 0; i < 7; i++) {
    const day = addDays(start, i)
    const hours = [...Array(24)].map((_, i) => setHours(day, i))
    weekDates.push(hours)
  }

  return weekDates
}

export const getHeaderDays = (date: Date): Date[] => {
  const daysOfWeek: Date[] = []
  for (let i = 0; i < 7; i++) {
    const result = addDays(startOfWeek(date, { weekStartsOn: 0 }), i)
    daysOfWeek.push(result)
  }
  return daysOfWeek
}

export const getYearMonths = (date: Date): Date[][] => {
  return Array.from({ length: 12 }).map((_, i) => {
    return getDaysInMonth(setMonth(date, i))
  })
}

export const navigateDate = (currentDate: Date, view: View, direction: 'next' | 'prev'): Date => {
  const operation = direction === 'next' ? 1 : -1

  switch (view) {
    case 'day':
      return direction === 'next' ? addDays(currentDate, 1) : subDays(currentDate, 1)
    case 'week':
      return direction === 'next' ? addWeeks(currentDate, 1) : subWeeks(currentDate, 1)
    case 'month':
      return direction === 'next' ? addMonths(currentDate, 1) : subMonths(currentDate, 1)
    case 'year':
      return direction === 'next' ? addYears(currentDate, 1) : subYears(currentDate, 1)
    default:
      return currentDate
  }
}

export const formatDateForView = (date: Date, view: View): string => {
  switch (view) {
    case 'day':
      return format(date, 'dd MMMM yyyy')
    default:
      return format(date, 'MMMM yyyy')
  }
}

export const filterEventsByDate = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  return events.filter(event => isSameDay(event.start, date))
}

export const filterEventsByHour = (events: CalendarEvent[], hour: Date): CalendarEvent[] => {
  return events.filter(event => isSameHour(event.start, hour))
}

export const DEFAULT_LOCALE = enUS
export const DEFAULT_VIEW: View = 'month'
export const DEFAULT_DATE = new Date()
export const DEFAULT_EVENTS: CalendarEvent[] = []