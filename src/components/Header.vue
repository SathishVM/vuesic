<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'Home' }"
        exact-active-class="no-active"
      >
        Vuesic
      </router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'About' }">About</router-link>
          </li>
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" href="#" @click="toggleAuthModal">Login / Register</a>
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'Manage' }">Manage</router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut">Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'AppHeader',
  computed: {
    ...mapState(['userLoggedIn']),
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
    async signOut() {
      await this.$store.dispatch('signOut');
      if (this.$route.meta.requiresAuth) this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style></style>
