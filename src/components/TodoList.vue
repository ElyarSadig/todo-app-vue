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

<style lang="scss">
.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;

  &:focus {
    outline: 0;
  }
}

.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc; //override defaults
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  &:focus {
    outline: none;
  }
}

.completed {
  text-decoration: line-through;
  color: grey;
}

.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}

.name-container {
  margin-bottom: 16px;
}

button {
  font-size: 14px;
  background-color: white;
  appearance: none;
  padding: 4px;

  &:hover {
    background: lightgreen;
  }

  &:focus {
    outline: none;
  }
}

.active {
  background: lightgreen;
}

// CSS Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
