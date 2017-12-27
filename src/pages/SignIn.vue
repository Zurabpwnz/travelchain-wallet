<template lang="pug">
  sign-in-container
</template>

<script lang="ts">
    import Vue from "vue"
    import Component from "vue-class-component"
    import SignInContainer from "../components/containers/SignIn.vue"

    @Component({
      components: { SignInContainer }
    })
    export default class SignInPage extends Vue {

      mounted() {
      //@ts-ignore
        this.$parent.$parent.$refs.layout.hideLeft()
      }
    }
</script>