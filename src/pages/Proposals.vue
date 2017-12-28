<template lang="pug">
    q-layout
            q-card-title
                q-icon.head-icon(name="vertical_align_top")
                | My proposals - you can sell your information, if somebody request it 
            q-card-main
                q-data-table(:data="auth.userProposals" :columns="tableProposalsColumns")
                    template(slot="col-action" slot-scope="cell")
                        q-btn(color="red")
                            | Decline
                        q-btn(color="green")
                            | Accept
</template>

<script lang="ts">
    import Vue from 'vue';
    import store from 'store';
    import {Google, VK, Facebook} from '../modules/Social';
    import Component from 'vue-class-component';
    import { State, Mutation } from 'vuex-class';
    import {
        QLayout,
        QInput,
        QCard,
        QCardMain,
        QCardTitle,
        QCardActions,
        QCardSeparator,
        QDataTable,
        QIcon,
        QBtn,
    } from 'quasar';

    @Component({
        name: 'appdata',
        components: {
            QLayout,
            QInput,
            QCard,
            QCardMain,
            QCardTitle,
            QCardActions,
            QCardSeparator,
            QDataTable,
            QIcon,
            QBtn,
        }
    })
    export default class Proposals extends Vue
    {
        @State auth

        public tableProposalsColumns = [
            { label: 'Username', field: 'username'},
            { label: 'Type', field: 'type' },
            { label: 'Amount, TT', field: 'amount' },
            { label: 'Action', field: 'action' }
        ];
    }
</script>