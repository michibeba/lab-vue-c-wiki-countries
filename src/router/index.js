import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../components/CountriesList.vue"),
    children: [
      {
        path: "", // 
        component: () => import("../components/CountryDetails.vue"),
      },
      {
        path: "list/:alpha3Code", // 
        component: () => import("../components/CountryDetails.vue"),
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});