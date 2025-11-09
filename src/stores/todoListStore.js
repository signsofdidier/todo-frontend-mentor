import { useLocalStorage } from '@/composables/useLocalStorage'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTodoListStore = defineStore('todoListStore', () => {
  //tasks
  const tasks = useLocalStorage('tasks', [])
  const newTask = ref('')
  const currentFilter = ref('all')

  //addTask
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

  //taskCompleted
  const toggleCompleted = (task) => {
    task.completed = !task.completed
  }

  //deleteTask
  const deleteTask = (id) => {
    tasks.value = tasks.value.filter((task) => task.id !== id)
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
    if (currentFilter.value === 'active') {
      return tasks.value.filter((task) => !task.completed)
    } else if (currentFilter.value === 'completed') {
      return tasks.value.filter((task) => task.completed)
    } else {
      return tasks.value
    }
  })

  const clearCompletedTasks = () => {
    const isConfirmed = confirm('Are you sure you want to clear all completed tasks?')
    if (isConfirmed) {
      tasks.value = tasks.value.filter((t) => !t.completed)
    }
  }

  return {
    tasks,
    newTask,
    addTask,
    toggleCompleted,
    deleteTask,
    currentFilter,
    showAllTasks,
    showActiveTasks,
    showCompletedTasks,
    filteredTasks,
    clearCompletedTasks,
  }
})
