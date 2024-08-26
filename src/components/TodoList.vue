<script setup>
import TodoItem from "./TodoItem.vue";
import TodoItemsRemaining from "./TodoItemsRemaining.vue";
import TodoCheckAll from "./TodoCheckAll.vue";
import TodoFiltered from "./TodoFiltered.vue";
import TodoClearCompleted from "./TodoClearCompleted.vue";
import { onMounted, ref } from "vue";
import { useTodoStore } from "@/stores/todo";
import { useAuthStore } from "@/stores/auth";

const todoStore = useTodoStore();
const authStore = useAuthStore();
const newTodo = ref("");
const idForTodo = ref(3);
const name = ref("");

onMounted(async () => {
  await todoStore.retrieveTodos();
  const response = await authStore.retrieveName();
  name.value = response.data.name;
});

const anyRemaining = todoStore.anyRemaining;
const todosFiltered = todoStore.todosFiltered;

const addTodo = () => {
  if (newTodo.value.trim().length === 0) {
    return;
  }
  todoStore.addTodo({
    id: idForTodo.value,
    title: newTodo.value,
  });
  newTodo.value = "";
  idForTodo.value++;
};
</script>

<template>
  <div>
    <div class="name-container">Welcome, {{ name }}</div>
    <input
      type="text"
      class="todo-input"
      placeholder="What needs to be done"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <transition-group
      name="fade"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <todo-item
        v-for="todo in todosFiltered"
        :key="todo.id"
        :todo="todo"
        :checkAll="!anyRemaining"
      >
      </todo-item>
    </transition-group>

    <div class="extra-container">
      <todo-check-all></todo-check-all>
      <todo-items-remaining></todo-items-remaining>
    </div>
    <!-- end extra-container -->

    <div class="extra-container">
      <todo-filtered></todo-filtered>

      <div>
        <transition name="fade">
          <todo-clear-completed></todo-clear-completed>
        </transition>
      </div>
    </div>
    <!-- end extra-container -->
  </div>
</template>
