<script setup>
import { useTodoStore } from "@/stores/todo";
import { computed } from "vue";

const store = useTodoStore();
const filter = computed(() => {
  return store.filter;
});
const changeFilter = () => {
  store.updateFilter(filter);
};
</script>

<template>
  <div>
    <button :class="{ active: filter == 'all' }" @click="changeFilter('all')">
      All
    </button>
    <button
      :class="{ active: filter == 'active' }"
      @click="changeFilter('active')"
    >
      Active
    </button>
    <button
      :class="{ active: filter == 'completed' }"
      @click="changeFilter('completed')"
    >
      Completed
    </button>
  </div>
</template>
