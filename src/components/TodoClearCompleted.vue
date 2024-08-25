<script setup>
import { useTodoStore } from "@/stores/todo";
import { computed } from "vue";

const store = useTodoStore();
const showClearCompletedButton = computed(() => {
  return store.showClearCompletedButton;
});
const clearCompleted = () => {
  store.clearCompleted();
};
</script>

<template>
  <button v-if="showClearCompletedButton" @click="clearCompleted">
    Clear Completed
  </button>
</template>
