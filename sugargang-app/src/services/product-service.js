import apiService from '@/services/api-service.js'

export const getProductsService = async () => {
  const data = await apiService.get(`${import.meta.env.VITE_BACKEND}/api/product`)
  return data
}