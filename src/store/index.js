import { createStore } from 'vuex';
import { Howl } from 'howler';

import { auth, usersCollection } from '@/firebase/firebase';
import helper from '@/plugins/helper';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%',
  },
  getters: {
    playing(state) {
      if (state.sound.playing) return state.sound.playing();
      return false;
    },
  },
  mutations: {
    toggleAuthModal(state) {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
    newSong(state, payload) {
      if (state.sound instanceof Howl) {
        state.sound.unload();
      }

      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },
    updatePosition(state) {
      state.seek = helper.formatTime(state.sound.seek());
      state.duration = helper.formatTime(state.sound.duration());
      state.playerProgress = `${(state.sound.seek() / state.sound.duration()) * 100}%`;
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
    async newSong({ commit, state, dispatch }, payload) {
      commit('newSong', payload);
      state.sound.play();

      state.sound.on('play', () => {
        requestAnimationFrame(() => dispatch('progress'));
      });
    },
    async toggleAudio({ state }) {
      // eslint-disable-next-line no-useless-return
      if (!state.sound.playing) return;

      if (state.sound.playing()) state.sound.pause();
      else state.sound.play();
    },
    progress({ commit, state, dispatch }) {
      commit('updatePosition');

      if (state.sound.playing()) {
        requestAnimationFrame(() => dispatch('progress'));
      }
    },
    updateSeek({ state }, payload) {
      // eslint-disable-next-line no-useless-return
      if (!state.sound.playing) return;

      const { x, width } = payload.currentTarget.getBoundingClientRect();
      const clientX = payload.clientX - x;
      const percentage = clientX / width;
      const seconds = state.sound.duration() * percentage;

      state.sound.seek(seconds);

      state.sound.once('seek', () => this.dispatch('progress'));
    },
  },
});
