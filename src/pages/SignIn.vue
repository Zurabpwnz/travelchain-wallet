<template lang="pug">
    div#welcome-page.column.items-center.justify-center
        img(src="/statics/logo.svg")
        p {{ $t('welcome-text') }}
        br
        br
        q-layout.flex.justify-center
            q-btn.signin(color="green" @click="isOpenedModalSignIn = true") {{ $t('action.signin') }}
            q-btn.signup(color="blue" @click="isOpenedModalSignUp = true") {{ $t('action.signup') }}



        q-modal.welcome-sign-form(v-model="isOpenedModalSignIn")
            h5.text-center {{ $t('action.signin') }}
            sign-in-container



        q-modal.welcome-sign-form(v-model="isOpenedModalSignUp")
            h5.text-center {{ $t('action.signup') }}
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
