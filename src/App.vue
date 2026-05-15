<template>
  <div class="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from "vue";
import NavBar from "./components/NavBar.vue";
import localCountries from "./countries.json";

const countries = ref([]);

provide("countries", countries);

onMounted(() => {
  fetch("https://ih-countries-api.herokuapp.com/countries")
    .then((response) => response.json())
    .then((data) => {
      countries.value = data;
    })
    .catch(() => {
      countries.value = localCountries;
    });
});
</script>