<template>
  <div class="layout">
    <div class="aurora" aria-hidden="true"></div>
    <a class="skip-link" href="#main">Skip to content</a>
    <HeaderComponent class="site-header glass" />
    <main id="main" class="content">
      <slot />
    </main>
    <FooterComponent class="site-footer glass" />
  </div>
</template>

<script setup lang="ts">
import HeaderComponent from './header.vue'
import FooterComponent from './footer.vue'
import '~/assets/layouts/default.css'

const route = useRoute()

const pageTitle = computed(() => {
  const routeName = route.name?.toString() || route.path.split('/').pop() || 'Home'
  return routeName.charAt(0).toUpperCase() + routeName.slice(1).replace('-', ' ')
})

useHead({
  title: `${pageTitle.value} | Insurance Integration App`
})
</script>