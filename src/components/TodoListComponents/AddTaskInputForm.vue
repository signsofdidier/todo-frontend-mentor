<script setup>
import { useTodoListStore } from '@/stores/TodoListStore'
const todoListStore = useTodoListStore()

import TodoInput from '../TodoListComponents/TodoInput.vue'
import CheckboxCircle from '../TodoListComponents/CheckboxCircle.vue'
import AddButton from '../TodoListComponents/AddButton.vue'
</script>

<template>
  <!-- TODO INPUT FORM -->
  <form @submit.prevent="todoListStore.addTask" class="mt-9 shadow-md">
    <label class="w-full bg-white dark:bg-gray-800 px-5 py-4 rounded-lg border-0 flex items-center">
      <div class="flex items-center w-full">
        <CheckboxCircle />
        <!-- input -->
        <TodoInput />
      </div>
      <!-- AddButton -->
      <AddButton />
    </label>
  </form>
</template>

<style scoped></style>
