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
          
          q-list-header Menu
          
          q-item(@click="$router.push('/')")
            q-item-side(icon="home")
            q-item-main(label="Dashboard" sublabel="Manage your account")
          
          q-item(@click="$router.push('/data')")
            q-item-side(icon="data_usage")
            q-item-main(label="My Data" sublabel="Publish data into the blockchain")
          
          q-item(@click="$router.push('/purchase')")
            q-item-side(icon="public")
            q-item-main(label="Purchase data" sublabel="Purchase data from the blockchain")

          q-item(@click="$router.push('/proposals')")
            q-item-side(icon="monetization_on")
            q-item-main(label="Proposals" sublabel="Proposals for the purchase of your data")  
         
          q-item(@click="$router.push('/analyse')")
            q-item-side(icon="exit_to_app")
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
}
</script>

<style></style>
