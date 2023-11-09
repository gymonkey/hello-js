import Axios from 'axios'

export const axios = Axios.create({
  baseURL: '/api'
})

axios.interceptors.response.use(function (response) {
  if (response.status === 200) {
    const data = response.data
    if (data.rCode === 0) {
      return Promise.resolve(data.data)
    }
    return Promise.reject(data)
  }
  return Promise.reject(response)
})
