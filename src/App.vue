<script setup>
import { getCountriesAPI } from '@/api'
import InputSelect from './components/InputSelect.vue'

async function getCountriesData() {
  const { data } = await getCountriesAPI()
  console.log(data)
}

getCountriesData()
</script>

<template>
  <div class="h-100dvh d-flex justify-center align-center">
    <InputSelect />
  </div>
</template>

<style scoped></style>
