<template>
  <Button size="sm" variant="ghost" :class="{ 'bg-muted': isActive }" @click="handleClick">
    <slot />
  </Button>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
import { Button } from '@/components/ui/button'
import type { UseCalendarReturn } from '@/composables/useCalendar'
import type { View } from '@/components/FullCalendar/utils/fullcalendar'

interface Props {
  view: View
}

const props = defineProps<Props>()
const calendar = inject<UseCalendarReturn>('calendar')!

const isActive = computed(() => calendar.view.value === props.view)

const handleClick = () => {
  calendar.setView(props.view)
}
</script>
