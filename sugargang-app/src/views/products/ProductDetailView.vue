<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getProductDetail } from '@/services/product-service.js'
import ProgressSpinner from 'primevue/progressspinner'
import Image from 'primevue/image'

const product = ref()
const variants = ref()
const loadedAPI = ref(false)
const route = useRoute()
const router = useRouter()
const bodyHtml = ref()
const words = ref()
const description = ref()
const ingredients = ref()

onMounted(() => {
  loadedAPI.value = false
  getProductDetail(route.params.id)
    .then((data) => {
      console.log('data', data)
      product.value = data.product
      variants.value = data.product.variants[0]
      loadedAPI.value = true
      bodyHtml.value = product.value.body_html
      words.value = bodyHtml.value.split('</p>')
      description.value = words.value[0].replace('<p>', '')
      ingredients.value = words.value[1].replace('<p>', '')
    })
    .catch((error) => {
      alert('Something went wrong.')
      console.error('Error fetching products:', error)
      router.push('/products')
    })
})
</script>
<template>
  <div class="card flex justify-content-center" v-if="!loadedAPI">
    <ProgressSpinner />
  </div>
  <div v-else>
    <div class="flex flex-column md:flex-row gap-2 mt-8">
      <div
        class="w-12 md:w-6 mb-6 md:mb-0 p-4 flex-column align-items-center justify-content-center border-round bg-white border-2 border-primary"
      >
        <Image
          :src="product.image.src"
          :alt="product.title"
          width="500"
          preview
          class="flex justify-content-center"
        />
        <p class="text-center">Click to Zoom In</p>
      </div>
      <div class="w-12 md:w-6 p-4 border-round bg-white border-2 border-primary">
        <p class="m-0 text-3xl font-bold">{{ product.title }}</p>
        <p class="text-xl font-bold">
          Price: <span class="text-primary text-2xl font-normal">€{{ variants.price }}</span>
        </p>
        <p class="text-xl font-bold">
          Unit Price:
          <span class="text-primary text-2xl font-normal">€{{ variants.unit_price }}</span>
        </p>
        <p class="text-xl font-bold">
          Weight:
          <span class="text-primary text-2xl font-normal"
            >{{ variants.weight + variants.weight_unit }}
          </span>
        </p>
        <p class="text-xl font-bold">
          SKU:
          <span class="text-primary text-2xl font-normal">{{ variants.sku }} </span>
        </p>
        <p class="text-xl font-bold">
          Description:
          <span class="text-primary text-2xl font-normal">{{ description }} </span>
        </p>
        <p class="text-xl font-bold">
          Ingredients:
          <span class="text-primary text-2xl font-normal">{{ ingredients }} </span>
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
