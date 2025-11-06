<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import draggable from 'vuedraggable'

const tasks = useLocalStorage('tasks', [])
const newTask = ref('')
const currentFilter = ref('all') // 'all', 'active', 'completed'

// ----------- DARKMODE -----------
// Dark mode state
const isDark = useLocalStorage('darkMode', false)

// AUTOMATISCH SYNCHRONISEREN TUSSEN isDark EN dark CLASS
watchEffect(() => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

// Toggle dark mode
const toggleDarkMode = () => {
  isDark.value = !isDark.value
  // De watchEffect zorgt nu voor het togglen van de class
}

// ----------- END DARKMODE -----------

const toggleCompleted = (task) => {
  task.completed = !task.completed
}

const addTask = () => {
  if (newTask.value.trim()) {
    newTask.value = newTask.value.trim()
    tasks.value.push({
      id: Date.now(),
      title: newTask.value,
      completed: false,
    })
    newTask.value = ''
  }
}

const deleteTask = (id) => {
  tasks.value = tasks.value.filter((t) => t.id !== id) // remove task by id
}

// filters
const showAllTasks = () => {
  currentFilter.value = 'all'
}

const showActiveTasks = () => {
  currentFilter.value = 'active'
}

const showCompletedTasks = () => {
  currentFilter.value = 'completed'
}

const filteredTasks = computed({
  get: () => {
    switch (currentFilter.value) {
      case 'active':
        return tasks.value.filter((task) => !task.completed)
      case 'completed':
        return tasks.value.filter((task) => task.completed)
      default:
        return tasks.value
    }
  },
  set: (value) => {
    // Update de originele tasks array wanneer items worden gesleept
    // We moeten rekening houden met de filter
    if (currentFilter.value === 'all') {
      tasks.value = value
    } else if (currentFilter.value === 'active') {
      const completedTasks = tasks.value.filter((task) => task.completed)
      tasks.value = [...value, ...completedTasks]
    } else if (currentFilter.value === 'completed') {
      const activeTasks = tasks.value.filter((task) => !task.completed)
      tasks.value = [...activeTasks, ...value]
    }
  },
})

const clearCompletedTasks = () => {
  const isConfirmed = confirm('Are you sure you want to clear all completed tasks?')
  if (isConfirmed) {
    tasks.value = tasks.value.filter((task) => !task.completed)
  }
}

const hasCompletedTasks = computed(() => {
  return tasks.value.some((task) => task.completed)
})
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900 w-full h-screen relative">
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
      <form @submit.prevent="addTask" class="mt-9 shadow-md">
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
              v-model="newTask"
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
      <div class="mt-9 shadow-xl rounded-lg overflow-hidden border-0">
        <!-- Todo list items -->
        <div v-if="filteredTasks.length">
          <!-- DRAGGABLE COMPONENT -->
          <draggable v-model="filteredTasks" item-key="id" class="todo-list">
            <template #item="{ element: task }">
              <label
                class="w-full bg-white dark:bg-gray-800 px-5 py-5 border-b-1 border-b-gray-200 dark:border-b-gray-600 flex items-center group"
              >
                <div class="flex items-center w-full">
                  <!-- checkbox -->
                  <input
                    type="checkbox"
                    class="list-checkbox appearance-none border border-gray-300 dark:border-gray-500 rounded-full mr-4 cursor-pointer"
                    :checked="task.completed"
                    @change="toggleCompleted(task)"
                  />
                  <!-- title -->
                  <span
                    class="font-700 flex-1"
                    :class="
                      task.completed
                        ? 'line-through text-gray-400 dark:text-gray-600 decoration-1'
                        : ' text-gray-500 dark:text-gray-400'
                    "
                    >{{
                      task.title ? task.title.charAt(0).toUpperCase() + task.title.slice(1) : ''
                    }}</span
                  >
                </div>

                <button
                  type="button"
                  @click="deleteTask(task.id)"
                  class="ps-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                >
                  <img src="/images/icon-cross.svg" alt="remove icon" />
                </button>
              </label>
            </template>
          </draggable>
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
              currentFilter === 'active'
                ? 'active'
                : '' || currentFilter === 'completed'
                  ? 'completed'
                  : ''
            }}
            tasks.</span
          >
        </label>

        <!-- filters -->
        <div class="flex justify-between items-center px-4 py-3 bg-white dark:bg-gray-800">
          <div class="text-sm text-gray-400 dark:text-gray-500">
            {{ tasks.length }} item{{ tasks.length === 1 ? '' : 's' }} left
          </div>
          <div class="space-x-3">
            <button
              type="button"
              @click="showAllTasks()"
              class="text-sm font-bold cursor-pointer"
              :class="
                currentFilter === 'all'
                  ? 'text-gray-600 dark:text-gray-300'
                  : 'text-gray-400 dark:text-gray-500'
              "
            >
              All
            </button>
            <button
              type="button"
              @click="showActiveTasks()"
              class="text-sm font-bold cursor-pointer"
              :class="
                currentFilter === 'active'
                  ? 'text-gray-600 dark:text-gray-300'
                  : 'text-gray-400 dark:text-gray-500'
              "
            >
              Active
            </button>
            <button
              type="button"
              @click="showCompletedTasks()"
              class="text-sm font-bold cursor-pointer"
              :class="
                currentFilter === 'completed'
                  ? 'text-gray-600 dark:text-gray-300'
                  : 'text-gray-400 dark:text-gray-500'
              "
            >
              Completed
            </button>
          </div>
          <button
            type="button"
            @click="clearCompletedTasks()"
            class="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 font-bold disabled:cursor-not-allowed disabled:text-gray-300 cursor-pointer"
            :disabled="!hasCompletedTasks"
          >
            Clear Completed
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
