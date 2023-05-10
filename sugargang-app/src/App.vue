<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
</script>

<template>
  <HeaderComponent />
  <RouterView />
</template>

<style>
body {
  font-family: var(--font-family);
  background-color: #f3f5f6;
}
</style>
