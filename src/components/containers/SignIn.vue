<template lang="pug">
  sign-in
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import SignIn from "../SignIn.vue"

@Component({
  components: { SignIn }
})
export default class SignInContainer extends Vue {

  mounted() { }
}
</script>

<style lang="stylus">

</style>