<script setup>
import { defineProps } from 'vue'
const { task } = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

import { useTodoListStore } from '@/stores/TodoListStore'
const todoListStore = useTodoListStore()
</script>

<template>
  <input
    type="checkbox"
    class="list-checkbox appearance-none border border-gray-300 dark:border-gray-500 rounded-full mr-4 cursor-pointer"
    :checked="task.completed"
    @change="todoListStore.toggleCompleted(task)"
  />
</template>

<style scoped>
.list-checkbox {
  position: relative;
  width: 23px;
  height: 23px;
}
.list-checkbox:checked {
  background: linear-gradient(160deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%));
}
.list-checkbox:checked::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url('/images/icon-check.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
