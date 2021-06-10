<template>
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        type="password"
        name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700"
      :disabled="loggingIn"
    >
      {{ loginBtnText }}
    </button>
  </vee-form>
</template>

<script>
export default {
  name: 'LoginForm',
  data: () => ({
    loginSchema: {
      email: 'required|email',
      password: 'required|min:8|max:20',
    },
    loggingIn: false,
    loginBtnText: 'Submit',
  }),
  methods: {
    async login(values) {
      this.loggingIn = true;
      this.loginBtnText = 'Please wait! We are logging you in.';

      try {
        await this.$store.dispatch('login', values);
      } catch (error) {
        this.loggingIn = false;
        this.loginBtnText = 'Submit';
        // eslint-disable-next-line no-alert
        alert('Invalid Credentials.');
        return;
      }

      this.loggingIn = false;
      this.loginBtnText = 'You are logged in.';
      window.location.reload();
    },
  },
};
</script>

<style></style>
