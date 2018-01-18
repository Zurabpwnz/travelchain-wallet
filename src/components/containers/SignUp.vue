<template lang="pug">
    sign-up(
        :isProcessValidating="isProcessValidating"
        :validator="$v"
        @usernameChanged="e => username = e"
        @emailChanged="e => email = e"
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
import {Toast} from 'quasar'
import {required, sameAs, minLength, email} from 'vuelidate/lib/validators'

@Component({
    components: {SignUp},
    validations: {
        username: {
            required,
            minLength: minLength(3),
            async isUnique(value) {
                if (value === '' || value.length <= 3) return true
                return !(await Blockchain.doesUserExist(value))
            }
        },

        email: {
            email,
            required
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
    email: string = ''
    password: string = ''
    repeatPassword: string = ''
    isProcessValidating: boolean = false

    async signUp() {
        this.$v.$touch()
        if (this.$v.$invalid) {
            Toast.create('Please review fields again.')
            return
        }

        this.isProcessValidating = true

        // TODO: Save this.email to backend

        Blockchain.signUp(this.username, this.password)
        .then(res => {
            this.isProcessValidating = false
            location.reload()
        })
        .catch(err => {
            this.isProcessValidating = false
            Toast.create(err)
        })
    }
}
</script>