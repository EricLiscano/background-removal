<template>
  <div style="display: flex; margin-bottom: 10%; flex-direction: column; align-items: center">
    <div style="margin: 2%">
      Background Removal Tool
      <p style="margin: 2%; font-style: italic">
        (Powered by
        <a
          href="https://www.remove.bg/"
          target="_blank"
          >remove.bg</a
        >)
      </p>
      <hr>
    </div>
    <div style="margin: 2%">Remueve el fondo de tu imagen con un click!</div>
  </div>
  <input
    type="file"
    name="remove"
    id="inputFile"
    accept="image/*"
    @change="setFile()"
  />
  <button @click="removeBackground">Remove Background</button>

  <div v-if="loading">Loading...</div>

  <div v-if="error">{{ error }}</div>

  <div style="margin-top: 100px; width: 1000px; height: 200px; justify-content: center; display: flex">
    <img
      :src="previewImage"
      alt="image"
    />
    <img
      :src="result"
      alt="result"
    />
  </div>
  <button @click="download()">Download</button>
</template>

<script>
  import { removeBackground } from '../src/api/backgroundRemovalApi';
  import { apiKey } from './keys/apiKey';
  export default {
    name: 'App',
    components: {},

    data() {
      return {
        previewImage: null,
        image: null,
        imageName: null,
        result: null,
        loading: false,
        error: null,
        apiKey: apiKey,
      };
    },

    methods: {
      /**
       * @return {void}
       */
      download() {
        const link = document.createElement('a');
        link.href = this.result;
        link.download = this.imageName + '_removed.jpg';
        link.click();
      },

      /**
       * @return {void}
       */
      async removeBackground() {
        this.loading = true;
        this.error = null;
        this.result = null;

        try {
          const result = await removeBackground(this.apiKey, this.image);

          if (result.errors) {
            this.error = result.errors[0].title + ' : ' + result.errors[0].code;
          }

          this.result = result;
        } catch (e) {
          console.log(e);
        } finally {
          this.loading = false;
        }
      },

      /**
       * @return {void}
       */
      setFile() {
        const fileInput = document.getElementById('inputFile');
        const fileName = fileInput.value.split(/(\\|\/)/g).pop();
        const file = fileInput.files[0];
        this.previewImage = URL.createObjectURL(file);
        this.image = file;
        this.imageName = fileName;

        console.log(this.image);
      },
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
