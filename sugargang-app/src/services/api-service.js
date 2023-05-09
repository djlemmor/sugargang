import axios from 'axios'

const getConfig = (config) => {
  let token = localStorage.getItem('token')
  const defaultConfig = token
    ? {
      headers: {
        Authorization: 'Bearer  ' + token + '',
        Accept: 'application/json',
      },
    }
    : {}
  return {
    ...defaultConfig,
    ...config,
  }
}

const get = async (url, config = {}) => {
  try {
    const response = await axios.get(url, getConfig(config))

    if (response.status == 200) {
      console.log(`SUCCESS: ${url}`)
      return response.data
    } else {
      console.error(`FAIL: ${url}`)
      return ((response || {}).data || {}).message || null
    }
  } catch (e) {
    console.error(`FAIL: ${url}`)
    if (e instanceof Object)
      return (((e || {}).response || {}).data || {}).message || null
    else return null
  }
}

const post = async (url, body = {}, config = {}) => {
  const response = await axios.post(url, body, getConfig(config))

  if (response.status >= 200 && response.status <= 299) {
    console.log(`SUCCESS: ${url}`)
    return response.data
  } else {
    console.error(`FAIL: ${url}`)

    const message = ((response || {}).data || {}).message || null
    if (message) alert(message)
    return null
  }
}
const put = async (url, body = {}, config = {}) => {
  const response = await axios.put(url, body, getConfig(config))

  if (response.status >= 200 && response.status <= 299) {
    console.log(`SUCCESS: ${url}`)
    return response.data
  } else {
    console.error(`FAIL: ${url}`)
    const message = ((response || {}).data || {}).message || null
    if (message) alert(message)
    return null
  }
}
const del = async (url, config = {}) => {
  const response = await axios.delete(url, getConfig(config))

  if (response.status >= 200 && response.status <= 299) {
    console.log(`SUCCESS: ${url}`)
    return response.data
  } else {
    console.error(`FAIL: ${url}`)
    const message = ((response || {}).data || {}).message || null
    if (message) alert(message)
    return null
  }
}
export default {
  get,
  post,
  put,
  del,
}
