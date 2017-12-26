<template lang="pug">
  sign-in(
    :is-username-valid="isUsernameValid", 
    :is-password-valid="isPasswordValid", 
    :isDisabled="true",
    @usernameChanged="validateUsername",
    @login="login"
  )
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Model, Prop } from 'vue-property-decorator'
import SignIn from "../SignIn.vue"
import Blockchain from '../../modules/blockchain.js'
// import Debounce from 'debounce-decorator'

@Component({
  components: { SignIn }
})
export default class SignInContainer extends Vue {
  isUsernameValid: boolean = false
  isPasswordValid: boolean = false

  async validateUsername (username: string = '') {
    this.isUsernameValid = await Blockchain.doesUserExist(username)
  }

  validatePassword (password): void {
    this.isPasswordValid = false
  }

  login (username, password): void {
    Blockchain.login(username, password)
  }

  mounted() { 
    Blockchain.init().catch(() => document.write('Not connected to node!'))
  }

}
</script>

<style lang="stylus">

</style>