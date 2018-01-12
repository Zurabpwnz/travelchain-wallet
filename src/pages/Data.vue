<template lang="pug">
    q-layout
        q-card-title
            h3.page-title My data
            h4.page-subtitle Publish data into the blockchain
            p.page-desc Connect your basic data sources and get TravelToken for it.


        q-card-main#social-logger
            p(v-if="!isVerifiedPhone")
                q-btn.connect(icon="phone" @click="isOpenedModalPhone = true")
                    span.text
                        | Phone
                span.cost
                    | + 1 TT

            p(v-for="social in socials" v-if="socialsBinded.indexOf( social.name ) == -1")
                q-btn.connect(@click="connectSocial(social)")
                    span(:class="'fa fa-' + social.name")
                    span.text
                        | Bind social
                span.cost
                    | + 2 TT




        q-card-title
            p.page-desc My data - published and encryped data.


        q-card-main
            q-data-table(:data="tableContactsData" :columns="tableContactsColumns")
              template(slot="col-action" slot-scope="cell")
                q-btn(color="blue" @click="openDecodedDataModal(cell.row)")
                  | Show
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
                q-input(v-model="smsCode" placeholder="Enter any code")
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



        q-modal(ref="decodedData" v-model="isOpenDecodedDataModal" minimized)
          h5
            | View binded decoded Data

          q-input(
          type="textarea"
          v-model="decodedUserData"
          float-label="Decoded data"
          style="width: 600px; max-width: 100%"
          )

          br

          q-btn(@click="isOpenDecodedDataModal = false" color="blue")
            | Close
</template>

<script lang="ts">
    import Vue from 'vue';
    import store from '../../node_modules/store';
    import {Google, VK, Facebook} from '../modules/Social';
    import Component from 'vue-class-component';
    import Notifier from '../modules/Notifier';
    import { State, Mutation } from 'vuex-class';
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
    export default class Data extends Vue
    {
        @State auth
        @Mutation riseUpBalance
        @Mutation addContact

        public isOpenDecodedDataModal = false;
        public isOpenedModalPhone = false;
        public isWaitingForSMS = false;
        public isVerifiedPhone = false;
        public decodedUserData = "";
        public phoneNumber = "";
        public verifyCode = "";
        public smsCode = "";

        public socialsBinded = new Array();
        public socials = [ new VK(), new Facebook(), new Google(), ];

        public tableContactsColumns = [
            { label: 'Avatar', field: 'avatar', width: '60px' },
            { label: 'Username', field: 'username' },
            { label: 'Type', field: 'type' },
            { label: 'Action', field: 'action' }
        ];
        public tableContactsData = new Array();

        mounted ()
        {
            this.$watch('auth.userContacts', (value) =>
            {
                this.updateContactData();
            });
            this.updateContactData();
        }

        updateContactData ()
        {
            this.tableContactsData = new Array();
            for ( let i in this.auth.userContacts )
            {
                let contact = this.auth.userContacts[i];

                this.socialsBinded.push(contact.type.replace(" ", "-").toLowerCase());

                if ( contact.type == "phone" )
                {
                    this.isVerifiedPhone = true;
                    this.phoneNumber = contact.value;
                }

                if ( contact.global )
                    this.tableContactsData.push({
                        avatar: contact.avatar,
                        username: contact.value,
                        type: contact.type,
                    })
            }
        }

        connectPhoneNumber ()
        {
            if( this.isWaitingForSMS )
            {
                if( this.verifyCode == this.smsCode )
                {
                    // TODO save this.phoneNumber into DB by backend

                    this.riseUpBalance(1);
                    this.addContact({
                        value: this.phoneNumber,
                        type: 'phone',
                        global: false
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

        connectSocial (social)
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
                social.process( data, true ).then((social) => this.updateData(social, true));
            })
        }

        updateData (social, userInitiated = false)
        {
            let socialName = social.name.replace('-', ' ');
            socialName = socialName.split(' ').map((part) => {
                return part[0].toUpperCase() + part.substring(1);
            }).join(' ');

            if( userInitiated )
            {
                this.riseUpBalance(2);
                this.addContact({
                    avatar: social.info.avatar,
                    value: social.info.name,
                    type: socialName,
                    global: true
                });
            }
        }

        openDecodedDataModal (data)
        {
            this.decodedUserData = JSON.stringify(data, null, 4);
            this.isOpenDecodedDataModal = true;
        }
    }
</script>
