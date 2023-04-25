<script setup>
import { ref, watch, computed } from 'vue'
import { useCountriesStore } from '../stores/countries'

const inputValue = ref('')
const selectedValue = ref('')
const datalist = ref(null)
const selectedIndex = ref(-1)
const countries = useCountriesStore()
const listDataStatus = computed(() => {
  if (countries.filterCountriesData.length > 0) return true
  return false
})

watch(inputValue, (newValue) => {
  datalist.value.scrollTop = 0
  if (newValue === selectedValue.value) {
    countries.resetCountriesData()
    return false
  }
  countries.filterCountries(newValue)
})

function selected(country) {
  inputValue.value = ''
  selectedValue.value = country
  inputValue.value = selectedValue.value
  selectedIndex.value = -1
}

function arrowSelectDown() {
  if (selectedIndex.value === countries.filterCountriesData.length - 1) return false
  selectedIndex.value++
  if (selectedIndex.value > 3 && selectedIndex.value < countries.filterCountriesData.length) {
    datalist.value.scrollTop += document.querySelector('li').offsetHeight
  }
}

function arrowSelectUp() {
  if (selectedIndex.value === -1) return false
  selectedIndex.value--

  if (datalist.value.scrollTop === 0) return false
  datalist.value.scrollTop -= document.querySelector('li').offsetHeight
}

function arrowSelectEnter() {
  if (selectedIndex.value === -1) return false
  selected(countries.filterCountriesData[selectedIndex.value].name.common)
}
</script>

<template>
  <div class="w-100 mx-10">
    <v-text-field
      autofocus
      v-model.trim="inputValue"
      class=""
      hide-details
      variant="outlined"
      @keyup.down="arrowSelectDown"
      @keyup.up="arrowSelectUp"
      @keyup.enter="arrowSelectEnter"
    ></v-text-field>
    <ul ref="datalist" class="w-100 rounded-b-lg" v-show="listDataStatus">
      <li
        class="px-4 py-2"
        v-for="(item, index) in countries.filterCountriesData"
        :key="item + index"
        :data-selected="index === selectedIndex"
        @click="selected(item.name.common)"
      >
        {{ item.name.common }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul,
li {
  list-style: none;
}
ul {
  position: absolute;
  max-height: 200px;
  overflow-x: scroll;
  border: 1px solid #2e2e2e;
}
li {
  cursor: pointer;
}
li:not(:last-child) {
  border-bottom: 1px solid #2e2e2e;
}
li:hover,
li[data-selected='true'] {
  background: #4e4e4e;
}
</style>
