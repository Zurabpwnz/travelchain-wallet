<template lang="pug">
    q-layout
        q-card
            q-card-title
                q-icon.head-icon(name="work")
                | Basic Data-Sources - Connect your basic data-sources and get TravelToken for it.

            q-card-main#social-logger
                p
                    q-btn.connect(icon="phone" @click="openModal_Phone=!openModal_Phone")
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
                            span.text
                                | {{ social.info.name }}
                        span.text(v-else)
                            | Подключить
            
            q-card-separator
            q-card-title
                q-icon.head-icon(name="assignment ind")
                | My Data - your published and encrypted data.

            q-card-main
                q-data-table(:data="table" :columns="columns")
                    template(slot="col-action" slot-scope="cell")
                        q-btn(color="blue")
                            | {{ cell.data }}

            q-modal(v-model="openModal_Phone" minimized)
                h4
                    | Hello

                q-input(
                    v-model="phoneNumber"
                    placeholder="Your phone"
                )

                br
                q-btn(color="green" @click="connectPhoneNumber" :disabled="!phoneNumberValidate()")
                    | Connect number
                q-btn(color="red" @click="openModal_Phone=false")
                    | Cancel
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
        QModal,
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
            QModal,
            QIcon,
            QBtn,
        }
    })
    export default class Data extends Vue {
        public openModal_Phone = false
        public phoneNumber = ""

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

            this.$watch('phoneNumber', (value) => {
                value = value.match(/([0-9])/g)
                value = value ? value.join('') : ""
                if( value[0] != "+" ) value = "+"+ value
                if( value.length > 13 ) value = value.substring(0, 13)
                this.phoneNumber = value
            })
        }

        connectPhoneNumber()
        {
            this.openModal_Phone = false;
            console.log( this.phoneNumber );
        }

        phoneNumberValidate()
        {
            return this.phoneNumber.length == 13
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
                ( response as String ).substring(1).split("&").forEach(function(par)
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