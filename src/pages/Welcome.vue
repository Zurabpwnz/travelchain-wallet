<template lang="pug">
    q-layout
      div.row.justify-center.md-gutter

        q-card.col-md-4.col-xs-12.col-sm-10
            q-card-title
                q-icon.head-icon(name="account balance wallet")
                | Wallet
            q-card-separator
            q-card-main(align="center")
                p.big
                    | {{ auth.userBalance }} TT
            q-card-separator
            q-card-actions(align="end")
                q-btn(flat @click="$router.push('/purchase')")
                    | Transfer



        q-card.col-md-4.col-xs-12.col-sm-10
            q-card-title
                q-icon.head-icon(name="linear scale")
                | Referal link
            q-card-separator
            q-card-main
                p
                    q-input(:value="'https://data.travelchain.io/?r=' + username" readonly)#reflink
            q-card-separator
            q-card-actions(align="end")
                q-btn(@click="copySucceeded1 = true" v-clipboard:copy="copy" flat) 
                    | {{ copyButtonText }}
                q-btn(flat @click="isOpenHIWModal = true")
                    | How it works



        q-card.col-md-4.col-xs-12.col-sm-10
            q-card-title
                q-icon.head-icon(name="assignment ind")
                | Units of Information
            q-card-separator
            q-card-main(align="center")
                p.big
                    | {{ auth.userContacts.length }}
            q-card-separator
            q-card-actions(align="end")
                q-btn(flat @click="$router.push('/data')")
                    | Go to my data



        q-card.col-md-4.col-xs-12.col-sm-10
            q-card-title
                q-icon.head-icon(name="account balance wallet")
                | Active proposals
            q-card-separator
            q-card-main(align="center")
                p.big
                    | {{ auth.userProposals.length }}
            q-card-separator
            q-card-actions(align="end")
                q-btn(flat @click="$router.push('/proposals')")
                    | Go to Proposals



        q-modal(ref="decodedData" v-model="isOpenHIWModal" minimized)
            h5
                | How working referral link
            br

            p(style="max-width: 500px")
                | Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                | sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                | Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                | consequat.
                | Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                | Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                | laborum

            br

            q-btn(@click="isOpenHIWModal = false" color="blue")
                | Close
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import store from '../../node_modules/store';
    import VueClipboard from 'vue-clipboard2';
    import '../modules/class-component-hooks';
    import { State, Mutation } from 'vuex-class';
    import {
        QLayout,
        QInput,
        QCard,
        QCardMain,
        QCardTitle,
        QCardActions,
        QCardSeparator,
        QModal,
        QIcon,
        QBtn,
    } from 'quasar';

    Vue.use(VueClipboard);

    @Component({
        name: 'welcome',
        components: {
            QLayout,
            QInput,
            QCard,
            QCardMain,
            QCardTitle,
            QCardActions,
            QCardSeparator,
            QModal,
            QIcon,
            QBtn,
        }
    })
    export default class Index extends Vue
    {
        @State auth;

        public isOpenHIWModal = false;
        public copySucceeded1 = false;

        get username () {
            return this.$store.state.auth.username || 'Username';
        }

        get copyButtonText () {
            return this.copySucceeded1 ? 'Copied!' : 'Copy';
        }

        get copy () {
            return `https://data.travelchain.io/?r=${this.username}`;
        }
    }
</script>