<script setup>
import { useTodoStore } from "@/stores/todo";

const store = useTodoStore();
const anyRemaining = store.anyRemaining;

const allChecked = (event) => {
  store.checkAll(event.target.checked);
};
</script>

<template>
  <div>
    <label>
      <input type="checkbox" :checked="!anyRemaining" @change="allChecked" />
      Check All
    </label>
  </div>
</template>
