<template>
  <div class="error-page window-height window-width bg-light column items-center no-wrap">
    <div class="error-code bg-primary flex items-center content-center justify-center">
      404
    </div>
    <div>
      <div class="error-card shadow-4 bg-white column items-center justify-center no-wrap">
        <q-icon name="error_outline" color="grey-5" ></q-icon>
        <p class="caption text-center">Oops. Nothing here...</p>
        <p class="text-center group">
          <q-btn
            v-if="canGoBack"
            color="primary"
            push
            @click="goBack"
            icon="keyboard_arrow_left"
          >
            Go back
          </q-btn>
          <q-btn
            color="primary"
            push
            @click="$router.replace('/')"
            icon-right="home"
          >
            Go home
          </q-btn>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import Quasar from 'quasar';
  import Component from 'vue-class-component';
  import {
      QBtn,
      QIcon
  } from 'quasar';

  @Component({
      name: 'error404',
      components: {
          QBtn,
          QIcon,
      }
  })
  export default class Error404 extends Vue {

      get canGoBack(): boolean { return window.history.length > 1; }

      goBack(): void {
          window.history.go(-1);
      }

  }
</script>