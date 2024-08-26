import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/components/marketing/LandingPage.vue";
import AboutPage from "@/components/marketing/AboutPage.vue";
import LoginPage from "@/components/auth/LoginPage.vue";
import RegisterPage from "@/components/auth/RegisterPage.vue";
import LogoutPage from "@/components/auth/LogoutPage.vue";
import TodoListPage from "@/components/layouts/TodoListPage.vue";
LogoutPage

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
      component: TodoListPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      props: true,
      component: LoginPage,
      meta: {
        requiresVisitor: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
      meta: {
        requiresVisitor: true,
      },
    },
    {
      path: "/logout",
      name: "logout",
      component: LogoutPage,
    },
  ],
});

export default router;
