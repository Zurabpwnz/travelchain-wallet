<template lang="pug">
      div.logo(:style="position")
        img(src="~assets/logo.svg" width="200")
</template>

<script lang="ts">
    import Welcome from '../components/Welcome'
    export default Welcome
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
