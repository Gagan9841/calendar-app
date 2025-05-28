<template>
  <div
    class="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between p-4 border-b"
  >
    <!-- Navigation Controls -->
    <div class="flex items-center gap-2">
      <CalendarPrevTrigger>
        <ChevronLeft class="h-4 w-4" />
      </CalendarPrevTrigger>

      <CalendarNextTrigger>
        <ChevronRight class="h-4 w-4" />
      </CalendarNextTrigger>

      <CalendarTodayTrigger> Today </CalendarTodayTrigger>
    </div>

    <!-- Current Date Display -->
    <div class="flex-1 flex justify-center">
      <CalendarCurrentDate />
    </div>

    <!-- View Triggers -->
    <div class="flex items-center gap-1">
      <CalendarViewTrigger view="day">Day</CalendarViewTrigger>
      <CalendarViewTrigger view="week">Week</CalendarViewTrigger>
      <CalendarViewTrigger view="month">Month</CalendarViewTrigger>
      <CalendarViewTrigger view="year">Year</CalendarViewTrigger>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
</script>
