import { createStore } from 'vuex';

import { auth, usersCollection } from '@/firebase/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  mutations: {
    toggleAuthModal(state) {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  actions: {
    initLogin({ commit }) {
      const user = auth.currentUser;

      if (user) commit('toggleAuth');
    },
    async register({ commit }, payload) {
      const { email, password, name, age, country } = payload;

      const userCredentials = await auth.createUserWithEmailAndPassword(email, password);

      await usersCollection.doc(userCredentials.user.uid).set({ name, email, age, country });

      await userCredentials.user.updateProfile({ displayName: name });

      commit('toggleAuth');
    },
    async login({ commit }, payload) {
      const { email, password } = payload;

      await auth.signInWithEmailAndPassword(email, password);

      commit('toggleAuth');
    },
    async signOut({ commit }) {
      try {
        await auth.signOut();
      } catch (error) {
        console.log(error);
        // eslint-disable-next-line no-alert
        alert('Unexpected error occured! Please try again later.');
        return;
      }

      commit('toggleAuth');
    },
  },
});
