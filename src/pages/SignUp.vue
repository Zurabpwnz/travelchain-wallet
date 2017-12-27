<template lang="pug">
  sign-up-container
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import SignUpContainer from "../components/containers/SignUp.vue"

@Component({
  components: {
    SignUpContainer
  }
})
export default class SignUpPage extends Vue {

  mounted() {
    //@ts-ignore
    this.$parent.$parent.$refs.layout.hideLeft()
  }
}
</script>

<style lang="stylus">
</style>