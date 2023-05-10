import apiService from '@/services/api-service.js'

export const getAllProducts = async () => {
  const data = await apiService.get(`${import.meta.env.VITE_BACKEND}/api/product`)
  return data
}

export const getProductDetail = async (id) => {
  const data = await apiService.get(`${import.meta.env.VITE_BACKEND}/api/product/${id}`)
  return data
}
