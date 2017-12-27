<template lang="pug">
    q-layout
        q-card
            q-card-title
                q-icon.head-icon(name="work")
                | Basic Data-Sources - Connect your basic data-sources and get TravelToken for it.

            q-card-main#social-logger
                p
                    q-btn.connect(icon="phone")
                        span.cost
                            | + 1 TT
                        span.text
                            | Телефон

                p(v-for="social in socials")
                    q-btn.connect(@click="connectSocial(social)")
                        template(v-if="!social.info.name")
                            span.cost
                                | + 2 TT
                        span(:class="'fa fa-' + social.name")
                        template(v-if="social.info.name")
                            | {{ social.info.name }}
                        span.text(v-else)
                            | Подключить
            
            q-card-separator
            q-card-title
                q-icon.head-icon(name="assignment ind")
                | My Data - your published and encrypted data.

            q-card-main
                q-data-table(:data="table" :columns="columns")
                    template(slot="col-action" scope="cell")
                        q-btn(color="blue")
                            | {{ cell.data }}
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
            new VK(),
            new Facebook(),
            new Google(),
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
                "username": "DrGmes",
                "type": "Type",
                "action": "Show",
            },
            {
                "username": "DrGmes",
                "type": "Type",
                "action": "Show",
            },
            {
                "username": "DrGmes",
                "type": "Type",
                "action": "Show",
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