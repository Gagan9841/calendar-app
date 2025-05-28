<template>
  <Dialog :open="open" @update:open="onOpenChange">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ isEditing ? 'Edit Event' : 'Add Event' }}</DialogTitle>
        <DialogDescription>
          {{ format(date, 'MMMM d, yyyy') }}
        </DialogDescription>
      </DialogHeader>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <Label for="title">Title</Label>
          <Input id="title" v-model="form.title" placeholder="Event title" required />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="start">Start Time</Label>
            <Input id="start" type="time" v-model="form.startTime" required />
          </div>
          <div class="space-y-2">
            <Label for="end">End Time</Label>
            <Input id="end" type="time" v-model="form.endTime" required />
          </div>
        </div>

        <div class="space-y-2">
          <Label for="description">Description</Label>
          <Input id="description" v-model="form.description" placeholder="Event description" />
        </div>

        <div class="space-y-2">
          <Label for="color">Color</Label>
          <Select v-model="form.color">
            <SelectTrigger>
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="yellow">Yellow</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" @click="onOpenChange(false)"> Cancel </Button>
          <Button type="submit">
            {{ isEditing ? 'Save Changes' : 'Add Event' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { format } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { CalendarEvent } from '../lib/fullcalendar'

const props = defineProps<{
  open: boolean
  date: Date
  event?: CalendarEvent
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'save', event: Partial<CalendarEvent>): void
}>()

const isEditing = computed(() => !!props.event)

const form = ref({
  title: props.event?.title ?? '',
  description: props.event?.description ?? '',
  startTime: props.event ? format(props.event.start, 'HH:mm') : '09:00',
  endTime: props.event ? format(props.event.end, 'HH:mm') : '10:00',
  color: props.event?.color ?? 'default',
})

const onOpenChange = (value: boolean) => {
  emit('update:open', value)
}

const handleSubmit = () => {
  const startDate = new Date(props.date)
  const [startHours, startMinutes] = form.value.startTime.split(':')
  startDate.setHours(parseInt(startHours), parseInt(startMinutes))

  const endDate = new Date(props.date)
  const [endHours, endMinutes] = form.value.endTime.split(':')
  endDate.setHours(parseInt(endHours), parseInt(endMinutes))

  emit('save', {
    id: props.event?.id,
    title: form.value.title,
    description: form.value.description,
    start: startDate,
    end: endDate,
    color: form.value.color,
  })
  onOpenChange(false)
}
</script>
