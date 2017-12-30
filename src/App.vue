<template lang="pug">
  
  div#q-app 
    //-Don't drop "q-app" class
    q-layout(ref="layout" view="lHh Lpr fff" :left-class="{'bg-grey-2': true}")
      q-toolbar(slot="header" color="#2c3d75")

        q-btn(flat @click="$refs.layout.toggleLeft()" v-if="auth.isLoggedIn")
          q-icon(name="menu")

        img.header-logo(src="/statics/logo-travelai.svg")
      
        q-toolbar-title TravelChain
          div(slot="subtitle") Data Wallet

        
  
  
      div(slot="left" v-if="auth.isLoggedIn")
        q-list(no-border link inset-delimiter)
          q-item(v-if="auth.isLoggedIn" @click="$router.push('/')")
            q-item-side(icon="face")
            q-item-main(:label="username")
            div
              p.no-margin
              | {{ auth.userBalance }} TT
          q-list-header Menu
          
          q-item(v-if="auth.isLoggedIn" @click="$router.push('/')")
            q-item-side(icon="home")
            q-item-main(label="Dashboard" sublabel="Manage your account")
          
          q-item(v-if="auth.isLoggedIn" @click="$router.push('/data')")
            q-item-side(icon="data_usage")
            q-item-main(label="My Data" sublabel="Publish data into the blockchain")
          
          q-item(v-if="auth.isLoggedIn" @click="$router.push('/purchase')")
            q-item-side(icon="assignment_returned")
            q-item-main(label="Buy data" sublabel="Purchase data from the blockchain")

          q-item(v-if="auth.isLoggedIn" @click="$router.push('/proposals')")
            q-item-side(icon="monetization_on")
            q-item-main(label="My proposals" sublabel="Proposals for the purchase of my data")

          q-item(v-if="auth.isLoggedIn" @click="$router.push('/analyze')")
            q-item-side(icon="assessment")
            q-item-main(label="Ai" sublabel="Take your analyzed data")

          q-item(v-if="auth.isLoggedIn" @click="$router.push('/hypergraph')")
            q-item-side(icon="equalizer")
            q-item-main(label="Hypergraph" sublabel="View your data in smart graph")

          q-item(v-if="auth.isLoggedIn" @click="logout")
            q-item-side(icon="exit_to_app")
            q-item-main(label="Log Out")
    
      div(:class="'page-'+ getPage()")
        router-view

    ai-notifier
</template>

<script lang="ts">
/*
 * Root component
 */
import Vue from 'vue';
import Component from 'vue-class-component';
import Blockchain from './modules/blockchain.js'
import store from '../node_modules/store'
import Dacom from './modules/dacom.js'
import Notifier from './modules/Notifier'
import { State, Mutation } from 'vuex-class'


import './modules/class-component-hooks';
import {
    dom,
    event,
    openURL,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain
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
        QItemMain
    }
})
export default class App extends Vue {
    // TODO VUEX state
    isAuth = false;
 
    @State auth

    @Mutation login

    get username () {
        return this.auth.username || 'Username'
    }

    getPage () {
        return window.location.pathname.substring(1)
    }

    mounted () {
        Blockchain.init()
        .catch(() => document.write('Not connected to node!'))
    }

    logout () {
        store.remove('account')
        store.remove('wifs')
        location.reload()
        // TODO VUEX logout
    }
}
</script>