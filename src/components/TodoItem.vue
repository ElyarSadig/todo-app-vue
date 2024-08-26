<script setup>
import { useTodoStore } from "@/stores/todo";
import { ref, watch } from "vue";

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
  checkAll: {
    type: Boolean,
    required: true,
  },
});

const store = useTodoStore();
const id = ref(props.todo.id);
const title = ref(props.todo.title);
const completed = ref(props.todo.completed);
const editing = ref(props.todo.editing);
const beforeEditCache = ref("");

watch(
  () => props.checkAll,
  (newVal) => {
    completed.value = newVal ? true : props.todo.completed;
  }
);

const vFocus = {
  mounted: (el) => el.focus(),
};

const removeTodo = (id) => {
  store.deleteTodo(id);
};

const editTodo = () => {
  beforeEditCache.value = title.value;
  editing.value = true;
};

const doneEdit = () => {
  if (title.value.trim() == "") {
    title.value = beforeEditCache.value;
  }
  editing.value = false;
  store.updateTodo({
    id: id.value,
    title: title.value,
    completed: completed.value,
    editing: editing.value,
  });
};

const cancelEdit = () => {
  title.value = beforeEditCache.value;
  editing.value = false;
};
</script>

<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="completed" @change="doneEdit" />
      <div
        v-if="!editing"
        @dblclick="editTodo"
        class="todo-item-label"
        :class="{ completed: completed }"
      >
        {{ title }}
      </div>
      <input
        v-else
        class="todo-item-edit"
        type="text"
        v-model="title"
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
        v-focus
      />
    </div>
    <div>
      <span class="remove-item" @click="removeTodo(props.todo.id)">
        &times;
      </span>
    </div>
  </div>
</template>

<style></style>
