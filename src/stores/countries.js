import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getCountriesAPI } from '@/api'

export const useCountriesStore = defineStore('countries', () => {
  const countriesData = ref([])
  const filterCountriesData = ref([])

  async function getCountriesData() {
    try {
      const { data } = await getCountriesAPI()
      countriesData.value = data
    } catch (error) {
      console.log(error)
    }
  }

  getCountriesData()

  function resetCountriesData() {
    filterCountriesData.value = []
  }

  function filterCountries(keyword) {
    if (countriesData.value.length < 1) return false
    if (keyword === '') {
      resetCountriesData()
      return false
    }

    const keywordLowercase = keyword.toLowerCase()
    filterCountriesData.value = countriesData.value.filter(
      (item) => item.name.common.toLowerCase().indexOf(keywordLowercase) > -1
    )
  }

  return {
    countriesData,
    resetCountriesData,
    getCountriesData,
    filterCountries,
    filterCountriesData
  }
})
