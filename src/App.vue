<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import FullCalendar from '@/components/FullCalendar/FullCalendar.vue'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'

const { toggleTheme, isDark } = useTheme()
</script>

<template>
  <DefaultLayout>
    <template #header>
      <div class="container mx-auto px-4 py-4">
        <NavigationMenu class="flex items-center justify-between">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink class="text-xl font-semibold"> Calendar App </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="#" class="text-sm hover:text-primary">
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#" class="text-sm hover:text-primary">
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="ghost" size="icon" @click="toggleTheme">
                <Sun v-if="isDark()" class="h-5 w-5" />
                <Moon v-else class="h-5 w-5" />
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </template>

    <FullCalendar />

    <template #footer>
      <div class="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
        <p>© {{ new Date().getFullYear() }} Calendar App. All rights reserved.</p>
        <p class="mt-2">Built with Vue 3 and Tailwind CSS</p>
      </div>
    </template>
  </DefaultLayout>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
