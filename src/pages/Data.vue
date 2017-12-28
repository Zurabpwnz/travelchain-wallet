<template lang="pug">
    q-layout
        q-card
            q-card-title
                q-icon.head-icon(name="work")
                | Basic Data-Sources - Connect your basic data-sources and get TravelToken for it.
            q-card-main#social-logger
                p(v-if="!isVerifiedPhone")
                    q-btn.connect(icon="phone" @click="isOpenedModalPhone = true")
                        span.cost
                            | + 1 TT
                        span.text
                            | Phone

                p(v-for="social in socials" v-if="!social.info.name")
                    q-btn.connect(@click="connectSocial(social)")
                        span.cost
                            | + 2 TT
                        span(:class="'fa fa-' + social.name")
                        span.text
                            | Bind social


            q-card-separator
            q-card-title
                q-icon.head-icon(name="assignment ind")
                | My Data - your published and encrypted data.

            q-card-main
                q-data-table(:data="tableContactsData" :columns="tableContactsColumns")
                    template(slot="col-action" slot-scope="cell")
                        q-btn(color="blue")
                            | {{ cell.data }}
                    template(slot="col-avatar" slot-scope="cell" v-if="cell.data")
                        img.rounded(:src="cell.data")


            template(v-if="!isVerifiedPhone")
                q-modal(ref="bindingPhoneModal" v-model="isOpenedModalPhone" minimized)
                    h5
                        | Bind your phone

                    ai-phone(
                        :number="phoneNumber"
                        @onComplete="(number) => this.phoneNumber = number"
                        @onClear="() => this.phoneNumber = ''"
                    )

                    template(v-if="isWaitingForSMS")
                        q-input(v-model="smsCode" placeholder="Code")
                        br
                        q-btn(color="green" @click="connectPhoneNumber")
                            | Bind number

                    br(v-if="!isWaitingForSMS")
                    q-btn(
                        color="green"
                        @click="connectPhoneNumber"
                        :disabled="!phoneNumber.length"
                        v-if="!isWaitingForSMS"
                    )
                        | Verify number

                    q-btn(color="red" @click="isOpenedModalPhone = false")
                        | Cancel
</template>

<script lang="ts">
    import Vue from 'vue'
    import store from '../../node_modules/store'
    import {Google, VK, Facebook} from '../modules/Social'
    import Component from 'vue-class-component'
    import Notifier from '../modules/Notifier';
    import {
        Alert,
        QLayout,
        QInput,
        QCard,
        QCardMain,
        QCardTitle,
        QCardActions,
        QCardSeparator,
        QDataTable,
        QSelect,
        QModal,
        QIcon,
        QBtn,
    } from 'quasar';

    @Component({
        name: 'appdata',
        components: {
            Alert,
            QLayout,
            QInput,
            QCard,
            QCardMain,
            QCardTitle,
            QCardActions,
            QCardSeparator,
            QDataTable,
            QSelect,
            QModal,
            QIcon,
            QBtn,
        }
    })
    export default class Data extends Vue {
        public isOpenedModalPhone = false;
        public isWaitingForSMS = false;
        public isVerifiedPhone = false;
        public phoneNumber = "";
        public verifyCode = "";
        public smsCode = "";

        public socials = [ new VK(), new Facebook(), new Google(), ];

        public tableContactsColumns = [
            { label: 'Avatar', field: 'avatar', width: '60px' },
            { label: 'Username', field: 'username' },
            { label: 'Type', field: 'type' },
            { label: 'Action', field: 'action' }
        ];
        public tableContactsData = new Array();

        mounted()
        {
            for(let social of this.socials)
                if(social.store && store.get(social.store)
                   && store.get(social.store).hasOwnProperty("access_token"))
                    social.process( store.get(social.store) ).then(this.updateData);

            if( store.get('account.phone') )
            {
                this.isVerifiedPhone = true;
                this.phoneNumber = store.get('account.phone');
                this.tableContactsData.push({
                    username: this.phoneNumber,
                    type: "Phone",
                    action: 'Show',
                });
            }
        }

        connectPhoneNumber()
        {
            if( this.isWaitingForSMS )
            {
                if( this.verifyCode == this.smsCode )
                {
                    // TODO save this.phoneNumber into DB by backend

                    store.set('account.phone', this.phoneNumber);

                    this.tableContactsData.push({
                        username: this.phoneNumber,
                        type: "Phone",
                        action: 'Show',
                    });
                    this.isVerifiedPhone = true;
                    this.isWaitingForSMS = false;
                    this.isOpenedModalPhone = false;
                    Notifier.notify({ msg: 'Number binded!' });
                }
                else Notifier.notify({ msg: 'Code is not true!', isNegative: true, id: "connectphonenumber" });

                return;
            }

            new Promise((resolve, reject) =>
            {
                // TODO sending request to sms-service by backend
                resolve();
            })
            .then((response) =>
            {
                this.isWaitingForSMS = true;
                this.verifyCode = "123456";
            })
            .catch((err) =>
            {
                Notifier.notify({ msg: err, isNegative: true });
            });
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
                social.process( data, true ).then(this.updateData);
            })
        }

        updateData(social)
        {
            let socialName = social.name.replace('-', ' ');
            socialName = socialName.split(' ').map((part) => {
                return part[0].toUpperCase() + part.substring(1);
            }).join(' ');

            this.tableContactsData.push({
                avatar: social.info.avatar,
                username: social.info.name,
                type: socialName,
                action: 'Show',
            });
        }
    }
</script>