<template>
  <div class="p-4">
    <div v-if="country">
      <div class="text-center mb-4">
        <img
          v-if="country.alpha2Code"
          :src="'https://flagpedia.net/data/flags/icon/72x54/' + country.alpha2Code.toLowerCase() + '.png'"
          alt="flag"
          style="width: 150px;"
        />

        <h2 class="mt-3">{{ getCountryName(country) }}</h2>
      </div>

      <table class="table">
        <tbody>
          <tr>
            <td><strong>Capital</strong></td>
            <td>{{ getCapital(country) }}</td>
          </tr>
          <tr>
            <td><strong>Area</strong></td>
            <td>{{ country.area }} km²</td>
          </tr>
          <tr>
            <td><strong>Code</strong></td>
            <td>{{ country.alpha3Code }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <p>Select a country from the list.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, inject } from "vue";
import { useRoute } from "vue-router";
import localCountries from "../countries.json";

const route = useRoute();
const country = ref(null);
const countries = inject("countries");

function getCountryName(countryData) {
  if (countryData.name && countryData.name.common) {
    return countryData.name.common;
  }

  return countryData.name;
}

function getCapital(countryData) {
  if (Array.isArray(countryData.capital)) {
    return countryData.capital[0];
  }

  return countryData.capital;
}

function findLocalCountry() {
  let foundCountry = localCountries.find((oneCountry) => {
    return oneCountry.alpha3Code === route.params.alpha3Code;
  });

  if (!foundCountry && countries && countries.value) {
    foundCountry = countries.value.find((oneCountry) => {
      return oneCountry.alpha3Code === route.params.alpha3Code;
    });
  }

  country.value = foundCountry;
}

function loadCountry() {
  fetch("https://ih-countries-api.herokuapp.com/countries/" + route.params.alpha3Code)
    .then((response) => response.json())
    .then((data) => {
      country.value = data;
    })
    .catch(() => {
      findLocalCountry();
    });
}

watch(
  () => route.params.alpha3Code,
  () => {
    loadCountry();
  },
  { immediate: true }
);
</script>