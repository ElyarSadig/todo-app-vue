import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import LandingPage from "@/components/marketing/LandingPage.vue";
import AboutPage from "@/components/marketing/AboutPage.vue";
import LoginPage from "@/components/auth/LoginPage.vue";
import RegisterPage from "@/components/auth/RegisterPage.vue";
import LogoutPage from "@/components/auth/LogoutPage.vue";
import TodoListPage from "@/components/layouts/TodoListPage.vue";

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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isLoggedIn = authStore.loggedIn;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({ name: "login" });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    if (isLoggedIn) {
      next({ name: "todo" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
