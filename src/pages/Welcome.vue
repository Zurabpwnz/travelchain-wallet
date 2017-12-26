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
                    q-input(value="https://data.travelchain.io/?r=me" readonly)#reflink
            q-card-separator
            q-card-actions(align="end")
                q-btn(flat) 
                    | Copy
                q-btn(flat @click="$router.push('/data')")
                    | How it works

        q-card.col-md-4.col-xs-12.col-sm-10
            q-card-title
                q-icon.head-icon(name="assignment ind")
                | Units of Information
            q-card-separator
            q-card-main(align="center")
                p.big
                    | 0
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
                    | 0
            q-card-separator
            q-card-actions(align="end")
                q-btn(flat @click="$router.push('/data')")
                    | Go to Proposals

</template>

<script lang="ts">

    function copy(){
        alert("copy");
    };

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