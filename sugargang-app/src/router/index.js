import { createRouter, createWebHistory } from 'vue-router'
import AllProductsView from '@/views/products/AllProductsView.vue'
import ProductDetailView from '@/views/products/ProductDetailView.vue'
import ProductsChartView from '@/views/products/ProductsChartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/products',
      name: 'All Products',
      component: AllProductsView
    },
    {
      path: '/product/:id',
      name: 'Product Detail',
      component: ProductDetailView
    },
    {
      path: '/products/chart',
      name: 'Products Chart',
      component: ProductsChartView
    },
    {
      path: '/:catchAll(.*)*',
      redirect: '/products'
    }
  ]
})

export default router
