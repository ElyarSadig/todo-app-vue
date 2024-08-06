import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
    },
    {
      path: "/todo",
      name: "todo",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/about",
      name: "about",
    },
    {
      path: "/login",
      name: "login",
      props: true,
      meta: {
        requiresVisitor: true,
      },
    },
    {
      path: "/register",
      name: "register",
      // component: Register,
      meta: {
        requiresVisitor: true,
      },
    },
    {
      path: "/logout",
      name: "logout",
      // component: Logout,
    },
  ],
});


export default router;
