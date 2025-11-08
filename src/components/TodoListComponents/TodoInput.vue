<script setup>
import { useTodoListStore } from '@/stores/TodoListStore'
const todoListStore = useTodoListStore()
</script>

<template>
  <input
    type="text"
    class="placeholder:font-700 placeholder:text-gray-500 dark:placeholder:text-gray-500 font-700 text-gray-500 dark:text-gray-400 focus:outline-none flex-1"
    placeholder="Type a message"
    v-model="todoListStore.newTask"
  />
</template>

<style scoped></style>
