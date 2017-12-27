<template lang="pug">
    sign-up(
      :validator="$v" 
      @usernameChanged="e => username = e"
      @passwordChanged="e => password = e"
      @repeatPasswordChanged="e => repeatPassword = e",
      @submit="signUp"
    )
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import Blockchain from '../../modules/blockchain.js'
import SignUp from '../SignUp.vue'
import { Toast } from 'quasar'
import { required, sameAs, minLength } from 'vuelidate/lib/validators'

@Component({
  components: { SignUp },
  validations: {
    username: {
      required,
      minLength: minLength(3),
      async isUnique (value) {
        if (value === '' || value.length <= 3) return true
        return !(await Blockchain.doesUserExist(value))
      }
    },
    password: {
      required,
      minLength: minLength(12)
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

  async signUp () {
    this.$v.$touch()
    if (this.$v.$invalid) {
      Toast.create('Please review fields again.')
      return
    }

    try {
      await Blockchain.signUp(this.username, this.password)
    } catch (e) {
       Toast.create(e)
    }
    
  }
}
</script>

<style lang="stylus">
</style>