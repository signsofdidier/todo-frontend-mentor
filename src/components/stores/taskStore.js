import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTaskStore = defineStore('taskStore', () => {
  // tasks array
  const tasks = ref([])

  // newTask string
  const newTask = ref('')

  // currentFilter
  const currentFilter = ref('all')

  // addTask function
  const addTask = () => {
    if (newTask.value.trim()) {
      newTask.value = newTask.value.trim()
      tasks.value.push({
        id: Date.now(),
        title: newTask.value,
        completed: false,
      })
    }
    newTask.value = ''
  }

  // deleteTask function
  const deleteTask = (id) => {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  // toggleCompleted function
  const toggleCompleted = (task) => {
    task.completed = !task.completed
  }

  const showAllTasks = () => {
    currentFilter.value = 'all'
  }

  const showActiveTasks = () => {
    currentFilter.value = 'active'
  }

  const showCompletedTasks = () => {
    currentFilter.value = 'completed'
  }

  // filteredTasks
  const filteredTasks = computed(() => {
    if (currentFilter.value === 'active') {
      return tasks.value.filter((task) => !task.completed)
    } else if (currentFilter.value === 'completed') {
      return tasks.value.filter((task) => task.completed)
    } else {
      return tasks.value
    }
  })

  const activeFilterClass = (filtername) => {
    return currentFilter.value === filtername
      ? 'text-gray-600 dark:text-gray-300'
      : 'text-gray-400 dark:text-gray-500'
  }

  // clearCompletedTasks
  const clearCompletedTasks = () => {
    tasks.value = tasks.value.filter((t) => !t.completed)
  }

  return {
    tasks,
    newTask,
    addTask,
    deleteTask,
    toggleCompleted,
    currentFilter,
    filteredTasks,
    showAllTasks,
    showActiveTasks,
    showCompletedTasks,
    activeFilterClass,
    clearCompletedTasks,
  }
})
