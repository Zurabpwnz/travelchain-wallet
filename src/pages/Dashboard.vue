<template lang="pug">
    q-layout
        q-card-title
            h3.page-title {{ $t('menu.dashboard.name', i18n.locale) }}
            h4.page-subtitle {{ $t('menu.dashboard.title', i18n.locale) }}

        div.row
            q-card.col-md-4.col-xs-12.col-sm-10
                q-card-title.text-center
                    q-icon.head-icon(name="account balance wallet")
                    | {{ $t('wallet', i18n.locale) }}
                q-card-main(align="center")
                    p.big
                        | {{ auth.userBalance }} TT
                q-card-actions(align="center")
                    q-btn(flat @click="$router.push('/purchase')")
                        | {{ $t('transfer', i18n.locale) }}



            q-card.col-md-4.col-xs-12.col-sm-10
                q-card-title.text-center
                    q-icon.head-icon(name="link")
                    | {{ $t('referal-link', i18n.locale) }}
                q-card-main
                    p
                        q-input(:value="'https://data.travelchain.io/?r=' + username" readonly)#reflink
                q-card-actions(align="center")
                    q-btn(@click="copySucceeded1 = true" v-clipboard:copy="copy" flat)
                        | {{ copyButtonText }}
                    q-btn(flat @click="isOpenHIWModal = true")
                        | {{ $t('how-it-works', i18n.locale) }}



            q-card.col-md-4.col-xs-12.col-sm-10
                q-card-title.text-center
                    q-icon.head-icon(name="info outline")
                    | {{ $t('units-of-information', i18n.locale) }}
                q-card-main(align="center")
                    p.big
                        | {{ auth.userContacts.length }}
                q-card-actions(align="center")
                    q-btn(flat @click="$router.push('/data')")
                        | {{ $t('go-to-my-data', i18n.locale) }}



            q-card.col-md-4.col-xs-12.col-sm-10
                q-card-title.text-center
                    q-icon.head-icon(name="sync")
                    | {{ $t('active-proposals', i18n.locale) }}
                q-card-main(align="center")
                    p.big
                        | {{ auth.userProposals.length }}
                q-card-actions(align="center")
                    q-btn(flat @click="$router.push('/proposals')")
                        | {{ $t('go-to-proposals', i18n.locale) }}



            q-modal(ref="decodedData" v-model="isOpenHIWModal" minimized)
                h5
                    | {{ $t('how-working-referral-link', i18n.locale) }}
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
                    | {{ $t('action.close', i18n.locale) }}
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import store from '../../node_modules/store';
    import VueClipboard from 'vue-clipboard2';
    import '../modules/class-component-hooks';
    import {State, Mutation} from 'vuex-class';
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
    export default class Index extends Vue {
        @State auth;
        @State i18n;

        public isOpenHIWModal = false;
        public copySucceeded1 = false;

        get username() {
            return this.$store.state.auth.username || this.$t('username', this.i18n.locale);
        }

        get copyButtonText() {
            return this.copySucceeded1 ? this.$t('copied', this.i18n.locale) +'!' : this.$t('action.copy', this.i18n.locale);
        }

        get copy() {
            return `https://data.travelchain.io/?r=${this.username}`;
        }
    }
</script>
