<template lang="pug">
  div
    sign-in(
      :errors="validationErrors",
      @usernameChanged="validateUsername",
      @passwordChanged="validatePassword"
      @login="login"
    )
</template>

<script lang="ts">
    import Vue from "vue"
    import { Component, Model, Prop } from 'vue-property-decorator'
    import SignIn from "../SignIn.vue"
    import Debounce from 'debounce-decorator'
    import Blockchain from '../../modules/blockchain.js'
    import { State, Mutation } from 'vuex-class'
    import { LoginState } from '../../types'

    @Component({
      components: { SignIn }
    })
    export default class SignInContainer extends Vue
    {
        @State('auth') loginState: LoginState
        @Mutation('login') loginMutation

        validationErrors = {
            username: { isValid: true, errorMessage: 'User does not exists' },
            password: { isValid: true, errorMessage: 'Wrong Password' }
        }

        @Debounce(500)
        validateUsername (username: string = '', validationErrors) {
            Blockchain.doesUserExist(username).then((res) => {
                validationErrors.username.isValid = res
            })
        }

        validatePassword (password): void
        {
            if (password.length < 12) {
                this.validationErrors.password.isValid = false
                this.validationErrors.password.errorMessage = 'Password must be at least 12 symbols'
            } else {
                this.validationErrors.password.isValid = true
                this.validationErrors.password.errorMessage = ''
            }
        }

        async login (username: string, password: string)
        {
            try {
                await Blockchain.login(username, password)
                Blockchain.isAuth = true
                this.loginMutation(username)
                this.$router.push('/')
                location.reload()
            } catch (e) {
                this.validationErrors.password.isValid = false
                this.validationErrors.password.errorMessage = e
            }
        }
    }
</script>