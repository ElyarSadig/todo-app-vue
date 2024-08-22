import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/components/marketing/LandingPage.vue";
import AboutPage from "@/components/marketing/AboutPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LandingPage,
    },
    {
      path: "/about",
      name: "about",
      component: AboutPage,
    },
    {
      path: "/todo",
      name: "todo",
      meta: {
        requiresAuth: true,
      },
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
