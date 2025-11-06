<script setup>
import { computed, ref } from 'vue'

const tasks = ref([])
const newTask = ref('')
const currentFilter = ref('all') // 'all', 'active', 'completed'

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
  const confirmDelete = confirm('Are you sure you want to delete this task?')
  if (confirmDelete) {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }
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

const filteredTasks = computed(() => {
  switch (currentFilter.value) {
    case 'active':
      return tasks.value.filter((task) => !task.completed)
    case 'completed':
      return tasks.value.filter((task) => task.completed)
    default:
      return tasks.value
  }
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
  <section class="bg-gray-50 w-full h-screen relative">
    <!-- background header image -->
    <div class="absolute top-0 left-0 w-full">
      <img class="object-cover w-full h-[35vh]" src="@/assets/images/bg-desktop-light.jpg" alt="" />
    </div>

    <!-- TODO SECTION-->
    <section class="pt-16 max-w-[500px] mx-auto relative">
      <!-- TODO header -->
      <header class="flex justify-between w-full">
        <h1 class="text-4xl tracking-[15px] font-bold text-white">TODO</h1>
        <button><img src="@/assets/images/icon-moon.svg" alt="moon icon" /></button>
      </header>

      <!-- TODO INPUT FORM -->
      <form @submit.prevent="addTask" class="mt-9 shadow-md">
        <label class="w-full bg-white px-5 py-5 rounded-lg border-0 flex items-center">
          <div class="flex items-center w-full">
            <div class="list-checkbox border border-gray-300 rounded-full mr-4"></div>
            <!-- input -->
            <input
              type="text"
              class="placeholder:font-700 placeholder:text-gray-500 font-700 text-gray-500 focus:outline-none flex-1"
              placeholder="Type a message"
              v-model="newTask"
            />
          </div>
          <button type="submit" class="ps-3">Add</button>
        </label>
      </form>

      <!-- TODO LIST -->
      <div class="mt-9 shadow-xl rounded-lg overflow-hidden border-0">
        <!-- Todo list items -->
        <div v-if="filteredTasks.length">
          <label
            v-for="task in filteredTasks"
            :key="task.id"
            class="w-full bg-white px-5 py-5 border-b-1 border-b-gray-200 flex items-center"
          >
            <div v-if="task" class="flex items-center w-full">
              <!-- checkbox -->
              <input
                type="checkbox"
                class="list-checkbox appearance-none border border-gray-300 rounded-full mr-4"
                :checked="task.completed"
                @change="toggleCompleted(task)"
              />
              <!-- title -->
              <span
                class="font-700 text-gray-500 flex-1"
                :class="task.completed ? 'line-through' : ''"
                >{{
                  task.title ? task.title.charAt(0).toUpperCase() + task.title.slice(1) : ''
                }}</span
              >
            </div>

            <button type="button" @click="deleteTask(task.id)" class="ps-3">
              <img src="@/assets/images/icon-cross.svg" alt="remove icon" />
            </button>
          </label>
        </div>

        <!-- NO TASKS fallback -->
        <label
          v-else
          class="w-full bg-white px-5 py-5 border-b-1 border-b-gray-200 flex items-center"
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
        <div class="flex justify-between items-center px-4 py-3 bg-white">
          <div class="text-sm text-gray-400">
            {{ tasks.length }} item{{ tasks.length === 1 ? '' : 's' }} left
          </div>
          <div class="space-x-3">
            <button
              type="button"
              @click="showAllTasks()"
              class="text-sm text-gray-400 hover:text-gray-600 font-bold"
              :class="currentFilter === 'all' ? 'text-gray-600' : ''"
            >
              All
            </button>
            <button
              type="button"
              @click="showActiveTasks()"
              class="text-sm text-gray-400 hover:text-gray-600 font-bold"
              :class="currentFilter === 'active' ? 'text-gray-600' : ''"
            >
              Active
            </button>
            <button
              type="button"
              @click="showCompletedTasks()"
              class="text-sm text-gray-400 hover:text-gray-600 font-bold"
              :class="currentFilter === 'completed' ? 'text-gray-600' : ''"
            >
              Completed
            </button>
          </div>
          <button
            type="button"
            @click="clearCompletedTasks()"
            class="text-sm text-gray-400 hover:text-gray-600 font-bold disabled:cursor-not-allowed disabled:text-gray-300"
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
  background-image: url('@/assets/images/icon-check.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
