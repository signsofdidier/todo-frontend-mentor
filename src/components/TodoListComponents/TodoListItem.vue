<script setup>
import { useTodoListStore } from '@/stores/TodoListStore'
import CheckboxFilled from '../TodoListComponents/CheckboxFilled.vue'
const todoListStore = useTodoListStore()
</script>

<template>
  <label
    v-for="task in todoListStore.filteredTasks"
    :key="task.id"
    class="w-full bg-white dark:bg-gray-800 px-5 py-5 border-b-1 border-b-gray-200 dark:border-b-gray-600 flex items-center group"
  >
    <div v-if="task" class="flex items-center w-full">
      <!-- checkbox -->
      <CheckboxFilled :task="task" />
      <!-- title -->
      <span
        class="font-700 flex-1"
        :class="
          task.completed
            ? 'line-through text-gray-400 dark:text-gray-600 decoration-1'
            : ' text-gray-500 dark:text-gray-400'
        "
        >{{ task.title ? task.title.charAt(0).toUpperCase() + task.title.slice(1) : '' }}</span
      >
    </div>

    <button
      type="button"
      @click="todoListStore.deleteTask(task.id)"
      class="ps-3 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
    >
      <img src="/images/icon-cross.svg" alt="remove icon" />
    </button>
  </label>
</template>

<style scoped></style>
