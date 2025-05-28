<template>
  <Button size="icon" variant="outline" @click="handleClick">
    <slot />
  </Button>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { Button } from '@/components/ui/button'
import type { UseCalendarReturn } from '@/composables/useCalendar'

const calendar = inject<UseCalendarReturn>('calendar')!

const handleClick = () => {
  calendar.navigateNext()
}
</script>
