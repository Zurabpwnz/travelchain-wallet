<template lang="pug">
  q-layout(ref="layout" view="lHh Lpr fff" :left-class="{'bg-grey-2': true}")
    q-toolbar.glossy(slot="header")

      q-btn(flat @click="$refs.layout.toggleLeft()")
        q-icon(name="menu")
      
      q-toolbar-title TravelChain
        div(slot="subtitle") Beta 0.1
  
  
    div(slot="left")
      q-list(no-border link inset-delimiter)
        q-list-header Essential Links
        q-item(@click="launch('http://quasar-framework.org')")
          q-item-side(icon="assessment")
          q-item-main(label="Data" sublabel="Your data")
        </q-item>
        q-item(@click="launch('http://quasar-framework.org')")
          q-item-side(icon="library_books")
          q-item-main(label="News" sublabel="Travelai")
        </q-item>
        q-item(@click="launch('http://quasar-framework.org')")
          q-item-side(icon="remove_red_eye")
          q-item-main(label="Analyse" sublabel="Analyse your personality")
        </q-item>
      </q-list>
    </div>
  
    div.layout-padding.row.justify-center.items-center.non-selectable.no-pointer-events.window-height
      div.logo(:style="position")
        img(src="~assets/logo.svg" width="200")
</template>

<script lang="ts">
    import Hello from './Hello'
    export default Hello
</script>

<style lang="stylus">
.logo-container
  width 255px
  height 242px
  perspective 800px
  position absolute
  top 50%
  left 50%
  transform translateX(-50%) translateY(-50%)
.logo
  transform-style preserve-3d
</style>
