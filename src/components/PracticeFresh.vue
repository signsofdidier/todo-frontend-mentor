<script setup>
import { useTodoListStore } from '@/stores/TodoListStore'
import { useDarkModeStore } from '@/composables/darkModeStore'

import AddTaskInputForm from './TodoListComponents/AddTaskInputForm.vue'
import DarkModeSwitch from './TodoListComponents/DarkModeSwitch.vue'
import TodoListItem from './TodoListComponents/TodoListItem.vue'

const todoListStore = useTodoListStore()
const darkModeStore = useDarkModeStore()
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900 w-full h-screen px-6 relative">
    <!-- background header image -->
    <div class="absolute top-0 left-0 w-full">
      <img
        class="object-cover w-full h-[35vh]"
        :src="darkModeStore.isDark ? '/images/bg-desktop-dark.jpg' : '/images/bg-desktop-light.jpg'"
        :alt="darkModeStore.isDark ? 'Dark background' : 'Light background'"
      />
    </div>

    <!-- TODO SECTION-->
    <section class="pt-16 max-w-[500px] mx-auto relative">
      <!-- TODO header -->
      <header class="flex justify-between w-full">
        <h1 class="text-4xl tracking-[15px] font-bold text-white">TODO</h1>
        <DarkModeSwitch />
      </header>

      <AddTaskInputForm />

      <!-- TODO LIST -->
      <div class="mt-5 md:mt-9 shadow-xl rounded-lg overflow-hidden border-0">
        <!-- Todo list items -->
        <div v-if="todoListStore.filteredTasks.length">
          <TodoListItem />
        </div>

        <!-- NO TASKS fallback -->
        <label
          v-else
          class="w-full bg-white dark:bg-gray-800 px-5 py-5 border-b-1 border-b-gray-200 dark:border-b-gray-600 flex items-center"
        >
          <!-- title -->
          <span class="font-700 text-gray-500 flex-1"
            >There no
            {{
              todoListStore.currentFilter === 'active'
                ? 'active'
                : '' || todoListStore.currentFilter === 'completed'
                  ? 'completed'
                  : ''
            }}
            tasks.</span
          >
        </label>

        <!-- filters -->
        <div class="flex justify-between items-center px-4 py-3 bg-white dark:bg-gray-800">
          <div class="text-sm text-gray-400 dark:text-gray-500">
            {{ todoListStore.tasks.length }} item{{ todoListStore.tasks.length === 1 ? '' : 's' }}
            left
          </div>
          <div class="space-x-3 hidden md:flex">
            <button
              type="button"
              @click="todoListStore.showAllTasks()"
              class="text-sm font-bold cursor-pointer"
              :class="
                todoListStore.currentFilter === 'all'
                  ? 'text-gray-600 dark:text-gray-300'
                  : 'text-gray-400 dark:text-gray-500'
              "
            >
              All
            </button>
            <button
              type="button"
              @click="todoListStore.showActiveTasks()"
              class="text-sm font-bold cursor-pointer"
              :class="
                todoListStore.currentFilter === 'active'
                  ? 'text-gray-600 dark:text-gray-300'
                  : 'text-gray-400 dark:text-gray-500'
              "
            >
              Active
            </button>
            <button
              type="button"
              @click="todoListStore.showCompletedTasks()"
              class="text-sm font-bold cursor-pointer"
              :class="
                todoListStore.currentFilter === 'completed'
                  ? 'text-gray-600 dark:text-gray-300'
                  : 'text-gray-400 dark:text-gray-500'
              "
            >
              Completed
            </button>
          </div>
          <button
            type="button"
            @click="todoListStore.clearCompletedTasks()"
            class="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 font-bold disabled:cursor-not-allowed disabled:text-gray-300 cursor-pointer"
            :disabled="!todoListStore.hasCompletedTasks"
          >
            Clear Completed
          </button>
        </div>
      </div>

      <!-- Mobile filters -->
      <div
        class="flex md:hidden justify-center items-center mt-5 px-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-xl"
      >
        <div class="space-x-6">
          <button
            type="button"
            @click="todoListStore.showAllTasks()"
            class="text-sm font-bold cursor-pointer"
            :class="
              todoListStore.currentFilter === 'all'
                ? 'text-gray-600 dark:text-gray-300'
                : 'text-gray-400 dark:text-gray-500'
            "
          >
            All
          </button>
          <button
            type="button"
            @click="todoListStore.showActiveTasks()"
            class="text-sm font-bold cursor-pointer"
            :class="
              todoListStore.currentFilter === 'active'
                ? 'text-gray-600 dark:text-gray-300'
                : 'text-gray-400 dark:text-gray-500'
            "
          >
            Active
          </button>
          <button
            type="button"
            @click="todoListStore.showCompletedTasks()"
            class="text-sm font-bold cursor-pointer"
            :class="
              todoListStore.currentFilter === 'completed'
                ? 'text-gray-600 dark:text-gray-300'
                : 'text-gray-400 dark:text-gray-500'
            "
          >
            Completed
          </button>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped></style>
