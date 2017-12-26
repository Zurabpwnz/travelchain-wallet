<template lang="pug">
  
  div#q-app 
    //-Don't drop "q-app" class
    q-layout(ref="layout" view="lHh Lpr fff" :left-class="{'bg-grey-2': true}")
      q-toolbar(slot="header" color="#2c3d75")

        q-btn(flat @click="$refs.layout.toggleLeft()")
          q-icon(name="menu")
      
        q-toolbar-title TravelChain
          div(slot="subtitle") Data Wallet
  
  
      div(slot="left")
        q-list(no-border link inset-delimiter)
          q-item(v-if="isAuth" @click="$router.push('/')")
            q-item-side(icon="face")
            q-item-main(:label="username")
          
          q-list-header Menu
          
          q-item(@click="$router.push('/')")
            q-item-side(icon="assessment")
            q-item-main(label="Dashboard" sublabel="Manage your account")
          
          q-item(@click="$router.push('/data')")
            q-item-side(icon="assessment")
            q-item-main(label="My Data" sublabel="Publish data into the blockchain")
          
          q-item(@click="$router.push('/purchase')")
            q-item-side(icon="assessment")
            q-item-main(label="Purchase data" sublabel="Purchase data from the network")
          
          q-item(@click="$router.push('/analyse')")
            q-item-side(icon="remove_red_eye")
            q-item-main(label="Wallet" sublabel="Manage your funds")

          q-item(@click="$router.push('/analyse')")
            q-item-side(icon="remove_red_eye")
            q-item-main(label="Log Out")
    
      div
        router-view
</template>

<script lang="ts">
/*
 * Root component
 */
import Vue from 'vue';
import Component from 'vue-class-component';
import Blockchain from './modules/blockchain.js'
import store from 'store'

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
  isAuth = false;

  get username () {
    return Blockchain.account.name || 'Username'
  }

  mounted () {
    if (store.get('account')) {
      Blockchain.isAuth = true;
      this.isAuth = true;
    } 
  }
}
</script>

<style></style>
