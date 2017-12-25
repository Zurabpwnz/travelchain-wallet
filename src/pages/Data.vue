<template lang="pug">
    #social-logger
        p.social-line(v-for="social in socials")
            span(:class="'fa fa-' + social.name" @click="connectSocial(social)")
            template(v-if="social.info.name")
                span.img
                    img(:src="social.info.avatar")
                span.name
                    | {{ social.info.name }}
            
            span(v-else)
                | Не привязан
</template>

<script lang="ts">
import Vue from 'vue'
import store from 'store'
import {Google, VK, Facebook} from '../components/Social'
import Component from 'vue-class-component'

@Component({})
export default class Data extends Vue {
    public socials = [
        new Google(),
        new VK(),
        new Facebook()
    ]

    mounted()
    {
        for(let social of this.socials)
            if(social.store && store.get(social.store) 
               && store.get(social.store).hasOwnProperty("access_token"))
                social.process( store.get(social.store) )
    }

    connectSocial(social)
    {
        if( !social.url ) return

        var authWindow
        new Promise((resolve, reject) =>
        {
            authWindow = window.open(social.getGoto(), "Auth in TravelChain AI", "width=800,height=700")
            var checker = setInterval(() =>
            {
                try {
                    if( authWindow.location.href != "about:blank" )
                    {
                        if( authWindow.location.href.indexOf(this.socials[0].redirectURL) != -1 )
                        {
                            clearInterval(checker)
                            resolve( authWindow.location.hash || authWindow.location.search )
                        }
                    }
                }
                catch(err) {}
            }, 500)
        })
        .then((response) =>
        {
            let data = {};
            ( response as String ).substring(2).split("&").forEach(function(par)
            {
                data[ par.split("=")[0] ] = par.split("=")[1]
            })

            authWindow.close()
            if( social.store ) store.set(social.store, data)
            social.process( data )
        })
    }
}
</script>

<style lang="stylus">
    social-facebook-back = #3f5d9b
    social-google-back = #db4437
    social-vk-back = #5281b7

    hoverize(color)
        background-color color

    #social-logger
        display flex
        flex-wrap wrap
        flex-direction column

        .social-line
            min-height 4em
            display flex
            align-items center

            span.fa
                width 2.5em
                height 2.5em
                margin-right 0.5em
                display flex
                align-items center
                justify-content center
                transition 200ms background
                border-radius 3px
                cursor pointer
                color #fff

                &.fa-google-plus
                    hoverize(social-google-back)

                &.fa-facebook
                    hoverize(social-facebook-back)

                &.fa-vk
                    hoverize(social-vk-back)

            span.img
                width 3em
                height 3em
                overflow hidden
                border-radius 50%
                margin-left 2em
                margin-right 1em
                box-shadow #000 1px 1px 4px -1px

                img
                    width 100%
                    height 100%
                    object-fit cover
                    object-position 50% 0
</style>