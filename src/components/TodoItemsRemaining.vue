<script setup>
import { useTodoStore } from "@/stores/todo";
import { computed } from "vue";

const store = useTodoStore();

const remaining = computed(() => {
  return store.remaining;
});
</script>

<template>
  <div>{{ remaining }} items left</div>
</template>
