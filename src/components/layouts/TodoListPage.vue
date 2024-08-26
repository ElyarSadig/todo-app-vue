<script setup>
import TodoList from "../TodoList.vue";
</script>

<template>
  <div id="app" class="container">
    <img src="@/assets/logo.png" alt="" />
    <todo-list></todo-list>
  </div>
</template>

<style>
.container {
  max-width: 600px;
  margin: 0 auto;
}

.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}
</style>
