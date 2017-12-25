<template>
    <q-layout>
        <q-card>
            <q-card-title>Nickname</q-card-title>
        </q-card>

        <q-card>
            <q-card-title><q-icon class="head-icon" name="assignment ind" />Data Sources</q-card-title>
            <q-card-separator />
            <q-card-main align="center">
                <p class="big">1/3</p>
            </q-card-main>
            <q-card-separator />
            <q-card-actions align="end">
                <q-btn flat @click="$router.push('/data')">Go to my data</q-btn>
            </q-card-actions>
        </q-card>

        <q-card>
            <q-card-title><q-icon class="head-icon" name="account balance wallet" />Wallet</q-card-title>
            <q-card-separator />
            <q-card-main align="center">
                <p class="big">10 TT</p>
            </q-card-main>
            <q-card-separator />
            <q-card-actions align="end">
                <q-btn flat @click="$router.push('/data')">Transfer</q-btn>
            </q-card-actions>
        </q-card>

        <q-card>
            <q-card-title><q-icon class="head-icon" name="linear scale" />Referal link</q-card-title>
            <q-card-separator />
            <q-card-main>
                <p><q-input value="https://data.travelchain.io/?r=me" readonly /></p>
            </q-card-main>
            <q-card-separator />
            <q-card-actions align="end">
                <q-btn flat @click="$router.push('/data')">How it works</q-btn>
            </q-card-actions>
        </q-card>
    </q-layout>
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