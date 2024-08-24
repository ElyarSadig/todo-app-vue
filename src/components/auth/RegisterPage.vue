<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const store = useAuthStore();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const serverErrors = ref("");
const successMessage = ref("");

const validateBeforeSubmit = async () => {
  // add validation to inputs
  await register();
};

const register = async () => {
  try {
    await store.register({
      name: name.value,
      email: email.value,
      password: password.value,
    });
    successMessage.value = "Registration successful!";
    serverErrors.value = "";
    router.push({
      name: "login",
      params: {
        dataSuccessMessage: successMessage.value,
      },
    });
    // add toaster for this part
  } catch (error) {
    serverErrors.value = error.message;
    successMessage.value = "";
  }
};
</script>

<template>
  <div class="page-wrapper login-form">
    <h2 class="login-heading">Register</h2>
    <form action="#" @submit.prevent="validateBeforeSubmit">
      <div v-if="serverErrors" class="server-error">
        {{ serverErrors }}
      </div>

      <div class="form-control">
        <label for="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          class="login-input"
          v-model="name"
        />
        <span class="form-error"></span>
      </div>

      <div class="form-control">
        <label for="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          class="login-input"
          v-model="email"
        />
        <span class="form-error"></span>
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
        <span class="form-error"></span>
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit">Create Account</button>
      </div>
    </form>
  </div>
</template>

<style></style>
