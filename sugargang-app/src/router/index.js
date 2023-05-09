import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '@/views/products/ProductsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/products',
      name: 'Products',
      component: ProductsView
    },
    {
      path: '/:catchAll(.*)*',
      redirect: '/products'
    }
  ]
})

export default router
