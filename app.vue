<script setup>
import { THEMES, useThemeStore } from './store/theme'

const themeStore = useThemeStore()
</script>

<template>
  <div :data-theme="themeStore.theme.dark ? THEMES.DARK : THEMES.LIGHT">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<style>
[data-theme="forest"] .btn {
  border-radius: 0.5rem;
}

</style>