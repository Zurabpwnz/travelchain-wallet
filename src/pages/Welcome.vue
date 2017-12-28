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
                    | {{ auth.userBalance }} TT
            q-card-separator
            q-card-actions(align="end")
                q-btn(flat @click="$router.push('/purchase')")
                    | Transfer

        q-card.col-md-4.col-xs-12.col-sm-10
            q-card-title
                q-icon.head-icon(name="linear scale")
                | Referal link
            q-card-separator
            q-card-main
                p
                    q-input(:value="'https://data.travelchain.io/?r=' + username" readonly)#reflink
            q-card-separator
            q-card-actions(align="end")
                q-btn(@click="copySucceeded1 = true" v-clipboard:copy="copy" flat) 
                    | {{ copyButtonText }}
                q-btn(flat @click="$router.push('/data')")
                    | How it works

        q-card.col-md-4.col-xs-12.col-sm-10
            q-card-title
                q-icon.head-icon(name="assignment ind")
                | Units of Information
            q-card-separator
            q-card-main(align="center")
                p.big
                    | {{ auth.userContacts.length }}
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
                    | {{ auth.userProposals.length }}
            q-card-separator
            q-card-actions(align="end")
                q-btn(flat @click="$router.push('/proposals')")
                    | Go to Proposals

</template>

<script lang="ts">
    import Welcome from '../components/Welcome';
    export default Welcome;
</script>