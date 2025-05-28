<template>
  <time :datetime="calendar.date.value.toISOString()" class="tabular-nums text-lg font-semibold">
    {{ calendar.formattedDate.value }}
  </time>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { UseCalendarReturn } from '@/composables/useCalendar'

const calendar = inject<UseCalendarReturn>('calendar')!
</script>
