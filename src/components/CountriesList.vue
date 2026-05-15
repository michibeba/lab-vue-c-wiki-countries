<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-4 p-3">
        <ul class="list-group">
          <li
            v-for="country in countries"
            :key="country.alpha3Code"
            class="list-group-item d-flex align-items-center"
          >
            <img
              v-if="country.alpha2Code"
              :src="'https://flagpedia.net/data/flags/icon/72x54/' + country.alpha2Code.toLowerCase() + '.png'"
              alt="flag"
              style="width: 30px; margin-right: 10px;"
            />

            <router-link :to="'/list/' + country.alpha3Code">
              {{ getCountryName(country) }}
            </router-link>
          </li>
        </ul>
      </div>

      <div class="col-8 p-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";

const countries = inject("countries");

function getCountryName(country) {
  if (country.name && country.name.common) {
    return country.name.common;
  }

  return country.name;
}
</script>