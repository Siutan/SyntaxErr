<script setup>
const user = useSupabaseUser()
</script>

<template>
  <div class=" p-2">
    <h1>Welcome to the Home page</h1>
    <div v-if="user">
      <h1>logged in!</h1>
    </div>
    <Auth/>
  </div>
</template>
