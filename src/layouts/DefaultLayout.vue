<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b">
      <slot name="header">
        <div class="container mx-auto px-4 py-4">
          <h1 class="text-xl font-semibold">Calendar App</h1>
        </div>
      </slot>
    </header>

    <main class="flex-1 container mx-auto px-4 py-6">
      <slot></slot>
    </main>

    <!-- <footer class="border-t">
      <slot name="footer">
        <div class="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          © {{ new Date().getFullYear() }} Calendar App. All rights reserved.
        </div>
      </slot>
    </footer> -->
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DefaultLayout',
})
</script>
