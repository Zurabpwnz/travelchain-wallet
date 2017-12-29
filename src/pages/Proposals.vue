<template lang="pug">
    q-layout
            q-card-title
                q-icon.head-icon(name="vertical_align_top")
                | My proposals - you can sell your information, if somebody request it 
            q-card-main
                q-data-table(:data="auth.userProposals" :columns="tableProposalsColumns")
                    template(slot="col-action" slot-scope="cell")
                        q-btn(color="red" @click="declineProposal(cell.row.username, cell.row.type)")
                            | Decline
                        q-btn(color="green" @click="acceptProposal(cell.row.username, cell.row.type)")
                            | Accept
</template>

<script lang="ts">
    import Vue from 'vue';
    import store from 'store';
    import {Google, VK, Facebook} from '../modules/Social';
    import Component from 'vue-class-component';
    import Notifier from '../modules/Notifier';
    import { State, Mutation, Action } from 'vuex-class';
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
        @Mutation balanceUp
        @Action proposalRemove

        public tableProposalsColumns = [
            { label: 'Username', field: 'username'},
            { label: 'Type', field: 'type' },
            { label: 'Amount, TT', field: 'amount' },
            { label: 'Action', field: 'action' }
        ];

        declineProposal (user, type)
        {
            this.proposalRemove({ user, type });
        }

        acceptProposal (user, type)
        {
            let proposalPrice = false;
            for ( let i in this.auth.userProposals )
            {
                if ( this.auth.userProposals[i].username == user && this.auth.userProposals[i].type == type )
                {
                    proposalPrice = this.auth.userProposals[i].amount;
                    break;
                }
            }

            if ( proposalPrice === false )
            {
                Notifier.notify({
                    msg: 'No finded needed data for accepting. Try again',
                    id: 'nofindedneededdata',
                    isNegative: true,
                });
            }
            else
            {
                this.proposalRemove({ user, type })
                .then((res) =>
                {
                    if( res )
                    {
                        this.balanceUp(proposalPrice);
                    }
                    else
                    {
                        Notifier.notify({
                            msg: 'Unknown error',
                            isNegative: true,
                        });
                    }
                });
            }
        }
    }
</script>