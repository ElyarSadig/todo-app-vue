<script setup>
import { useTodoStore } from "@/stores/todo";

const store = useTodoStore();
const showClearCompletedButton = store.showClearCompletedButton;
const clearCompleted = async () => {
  await store.clearCompleted();
};
</script>

<template>
  <button v-if="showClearCompletedButton" @click="clearCompleted">
    Clear Completed
  </button>
</template>
