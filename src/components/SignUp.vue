<template lang="pug">
    .row.justify-center.items-center.max-available-height.col-12
        q-card(:flat="true").col-xs-12.col-md-6.col-sm-10.md-gutter
            q-card-main
                q-field(
                    icon="fa-user"
                    helper="Enter your username"
                    :error="validator.username.$error"
                    error-label="Username already exists"
                )
                    q-input(
                        float-label="Username"
                        @input="updateUsername($event); validator.username.$touch();"
                        v-model="username"
                    )

                q-field(
                    icon="fa-key"
                    helper="Enter your password"
                    :error="validator.password.$error"
                    error-label="Password must contains at least 6 symbols"
                    count
                )
                    q-input(
                        type="password"
                        float-label="Password"
                        :after="[{ icon: 'error', error: true, handler () {alert('copied!')}}]"
                        @input="updatePassword($event); validator.password.$touch();"
                        v-model="password"
                    )

                q-field(
                    icon="fa-key"
                    helper="Repeat your password"
                    :error="validator.repeatPassword.$error"
                    error-label="Passwords do not match"
                    count
                )
                    q-input(
                        type="password"
                        float-label="Password confirmation"
                        :after="[{ icon: 'error', error: true, handler () {}}]"
                        @input="updateRepeatPassword($event); validator.repeatPassword.$touch();"
                        v-model="repeatPassword"
                    )
            q-card-actions(align="center")
                q-btn.full-width(
                  @click="signIn()"
                  :disable="isSubbmitAllowed" 
                  big 
                  color="secondary"
                  )
                    | Sign Up

            slot(name="footer")    
</template>

<script lang="ts">
import Vue from "vue"
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


export interface SignUpForm {
  form: {
    username: string;
    password: string;
    repeatPassword: string;
  }
}

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

export default class SignUpPresentation extends Vue {
  @Prop()
  validator: SignUpForm

  isSubbmitAllowed: boolean = true

  username: string = ''
  password: string = ''
  repeatPassword: string = ''

  @Emit('usernameChanged')
  updateUsername (e) {/* Pass username to the container component */}

  @Emit('passwordChanged')
  updatePassword (e) {/* Pass password to the container component */}

  @Emit('repeatPasswordChanged')
  updateRepeatPassword (e) {/* Pass repeatPassword to the container component */}
}
</script>

<style lang="stylus">
</style>