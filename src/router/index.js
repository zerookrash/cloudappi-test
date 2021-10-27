import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => {
      if (localStorage.getItem("token")) {
        return import("../views/Dashboard.vue");
      } else if (!localStorage.getItem("token")) {
        return import("../views/noToken.vue");
      }
    },
  },
  {
    path: "/editar/:id",
    name: "Editar",
    component: () => {
      if (localStorage.getItem("token")) {
        return import("../views/Editar.vue");
      }
    },
  },
  {
    path: "/cadastro",
    name: "Cadastro",
    component: () => import("../views/noToken.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
