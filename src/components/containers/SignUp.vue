<template lang="pug">
    sign-up(
      :validator="$v" 
      @usernameChanged="e => username = e"
      @passwordChanged="e => password = e"
      @repeatPasswordChanged="e => repeatPassword = e"
    )
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import SignUp from '../SignUp.vue'
import { Toast } from 'quasar'
import { required, sameAs, minLength } from 'vuelidate/lib/validators'


@Component({
  components: { SignUp },
  validations: {
    username: {
      required,
      minLength: minLength(3)
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  }
})
export default class SignUpContainer extends Vue {
    username: string = ''
    password: string = ''
    repeatPassword: string = '' 

  signUp () {
    this.$v.form.$touch()
    if (this.$v.form.$error) {
      Toast.create('Please review fields again.')
      return
    }
  }
}
</script>

<style lang="stylus">
</style>