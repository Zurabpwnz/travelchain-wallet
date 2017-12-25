<template lang="pug">
    .row.justify-center.items-center.max-available-height.col-12
        q-card(:flat="true").col-xs-12.col-md-6.col-sm-10.md-gutter
            q-card-main
                q-field(
                    icon="fa-user"
                    helper="Enter your username"
                    :error="!isUsernameValid"
                    error-label="This username does not exist"
                )
                    q-input(
                        float-label="Username"
                        v-model="username"
                    )


                q-field(
                    icon="fa-key"
                    helper="Enter your password"
                    :error="!isPasswordValid"
                    error-label="Wrong password"
                )
                    q-input(
                        type="password"
                        float-label="Password"
                        v-model="password"
                    )
            q-card-actions(align="center")
                q-btn(big color="secondary").full-width
                    | Sign In

</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
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
    username: String = ''
    password: String = ''

    mounted () {    
    }

    get isUsernameValid (): boolean {
        return true
    }

    get isPasswordValid (): boolean {
        return true
    }
}
</script>

<style lang="stylus">
.max-available-height
    height: calc(100vh - 50px)
</style>


