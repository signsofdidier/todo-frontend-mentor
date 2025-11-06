<script setup>
const tasks = [
  { id: 1, title: 'Taak 1', completed: false },
  { id: 2, title: 'Taak 2', completed: false },
  { id: 3, title: 'Taak 3', completed: false },
]
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
      <form class="mt-9 shadow-md">
        <label class="w-full bg-white px-5 py-5 rounded-lg border-0 flex items-center">
          <div class="flex items-center w-full">
            <!-- checkbox -->
            <input
              type="checkbox"
              class="list-checkbox appearance-none border border-gray-300 rounded-full mr-4"
            />
            <!-- input -->
            <input
              type="text"
              class="placeholder:font-700 placeholder:text-gray-500 font-700 text-gray-500 focus:outline-none flex-1"
              placeholder="Currently typing"
            />
          </div>
          <button type="submit" class="ps-3">Add</button>
        </label>
      </form>

      <!-- TODO LIST -->
      <div class="mt-9 shadow-xl rounded-lg overflow-hidden border-0">
        <!-- Todo list item -->
        <label
          v-for="task in tasks"
          :key="task.id"
          class="w-full bg-white px-5 py-5 border-b-1 border-b-gray-200 flex items-center"
        >
          <div class="flex items-center w-full">
            <!-- checkbox -->
            <input
              type="checkbox"
              class="list-checkbox appearance-none border border-gray-300 rounded-full mr-4"
            />
            <!-- title -->
            <span class="font-700 text-gray-500 flex-1">{{ task.title }}</span>
          </div>
          <button class="ps-3">
            <img src="@/assets/images/icon-cross.svg" alt="remove icon" />
          </button>
        </label>

        <!-- filters -->
        <div class="flex justify-between items-center px-4 py-3 bg-white">
          <div class="text-sm text-gray-400">
            {{ tasks.length }} item{{ tasks.length === 1 ? '' : 's' }} left
          </div>
          <div class="space-x-3">
            <button class="text-sm text-gray-600 font-bold">All</button>
            <button class="text-sm text-gray-600 font-bold">Active</button>
            <button class="text-sm text-gray-600 font-bold">Completed</button>
          </div>
          <div class="text-sm text-gray-600">Clear Completed</div>
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
