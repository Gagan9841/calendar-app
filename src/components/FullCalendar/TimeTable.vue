<template>
  <div class="select-none pr-2 w-12">
    <div
      v-for="hour in 25"
      :key="hour - 1"
      class="text-right relative text-xs text-muted-foreground/50 h-20 last:h-0"
    >
      <div
        v-if="now.getHours() === hour - 1"
        class="absolute z-10 left-full translate-x-2 w-dvw h-[2px] bg-red-500"
        :style="{
          top: `${(now.getMinutes() / 60) * 100}%`,
        }"
      >
        <div
          class="size-2 rounded-full bg-red-500 absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
        ></div>
      </div>

      <p class="top-0 -translate-y-1/2">{{ hour === 25 ? 0 : hour - 1 }}:00</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const now = ref(new Date())

let intervalId: number | undefined

onMounted(() => {
  intervalId = setInterval(() => {
    now.value = new Date()
  }, 60000) as unknown as number
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.time-table {
  @apply select-none;
}
</style>
