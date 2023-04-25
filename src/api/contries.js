import request from './request'

export const getCountries = () => request.get('/all?fields=name')
