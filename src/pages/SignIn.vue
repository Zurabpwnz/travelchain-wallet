<template lang="pug">
    div#welcome-page.column.items-center.justify-center.max-available-height
        img(src="/statics/favicon-travelai.png")
        p Welcome to TravelAi - service where you can exchange your social Data
        br
        br
        q-layout.flex.justify-center
            q-btn.signin(color="green" @click="isOpenedModalSignIn = true") Sign In
            q-btn.signup(color="blue" @click="isOpenedModalSignUp = true") Sign Up



        q-modal#welcome-sigin(v-model="isOpenedModalSignIn")
            h5 Sign in
            sign-in-container



        q-modal#welcome-sigin(v-model="isOpenedModalSignUp")
            h5 Sign up
            sign-up-container
</template>

<script lang="ts">
    import Vue from "vue"
    import Component from "vue-class-component"
    import SignInContainer from "../components/containers/SignIn.vue"
    import SignUpContainer from "../components/containers/SignUp.vue"
    import {
        QLayout,
        QModal,
        QBtn,
    } from 'quasar'

    @Component({
        components: {
            SignInContainer,
            SignUpContainer,
            QLayout,
            QModal,
            QBtn,
        }
    })
    export default class SignInPage extends Vue
    {
        public isOpenedModalSignIn = false
        public isOpenedModalSignUp = false

        mounted ()
        {
            // @ts-ignore
            this.$parent.$parent.$refs.layout.hideLeft()
        }
    }
</script>