<script setup>
import { onMounted } from "vue";
import { useTodoStore } from "@/stores/todo";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const todoStore = useTodoStore();
const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  await todoStore.clearTodos();
  await authStore.destroyToken();
  router.push({ name: "home" });
});
</script>
