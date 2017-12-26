<template lang="pug">
    q-layout
      div.row.justify-center.md-gutter
        q-card.col-md-4.col-xs-12.col-sm-10
            q-card-title
                q-icon.head-icon(name="assignment ind")
                | Data Sources
            q-card-separator
            q-card-main(align="center")
                p.big
                    | 1/3
            q-card-separator
            q-card-actions(align="end")
                q-btn(flat @click="$router.push('/data')")
                    | Go to my data

        q-card.col-md-4.col-xs-12.col-sm-10
            q-card-title
                q-icon.head-icon(name="account balance wallet")
                | Wallet
            q-card-separator
            q-card-main(align="center")
                p.big
                    | 10 TT
            q-card-separator
            q-card-actions(align="end")
                q-btn(flat @click="$router.push('/data')")
                    | Transfer

        q-card.col-md-4.col-xs-12.col-sm-10
            q-card-title
                q-icon.head-icon(name="linear scale")
                | Referal link
            q-card-separator
            q-card-main
                p
                    q-input(value="https://data.travelchain.io/?r=me" readonly)
            q-card-separator
            q-card-actions(align="end")
                q-btn(flat @click="$router.push('/data')")
                    | How it works
</template>

<script lang="ts">
    import Welcome from '../components/Welcome'
    export default Welcome
</script>

<style lang="stylus">
.big
    margin 1rem 0
    font-size 2em

.head-icon
    font-size 1.5em
    margin-top -0.25rem
    margin-right 0.5rem
</style>