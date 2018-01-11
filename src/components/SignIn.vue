<template lang="pug">
    div
        q-card-main
            q-field(
                icon="fa-user"
                helper="Enter your username"
                :error="!errors.username.isValid"
                :error-label="errors.username.errorMessage"
            )
                q-input(
                    float-label="Username"
                    @input="updateUsername"
                    v-model="username"
                )

            q-field(
                icon="fa-key"
                helper="Enter your password"
                :error="!errors.password.isValid"
                :error-label="errors.password.errorMessage"
                count
            )
                q-input(
                    type="password"
                    float-label="Password"
                    v-model="password",
                    @input="updatePassword"
                )
        q-card-actions(align="center")
            q-btn(
              @click="signIn()"
              :disable="isSubbmitAllowed"
              big
              color="secondary"
              )
                | Sign In
        slot(name="footer")

</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component, Model, Prop, Emit } from 'vue-property-decorator'
    import {
      QField,
      QInput,
      QCard,
      QCardTitle,
      QCardMain,
      QCardActions,
      QBtn
      } from 'quasar'

    @Component({
      components: {
        QField,
        QInput,
        QCard,
        QCardActions,
        QCardMain,
        QBtn
      }
    })
    export default class SignIn extends Vue {
      @Prop(Object)
      errors

      @Prop(Boolean)
      isUsernameValid: boolean

      @Prop(Boolean)
      isPasswordValid: boolean

      @Emit('usernameChanged')
      updateUsername (username) {}

      @Emit('passwordChanged')
      updatePassword (password) {}

      // TODO wrap in Emit decorator
      signIn () {
        this.$emit('login', this.username, this.password)
      }

      username: String = ''
      password: String = ''

      get isSubbmitAllowed (): boolean {
        return !this.username
              || !this.password
              || !this.errors.username.isValid
              || !this.errors.password.isValid
      }
    }
</script>
