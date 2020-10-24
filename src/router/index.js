import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import User from "../views/User";
import Login from "../views/Login";
import Register from "../views/Register";
Vue.use(VueRouter);

const routes = [
  {
    path: "/Home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/",
    name: "login",
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,

  },
  {
    path: "/user",
    name: "user",
    component: User,
    meta: {
      requiresAuth: false,
    },
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  const currentUser = window.localStorage.getItem("token");
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    next("/");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;