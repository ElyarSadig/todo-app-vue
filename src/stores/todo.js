import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useAuthStore } from "./auth.js";

export const useTodoStore = defineStore("todo", () => {
  const filter = ref("all");
  const todos = ref([]);

  const remaining = computed(() => {
    return todos.value.filter((todo) => !todo.completed).length;
  });
  const anyRemaining = computed(() => {
    return remaining.value != 0;
  });
  const todosFiltered = computed(() => {
    if (filter.value == "all") {
      return todos;
    } else if (filter.value == "active") {
      return todos.value.filter((todo) => !todo.completed);
    } else if (filter.value == "completed") {
      return todos.value.filter((todo) => todo.completed);
    }
    return todos;
  });
  const showClearCompletedButton = computed(() => {
    return todos.value.filter((todo) => todo.completed).length > 0;
  });

  async function addTodo(todo) {
    try {
      await axios.post("/todos", {
        title: todo.title,
        completed: false,
      });
      todos.value.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async function clearTodos() {
    todos.value = [];
  }
  async function retrieveTodos() {
    const authStore = useAuthStore();
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + authStore.token.value;

    try {
      const response = await axios.get("/todos");
      todos.value = response.data;
    } catch (error) {
      console.error(error);
    }
  }
  async function updateTodo(todo) {
    try {
      await axios.patch("/todos/" + todo.id, {
        title: todo.title,
        completed: todo.completed,
      });
      const index = todos.value.findIndex((item) => item.id === todo.id);
      todos.value.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteTodo(id) {
    try {
      await axios.delete("/todos/" + id);
      const index = todos.value.findIndex((item) => item.id === id);
      todos.value.splice(index, 1);
    } catch (error) {
      console.log(error);
    }
  }
  async function checkAll(checked) {
    try {
      await axios.patch("/todos-check-all", {
        completed: checked,
      });
      todos.value.forEach((todo) => (todo.completed = checked));
    } catch (error) {
      console.error(error);
    }
  }
  async function updateFilter(filter) {
    filter.value = filter;
  }
  async function clearCompleted() {
    const completed = todos.value
      .filter((todo) => todo.completed)
      .map((todo) => todo.id);
    try {
      axios.delete("todos-delete-completed", {
        data: {
          todos: completed,
        },
      });
      todos.value = todos.value.filter((todo) => !todo.completed);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    filter,
    todos,
    remaining,
    anyRemaining,
    todosFiltered,
    showClearCompletedButton,
    addTodo,
    clearTodos,
    retrieveTodos,
    updateTodo,
    deleteTodo,
    checkAll,
    updateFilter,
    clearCompleted,
  };
});
