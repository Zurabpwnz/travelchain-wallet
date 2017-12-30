<template lang="pug">
    div
        q-card-main
            q-field(
                icon="fa-user"
                helper="Enter your username"
                :error="validator.username.$error"
                :error-label="!validator.username.isUnique ? 'Username is already taken' : 'Minimum 3 symbols'"
            )
                q-input(
                    float-label="Username"
                    :after="conditionIcon('username')"
                    @input="updateUsername(username); validator.username.$touch();"
                    v-model.lazy="username"
                )

            q-field(
                icon="fa-key"
                helper="Enter your password"
                :error="validator.password.$error"
                error-label="Password must contains at least 12 symbols"
                count
            )
                q-input(
                    type="password"
                    float-label="Password"
                    :after="conditionIcon('password')"
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
                    :after="conditionIcon('repeatPassword')"
                    @input="updateRepeatPassword($event); validator.repeatPassword.$touch();"
                    v-model="repeatPassword"
                )
        q-card-actions(align="center")
            q-btn.full-width(
              big
              :value="isProcessValidating"
              :disable="validator.$invalid || isProcessValidating"
              color="secondary"
              @click="submit"
              )
                q-spinner-oval(slot="loading")
                | Sign Up

        slot(name="footer")
</template>

<script lang="ts">
import Vue from "vue"
import {Component, Model, Prop, Emit} from 'vue-property-decorator'
import {
    QField,
    QInput,
    QCard,
    QCardTitle,
    QCardMain,
    QSpinnerOval,
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
        QSpinnerOval,
        QCardActions,
        QCardMain,
        QBtn
    }
})
export default class SignUpPresentation extends Vue {
    @Prop()
    validator: SignUpForm

    @Prop()
    isProcessValidating: boolean

    username: string = ''
    password: string = ''
    repeatPassword: string = ''

    @Emit('usernameChanged')
    updateUsername(e) {/* Pass username to the container component */
    }

    @Emit('passwordChanged')
    updatePassword(e) {/* Pass password to the container component */
    }

    @Emit('repeatPasswordChanged')
    updateRepeatPassword(e) {/* Pass repeatPassword to the container component */
    }

    @Emit('submit')
    submit() {
    }

    conditionIcon(property) {
        const v = this.validator;
        return [
            {
                icon: 'error', error: true, handler() {
                }
            },
            {
                icon: 'done',
                condition: (!v[property].$error && v[property].$dirty),
                handler() {
                }
            }
        ]
    }
}
</script>