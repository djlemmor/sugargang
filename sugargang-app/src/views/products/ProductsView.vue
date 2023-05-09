<script setup>
import { onMounted, ref } from 'vue'
import { getProductsService } from '@/services/product-service.js'
import DataView from 'primevue/dataview'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import ProgressSpinner from 'primevue/progressspinner'
import InputText from 'primevue/inputtext'

const products = ref([])
const originalProducts = ref([])
const layout = ref('grid')
const loadedAPI = ref(false)
const filters = ref('')

onMounted(() => {
  loadedAPI.value = false
  getProductsService()
    .then((data) => {
      products.value = data
      originalProducts.value = [...products.value]
      loadedAPI.value = true
    })
    .catch((error) => {
      alert('Something went wrong.')
      console.error('Error fetching products:', error)
    })
})

const getSeverity = (product) => {
  switch (product) {
    case 'INSTOCK':
      return 'success'

    case 'LOWSTOCK':
      return 'warning'

    case 'OUTOFSTOCK':
      return 'danger'

    default:
      return null
  }
}

const applyFilters = () => {
  const filteredProducts = originalProducts.value.filter((product) =>
    product.product.title.toLowerCase().includes(filters.value.toLowerCase())
  )
  products.value = filteredProducts
}
</script>

<template>
  <div class="card flex justify-content-center" v-if="!loadedAPI">
    <ProgressSpinner />
  </div>
  <div class="card" v-else>
    <DataView :value="products" :layout="layout" paginator :rows="9">
      <template #header>
        <div class="flex justify-content-between flex-column gap-2 md:flex-row">
          <div class="p-input-icon-left w-full md:w-4">
            <i class="pi pi-search"></i>
            <InputText
              v-model="filters"
              placeholder="Search"
              @input="applyFilters"
              class="w-full"
            />
          </div>
          <DataViewLayoutOptions v-model="layout" class="align-self-end" />
        </div>
      </template>
      <template #empty>
        <div class="flex justify-content-center my-4 font-bold">No products found.</div>
      </template>
      <template #loading> Loading products data. Please wait. </template>
      <template #list="slotProps">
        <div class="col-12">
          <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
            <img
              class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
              :src="slotProps.data.product.image.src"
              :alt="slotProps.data.product.title"
            />
            <div
              class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
            >
              <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                <div class="text-2xl font-bold text-900">{{ slotProps.data.product.title }}</div>
                <div class="flex align-items-center gap-3">
                  <Tag value="INSTOCK" :severity="getSeverity('INSTOCK')"></Tag>
                </div>
              </div>
              <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                <span class="text-2xl font-semibold"
                  >€{{ slotProps.data.product.variants[0].price }}</span
                >
                <Button
                  icon="pi pi-shopping-cart"
                  rounded
                  :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
          <div class="p-4 border-1 surface-border surface-card border-round">
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
              <Tag value="INSTOCK" :severity="getSeverity('INSTOCK')"></Tag>
            </div>
            <div class="flex flex-column align-items-center gap-3 py-5">
              <img
                class="w-9 shadow-2 border-round"
                :src="slotProps.data.product.image.src"
                :alt="slotProps.data.product.title"
              />
              <div class="text-2xl font-bold text-900">{{ slotProps.data.product.title }}</div>
            </div>
            <div class="flex align-items-center justify-content-between">
              <span class="text-2xl font-semibold"
                >€{{ slotProps.data.product.variants[0].price }}</span
              >
              <Button
                icon="pi pi-shopping-cart"
                rounded
                :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"
              ></Button>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<style scoped></style>
