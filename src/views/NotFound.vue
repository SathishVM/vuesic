<template>
  <div class="container mx-auto mt-10">
    <h1 class="font-bold text-5xl">
      The page you are looking for is not available ( OR ) not found.
    </h1>
    <router-link
      :to="{ name: 'Home' }"
      class="mt-5 inline-block bg-purple-600 text-white py-1.5 px-3 rounded transition
       hover:bg-purple-700"
    >
      Go Home
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style></style>
