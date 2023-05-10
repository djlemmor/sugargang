<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const gotoProductsPage = () => {
  router.push('/products')
}
</script>

<template>
  <div class="py-2 px-4 border-bottom-1 flex justify-content-between">
    <p class="text-4xl font-bold text-primary cursor-pointer" @click="gotoProductsPage">
      SugarGang
    </p>
    <ul class="flex align-content-center justify-content-center list-none text-xl font-bold gap-4">
      <li class="align-self-center">
        <RouterLink :to="{ name: 'All Products' }" class="no-underline text-black-alpha-90"
          >Products</RouterLink
        >
      </li>
      <li class="align-self-center">
        <RouterLink :to="{ name: 'Products Chart' }" class="no-underline text-black-alpha-90"
          >Chart</RouterLink
        >
      </li>
    </ul>
  </div>
</template>

<style>
.router-link-active {
  color: var(--pink-400) !important;
}
</style>
