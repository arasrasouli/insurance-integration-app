<template>
  <client-only>
    <header class="header">
      <div class="container">
      <h1 class="logo">Insurance Integration App :: {{ pageTitle }}</h1>
        <nav class="nav" aria-label="Main navigation">
          <NuxtLink to="/" class="nav-link">Home</NuxtLink>
          <NuxtLink to="/fall" class="nav-link">Falls</NuxtLink>
          <div class="buttons">
            <NuxtLink to="" class="button">Login</NuxtLink>
          </div>
        </nav>
      </div>
    </header>
  </client-only>
</template>

<script setup lang="ts">
import '~/assets/layouts/header.css'

const route = useRoute()

const pageTitle = computed(() => {
  const routeName = route.name?.toString() || route.path.split('/').pop() || 'Home'
  return routeName.charAt(0).toUpperCase() + routeName.slice(1).replace('-', ' ')
})
</script>