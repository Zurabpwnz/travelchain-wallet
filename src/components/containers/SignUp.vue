<template lang="pug">
  sign-up
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import SignUp from '../SignUp.vue'

@Component({
  components: {SignUp}
})
export default class SignUpContainer extends Vue {

  mounted() { }
}
</script>

<style lang="stylus">
</style>