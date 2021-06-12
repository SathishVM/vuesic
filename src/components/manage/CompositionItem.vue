<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modifiedName }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div class="text-white text-center p-4 mb-4 font-bold" v-if="showAlert" :class="alertVariant">
        {{ alertMessage }}
      </div>
      <vee-form :validation-schema="songSchema" :initial-values="song" @submit="editSongDetails">
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            type="text"
            name="modifiedName"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="modifiedName" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            type="text"
            name="genre"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="isSongEditInSubmission"
        >
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="isSongEditInSubmission"
          @click="showForm = false"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { songsCollection, storage } from '@/firebase/firebase';

export default {
  name: 'CompositionItem',
  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSongDetails: {
      type: Function,
      required: true,
    },
    removeSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    updateUnsavedFlag: {
      type: Function,
    },
  },
  data: () => ({
    showForm: false,
    songSchema: {
      modifiedName: 'required',
      genre: 'alpha_spaces',
    },
    isSongEditInSubmission: false,
    showAlert: false,
    alertVariant: 'bg-blue-500',
    alertMessage: 'Please wait! Updating song info.',
  }),
  methods: {
    async editSongDetails(values) {
      this.isSongEditInSubmission = true;
      this.showAlert = true;

      try {
        await songsCollection.doc(this.song.docId).update(values);
      } catch (error) {
        console.log(error);
        this.isSongEditInSubmission = false;
        this.alertVariant = 'bg-red-500';
        this.alertMessage = 'Something went wrong! Please try again later.';
        return;
      }

      this.updateSongDetails(this.index, values);
      this.updateUnsavedFlag(false);

      this.isSongEditInSubmission = false;
      this.alertVariant = 'bg-green-500';
      this.alertMessage = 'Success! Song updated successfully.';
    },
    async deleteSong() {
      const storageRef = storage.ref();
      const songRef = storageRef.child(`songs/${this.song.originalName}`);

      try {
        await songRef.delete();
        await songsCollection.doc(this.song.docId).delete();

        this.removeSong(this.index);
      } catch (error) {
        console.log(error);
        // eslint-disable-next-line no-alert
        alert('Something went wrong! Please try again later.');
        // eslint-disable-next-line no-useless-return
        return;
      }
    },
  },
};
</script>

<style></style>
