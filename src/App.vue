<template lang="pug">
  
  div#q-app 
    //-Don't drop "q-app" class
    q-layout(ref="layout" view="lHh Lpr fff" :left-class="{'bg-grey-2': true}")
      q-toolbar.glossy(slot="header")

        q-btn(flat @click="$refs.layout.toggleLeft()")
          q-icon(name="menu")
      
        q-toolbar-title TravelChain
          div(slot="subtitle") Beta 0.1
  
  
      div(slot="left")
        q-list(no-border link inset-delimiter)
          q-list-header Essential Links
          q-item(@click="$router.push('/data')")
            q-item-side(icon="assessment")
            q-item-main(label="Data" sublabel="Your data")
          q-item(@click="$router.push('/news')")
            q-item-side(icon="library_books")
            q-item-main(label="News" sublabel="Some news")
          q-item(@click="$router.push('/analyse')")
            q-item-side(icon="remove_red_eye")
            q-item-main(label="Analyse" sublabel="Analyse your personality")
    
      div.layout-padding.row.justify-center.items-center.non-selectable.window-height
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
