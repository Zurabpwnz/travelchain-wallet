<template lang="pug">
  sign-in(
    :is-username-valid="isUsernameValid", 
    :is-password-valid="isPasswordValid", 
    :isDisabled="true",
    @usernameChanged="validateUsername"
  )
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Model, Prop } from 'vue-property-decorator'
import SignIn from "../SignIn.vue"
import Blockchain from '../../modules/blockchain.js'
import { debounce } from 'quasar'

@Component({
  components: { SignIn }
})
export default class SignInContainer extends Vue {
  isUsernameValid: boolean = false
  isPasswordValid: boolean = false

  validateUsername (username) {
    debounce(async () => {
       this.isUsernameValid  = await Blockchain.doesUserExist(username)
       console.log(this.isUsernameValid)
    }, 500).call(this)
    
  }

  validatePassword (password): void {
    this.isPasswordValid = false
  }

  mounted() { 
    Blockchain.init().catch(() => document.write('Not connected to node!'))
  }

}
</script>

<style lang="stylus">

</style>