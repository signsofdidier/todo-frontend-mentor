<script setup>
import { useDarkMode } from '@/composables/useDarkMode'
import { useTodoListStore } from '@/stores/TodoListStore'

const todoListStore = useTodoListStore()

const { isDark, toggleDarkMode } = useDarkMode()
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900 w-full h-full min-h-screen px-6 relative pb-15">
    <!-- background header image -->
    <div class="absolute top-0 left-0 w-full">
      <img
        class="object-cover w-full h-[35vh]"
        :src="isDark ? '/images/bg-desktop-dark.jpg' : '/images/bg-desktop-light.jpg'"
        :alt="isDark ? 'Dark background' : 'Light background'"
      />
    </div>

    <!-- TODO SECTION-->
    <section class="pt-16 max-w-[500px] mx-auto relative">
      <!-- TODO header -->
      <header class="flex justify-between w-full">
        <h1 class="text-4xl tracking-[15px] font-bold text-white">TODO</h1>
        <button @click="toggleDarkMode" class="cursor-pointer">
          <img :src="isDark ? '/images/icon-sun.svg' : '/images/icon-moon.svg'" alt="moon icon" />
        </button>
      </header>

      <!-- TODO INPUT FORM -->
      <form @submit.prevent="todoListStore.addTask" class="mt-9 shadow-md">
        <label
          class="w-full bg-white dark:bg-gray-800 px-5 py-5 rounded-lg border-0 flex items-center"
        >
          <div class="flex items-center w-full">
            <div
              class="list-checkbox border border-gray-300 dark:border-gray-600 rounded-full mr-4"
            ></div>
            <!-- input -->
            <input
              type="text"
              class="placeholder:font-700 placeholder:text-gray-500 dark:placeholder:text-gray-500 font-700 text-gray-500 dark:text-gray-400 focus:outline-none flex-1"
              placeholder="Type a message"
              v-model="todoListStore.newTask"
            />
          </div>
          <button
            type="submit"
            class="ps-3 text-gray-600 hover:text-gray-400 dark:text-gray-500 cursor-pointer"
          >
            Add
          </button>
        </label>
      </form>

      <!-- TODO LIST -->
      <div class="mt-5 md:mt-9 shadow-xl rounded-lg overflow-hidden border-0">
        <!-- Todo list items -->
        <div v-if="todoListStore.filteredTasks.length">
          <!-- Task item -->
          <label
            v-for="task in todoListStore.filteredTasks"
            :key="task.id"
            class="w-full bg-white dark:bg-gray-800 px-5 py-5 border-b-1 border-b-gray-200 dark:border-b-gray-600 flex items-center group"
          >
            <div class="flex items-center w-full">
              <!-- checkbox -->
              <input
                type="checkbox"
                class="list-checkbox appearance-none border border-gray-300 dark:border-gray-500 rounded-full mr-4 cursor-pointer"
                @change="todoListStore.toggleCompleted(task)"
                :checked="task.completed"
              />
              <!-- title -->
              <span
                class="font-700 flex-1 text-gray-500 dark:text-gray-400 decoration-1"
                :class="task.completed ? 'line-through' : ''"
                >{{ task.title }}</span
              >
            </div>

            <button
              type="button"
              class="ps-3 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              @click="todoListStore.deleteTask(task.id)"
            >
              <img src="/images/icon-cross.svg" alt="remove icon" />
            </button>
          </label>
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
            class="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 font-bold disabled:cursor-not-allowed disabled:text-gray-300 cursor-pointer"
            @click="todoListStore.clearCompletedTasks()"
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
            class="text-sm font-bold cursor-pointer text-gray-600 dark:text-gray-300"
          >
            All
          </button>
          <button
            type="button"
            class="text-sm font-bold cursor-pointer text-gray-400 dark:text-gray-500"
          >
            Active
          </button>
          <button
            type="button"
            @click="showCompletedTasks()"
            class="text-sm font-bold cursor-pointer text-gray-400 dark:text-gray-500"
          >
            Completed
          </button>
        </div>
      </div>
    </section>
  </section>
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
