<template lang="pug">
    .row.justify-center.items-center.max-available-height.col-12
        sign-up-container.col-xs-12.col-md-6.col-sm-10.md-gutter
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