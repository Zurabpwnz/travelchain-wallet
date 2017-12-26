<template lang="pug">
    q-layout

            q-card-title
                q-icon.head-icon(name="vertical_align_bottom")
                | Purchased Data - check purchased information
            q-card-main
                q-data-table(:data="table" :columns="columns")
                    template(slot="col-message" scope="cell")
                        span.light-paragraph
                            | Hello

                    template(slot="col-source" scope="cell")
                        span.label.text-white.bg-primary
                            | Audit
                            q-tooltip
                                | Some data
            q-card-separator
            q-card-title
                q-icon.head-icon(name="search")
                | Data Search - find and buy information with TT
            q-card-main
                q-data-table(:data="table" :columns="columns")
                    template(slot="col-message" scope="cell")
                        span.light-paragraph
                            | Hello

                    template(slot="col-source" scope="cell")
                        span.label.text-white.bg-primary
                            | Audit
                            q-tooltip
                                | Some data

            
</template>

<script lang="ts">
import Vue from 'vue'
import store from 'store'
import {Google, VK, Facebook} from '../modules/Social'
import Component from 'vue-class-component'
import {
    QLayout,
    QInput,
    QCard,
    QCardMain,
    QCardTitle,
    QCardActions,
    QCardSeparator,
    QDataTable,
    QIcon,
    QBtn,
} from 'quasar';

@Component({
    name: 'appdata',
    components: {
        QLayout,
        QInput,
        QCard,
        QCardMain,
        QCardTitle,
        QCardActions,
        QCardSeparator,
        QDataTable,
        QIcon,
        QBtn,
    }
})
export default class Data extends Vue {
    public socials = [
        new Google(),
        new VK(),
        new Facebook()
    ];

    public columns = [
        {
            label: 'Username',
            field: 'username'
        },
        {
            label: 'Type',
            field: 'type'
        },
        {
            label: 'Action',
            field: 'action'
        }
    ];

    public table = [
        {
            "username": "TheDeveloperTom",
            "type": "Type",
            "action": "Buy",
        },
        {
            "username": "TheDeveloperTom",
            "type": "Type",
            "action": "Buy",
        },
        {
            "username": "TheDeveloperTom",
            "type": "Type",
            "action": "Buy",
        },
    ];

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


    .head-icon
        font-size 1.5em
        margin-top -0.25rem
        margin-right 0.5rem

    #social-logger
        .q-btn
            &.connect
                min-width 180px
            &.roudedtt
                height 45px
                width 45px
                margin-right 1rem
                font-size 0.8em
                line-height 1

        .fa:before
            width 40px
            min-height 36px
            margin -16px 15px -16px -16px
            justify-content center
            align-items center
            display flex
            color #fff

        span
            font-family 'Roboto', '-apple-system', 'Helvetica Neue', Helvetica, Arial, sans-serif

        .fa-google-plus:before
            hoverize(social-google-back)

        .fa-facebook:before
            hoverize(social-facebook-back)

        .fa-vk:before
            hoverize(social-vk-back)
</style>