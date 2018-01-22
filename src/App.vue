<template lang="pug">
    div#q-app
        q-layout(ref="layout" view="lHh Lpr fff" :left-class="{'bg-grey-2': true}")
            q-toolbar(slot="header" color="#2c3d75")

                q-btn(v-if="auth.isLoggedIn" flat @click="$refs.layout.toggleLeft()")
                    q-icon(name="menu")

                img.header-logo(src="/statics/logo.svg")

                q-toolbar-title TravelChain
                    div(slot="subtitle") Data Wallet

                div
                    q-select.color-light(
                        :value="i18n.locale"
                        :options="langOptions"
                        @change="updateLang"
                    )

  
            div(v-if="auth.isLoggedIn" slot="left")
                q-list#header-menu(no-border link inset-delimiter)
                    q-item(v-if="auth.isLoggedIn" @click="$router.push('/')")
                        q-item-side(icon="face")
                        q-item-main(:label="username")
                        div
                            p.no-margin {{ auth.userBalance }} TT
                    q-list-header {{ $t('menu.name') }}

                    template(v-for="link in menuLinks" v-if="!link.isAuth || auth.isLoggedIn")
                        q-item(@click="link.href ? $router.push(link.href) : link.click()" :class="isCurrentPage(link.href)")
                            q-item-side(:icon="link.icon")
                            q-item-main(:label="$t('menu.'+ link.name +'.name')" :sublabel="$t('menu.'+ link.name +'.title')")
    
            div(:class="'page-'+ getPage()" v-if="show")
                router-view

        ai-notifier
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Blockchain from './modules/blockchain.js'
    import store from '../node_modules/store'
    import Dacom from './modules/dacom.js'
    import Notifier from './modules/Notifier'
    import {State, Mutation} from 'vuex-class'

    import './modules/class-component-hooks';
    import {
        QLayout,
        QToolbar,
        QToolbarTitle,
        QBtn,
        QIcon,
        QList,
        QListHeader,
        QItem,
        QItemSide,
        QItemMain,
        QSelect,
    } from 'quasar';


    @Component({
        name: 'App',
        components: {
            QLayout,
            QToolbar,
            QToolbarTitle,
            QBtn,
            QIcon,
            QList,
            QListHeader,
            QItem,
            QItemSide,
            QItemMain,
            QSelect,
        }
    })
    export default class App extends Vue {

        @State auth;
        @State i18n;
        @Mutation login;
        @Mutation setLang;

        private show = true;

        private menuLinks = [
            {
                href: "/",
                name: "dashboard",
                icon: "home",
                isAuth: true,
            },

            {
                href: "/data",
                name: "data",
                icon: "data_usage",
                isAuth: true,
            },

            {
                href: "/purchase",
                name: "purchase",
                icon: "assignment_returned",
                isAuth: true,
            },

            {
                href: "/proposals",
                name: "proposals",
                icon: "monetization_on",
                isAuth: true,
            },

            {
                name: "log-out",
                icon: "exit_to_app",
                click: this.logout,
                isAuth: true,
            },
        ];

        private langOptions = [
            {
                label: 'Russian',
                value: 'ru'
            },
            {
                label: 'English',
                value: 'en'
            }
        ];

        updateLang(e) {
            this.setLang(e);
            this.$i18n.locale = e;
            this.show = false;
            this.$nextTick(() => {
                this.show = true;
            })
        }

        mounted() {
            Blockchain.init()
            .catch(() => document.write('Not connected to node!'))
        }

        get username() {
            return this.auth.username || 'Username'
        }

        isCurrentPage(href) {
            return href && window.location.pathname == href ? "active" : ""
        }

        getPage() {
            return window.location.pathname.substring(1)
        }

        logout() {
            store.remove('account')
            store.remove('wifs')
            location.reload()
            // TODO VUEX logout
        }
    }
</script>