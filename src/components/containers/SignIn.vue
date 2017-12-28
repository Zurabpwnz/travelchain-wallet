<template lang="pug">
  div
    sign-in(
      :errors="validationErrors",
      @usernameChanged="validateUsername",
      @passwordChanged="validatePassword"
      @login="login"
    )
      .row.justify-center(slot="footer")
        router-link.text-center.full-wdith(to="/sign-up") Or Sign Up
</template>

<script lang="ts">
    import Vue from "vue"
    import { Component, Model, Prop } from 'vue-property-decorator'
    import SignIn from "../SignIn.vue"
    import Blockchain from '../../modules/blockchain.js'
    import { State, Mutation } from 'vuex-class'
    import { LoginState } from '../../types'

    @Component({
      components: { SignIn }
    })
    export default class SignInContainer extends Vue {

      @State('auth') loginState: LoginState
      @Mutation('login') loginMutation

      validationErrors = {
        username: { isValid: true, errorMessage: 'User does not exists' },
        password: { isValid: true, errorMessage: 'Wrong Password' }
      }

      // @Debounce(500)
      async validateUsername (username: string = '') {
        this.validationErrors.username.isValid = await Blockchain.doesUserExist(username)
      }

      validatePassword (password): void {
        if (password.length < 12) {
          this.validationErrors.password.isValid = false
          this.validationErrors.password.errorMessage = 'Password must be at least 12 symbols'
        } else {
         this.validationErrors.password.isValid = true
         this.validationErrors.password.errorMessage = ''
        }
      }

      async login (username: string, password: string) {
        try {
          await Blockchain.login(username, password)
          Blockchain.isAuth = true
          this.loginMutation(username)
          this.$router.push('/')
        } catch (e) {
          this.validationErrors.password.isValid = false
          this.validationErrors.password.errorMessage = e
        }
      }
    }
</script>