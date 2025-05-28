## Usage

### Basic Usage

```vue
<template>
  <FullCalendar
    :events="events"
    :default-date="new Date()"
    view="month"
    @event-click="handleEventClick"
  />
</template>

<script setup>
import FullCalendar from './components/FullCalendar/FullCalendar.vue'

const events = [
  {
    id: '1',
    title: 'Meeting',
    start: new Date(2024, 11, 15, 10, 0),
    end: new Date(2024, 11, 15, 11, 0),
    color: 'blue'
  }
]

const handleEventClick = (event) => {
  console.log('Event clicked:', event)
}
</script>
```

### Advanced Usage

```vue
<template>
  <FullCalendar
    ref="calendar"
    :events="events"
    :default-date="defaultDate"
    :view="currentView"
    :locale="locale"
    :enable-hotkeys="enableHotkeys"
    @change-view="onViewChange"
    @event-click="onEventClick"
  />
</template>

<script setup>
import { ref } from 'vue'
import { enGB } from 'date-fns/locale/en-GB'
import FullCalendar from './components/FullCalendar/FullCalendar.vue'

const calendar = ref()
const currentView = ref('week')
const defaultDate = ref(new Date())
const locale = ref(enGB)
const enableHotkeys = ref(true)

// Programmatic control
const goToNextMonth = () => {
  calendar.value.navigateNext()
}

const switchToWeekView = () => {
  calendar.value.setView('week')
}

const addEvent = (event) => {
  const currentEvents = calendar.value.events
  calendar.value.setEvents([...currentEvents, event])
}
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultDate` | `Date` | `new Date()` | Initial date to display |
| `events` | `CalendarEvent[]` | `[]` | Array of calendar events |
| `view` | `'day' \| 'week' \| 'month' \| 'year'` | `'month'` | Initial view mode |
| `locale` | `Locale` | `enUS` | Date-fns locale object |
| `enableHotkeys` | `boolean` | `true` | Enable keyboard shortcuts |
| `onChangeView` | `(view: View) => void` | - | View change callback |
| `onEventClick` | `(event: CalendarEvent) => void` | - | Event click callback |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `change-view` | `View` | Emitted when view changes |
| `event-click` | `CalendarEvent` | Emitted when event is clicked |

## Methods (via ref)

| Method | Parameters | Description |
|--------|------------|-------------|
| `setView` | `view: View` | Change calendar view |
| `setDate` | `date: Date` | Navigate to specific date |
| `setEvents` | `events: CalendarEvent[]` | Update events array |
| `navigateNext` | - | Go to next period |
| `navigatePrev` | - | Go to previous period |
| `goToToday` | - | Navigate to today |

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `M` | Switch to Month view |
| `W` | Switch to Week view |
| `D` | Switch to Day view |
| `Y` | Switch to Year view |
| `T` | Go to Today |
| `←` | Previous period |
| `→` | Next period |

## Customization

### Event Colors

Events support predefined color variants:
- `default` (primary theme color)
- `blue`
- `green` 
- `pink`
- `purple`

### Styling

The component uses Tailwind CSS classes and can be customized by:
1. Modifying the variant definitions in `fullcalendar.ts`
2. Overriding CSS classes in your components
3. Using CSS custom properties for theme colors

