import { useLocalStorage } from '@/composables/useLocalStorage'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTodoListStore = defineStore('todoList', () => {
  const tasks = useLocalStorage('tasks', [])
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

  return {
    tasks,
    newTask,
    currentFilter,
    toggleCompleted,
    addTask,
    deleteTask,
    showAllTasks,
    showActiveTasks,
    showCompletedTasks,
    filteredTasks,
    clearCompletedTasks,
    hasCompletedTasks,
  }
})
