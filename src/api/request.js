import axios from 'axios'

const request = axios.create({
  baseURL: 'https://restcountries.com/v3.1'
})

function beforeRequestHandler(config) {
  return config
}

function requestError(error) {
  console.log(error)
}

function afterResponseHandler(response) {
  return response
}

function responseError(error) {
  console.log(error)
}

request.interceptors.request.use(beforeRequestHandler, requestError)
request.interceptors.response.use(afterResponseHandler, responseError)

export default request
