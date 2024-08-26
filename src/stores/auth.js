import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "@/utils/axios";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("access_token") || null);
  const loggedIn = computed(() => {
    return token.value !== null;
  });

  async function retrieveName() {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token.value;
    try {
      const response = await axios.get("/user");
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function register(data) {
    try {
      const response = await axios.post("/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      return response;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const serverMessage = error.response.data.message;
        console.error("Server Error:", serverMessage);
        throw new Error(serverMessage);
      } else {
        console.error("Network or unexpected error:", error);
        throw new Error("An unexpected error occurred. Please try again.");
      }
    }
  }

  async function destroyToken() {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token.value;

    if (loggedIn.value) {
      try {
        const response = await axios.post("/logout");
        localStorage.removeItem("access_token");
        token.value = null;
        return response;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }

  async function retrieveToken(data) {
    try {
      const response = await axios.post("/login", {
        username: data.username,
        password: data.password,
      });
      const accessToken = response.data.access_token;
      localStorage.setItem("access_token", accessToken);
      token.value = accessToken;
      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during login.";
      throw new Error(errorMessage);
    }
  }

  return {
    token,
    loggedIn,
    retrieveName,
    register,
    destroyToken,
    retrieveToken,
  };
});
