<script setup>
import { onMounted, ref, computed } from 'vue'
import { getAllProducts } from '@/services/product-service.js'
import Chart from 'primevue/chart'
import ProgressSpinner from 'primevue/progressspinner'

const products = ref([])
const loadedAPI = ref(false)

onMounted(() => {
  loadedAPI.value = false
  getAllProducts()
    .then((data) => {
      products.value = data
      loadedAPI.value = true
      console.log('products', products.value)
    })
    .catch((error) => {
      alert('Something went wrong.')
      console.error('Error fetching products:', error)
    })
  setupChart()
})

const getRandomNumber = () => {
  return products.value.map(() => {
    return Math.floor(Math.random() * 100) + 1
  })
}

const calcLabels = () => {
  return products.value.map((product) => {
    return product.product.title
  })
}

const chartData = computed(() => {
  return {
    labels: calcLabels(),
    datasets: [
      {
        label: 'Quantity',
        data: getRandomNumber(),
        backgroundColor: '#6366F1',
        borderColor: '#000',
        borderWidth: 1
      }
    ]
  }
})

const chartOptions = ref({
  scales: {
    y: {
      beginAtZero: true
    }
  },
  responsive: true,
  maintainAspectRatio: false
})

const chartWidth = ref(0)
const chartHeight = ref(0)
const chartContainer = ref(null)

const resizeChart = () => {
  chartWidth.value = chartContainer.value.offsetWidth
  chartHeight.value = chartContainer.value.offsetHeight
}

const setupChart = () => {
  chartWidth.value = chartContainer.value.offsetWidth
  chartHeight.value = chartContainer.value.offsetHeight
  resizeChart()
}
</script>
<template>
  <div class="card flex justify-content-center" v-if="!loadedAPI">
    <ProgressSpinner />
  </div>
  <div ref="chartContainer" class="card mt-8 chart-container" v-show="loadedAPI">
    <Chart
      type="bar"
      :data="chartData"
      :options="chartOptions"
      :width="chartWidth"
      :height="chartHeight"
    />
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 100%;
}
</style>
