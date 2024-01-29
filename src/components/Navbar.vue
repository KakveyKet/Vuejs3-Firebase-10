<template>
  <div
    class="w-3/4 mx-auto p-10 shadow-md bg-white rounded-md flex justify-between items-center"
  >
    <div>
      <router-link to="/" class="text-blue-600 font-bold text-4xl">
        Technology Blog
      </router-link>
    </div>
    <div class="flex justify-end space-x-3">
      <router-link
        class="text-gray-400 font-semibold hover:text-blue-600 duration-300"
        to="/"
      >
        Home
      </router-link>
      <router-link
        class="text-gray-400 font-semibold hover:text-blue-600 duration-300"
        to="/createpost"
      >
        Create Post
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style>
a.router-link-active {
  color: #2563ed;
}
</style>
