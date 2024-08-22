<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const props = defineProps({
  dataSuccessMessage: {
    type: String,
  },
});

const username = ref("");
const password = ref("");
const serverError = ref("");
const successMessage = ref(props.dataSuccessMessage);
const loading = ref(false);

async function login() {
  loading.value = true;
  try {
    await authStore.retrieveToken({
      username: username.value,
      password: password.value,
    });
    loading.value = false;
    router.push({ name: "todo" });
  } catch (error) {
    loading.value = false;
    serverError.value = error.message;
    password.value = "";
    successMessage.value = "";
  }
}
</script>

<template>
  <div class="page-wrapper login-form">
    <h2 class="login-heading">Login</h2>
    <form action="#" @submit.prevent="login">
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      <div v-if="serverError" class="server-error">{{ serverError }}</div>

      <div class="form-control">
        <label for="email">Username</label>
        <input
          type="email"
          name="username"
          id="username"
          class="login-input"
          v-model="username"
        />
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="login-input"
          v-model="password"
        />
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit" :disabled="loading">
          <div class="lds-ring-container" v-if="loading">
            <div class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          Login
        </button>
      </div>
    </form>
  </div>
</template>
