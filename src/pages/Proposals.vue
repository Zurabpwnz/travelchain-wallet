<template lang="pug">
    q-layout
        q-card-title
            h3.page-title {{ $t('menu.proposals.name') }}
            h4.page-subtitle {{ $t('menu.proposals.title') }}

            p.page-desc {{ $t('menu.proposals.desc[0]') }}

        q-card-main
            q-data-table(:data="auth.userProposals" :columns="tableProposalsColumns" :config="tableConfig")
                template(slot="col-action" slot-scope="cell")
                    q-btn(color="red" @click="declineProposal(cell.row.username, cell.row.type)")
                        | {{ $t('action.decline') }}
                    q-btn(color="green" @click="acceptProposal(cell.row.username, cell.row.type)")
                        | {{ $t('action.accept') }}
</template>

<script lang="ts">
    import Vue from 'vue';
    import store from 'store';
    import {Google, VK, Facebook} from '../modules/Social';
    import Component from 'vue-class-component';
    import Notifier from '../modules/Notifier';
    import {State, Mutation, Action} from 'vuex-class';
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
    export default class Proposals extends Vue {
        @State auth;
        @State i18n;
        @Mutation riseUpBalance;
        @Action removeProposal;

        public tableProposalsColumns = new Array();
        public tableConfig = {};

        created() {
            this.tableProposalsColumns = [
                {label: this.$t('table.username'), field: 'username'},
                {label: this.$t('table.type'), field: 'type'},
                {label: this.$t('table.amount'), field: 'amount'},
                {label: this.$t('table.action'), field: 'action'}
            ];

            this.tableConfig = {
                messages: {
                    noData: '<i class="material-icons">warning</i> ' + this.$t('table.no-data'),
                    noDataAfterFiltering: '<i class="material-icons">warning</i> ' + this.$t('table.no-results')
                },
                labels: {
                    columns: this.$t('table.columns'),
                    allCols: this.$t('table.allCols'),
                    rows: this.$t('table.rows'),
                    selected: {
                        singular: this.$t('table.selected.singular'),
                        plural: this.$t('table.selected.plural')
                    },
                    clear: this.$t('table.clear'),
                    search: this.$t('table.search'),
                    all: this.$t('table.all')
                }
            };
        }

        declineProposal(user, type) {
            this.removeProposal({user, type});
        }

        acceptProposal(user, type) {
            let proposalPrice = false;
            for (let i in this.auth.userProposals) {
                if (this.auth.userProposals[i].username == user && this.auth.userProposals[i].type == type) {
                    proposalPrice = this.auth.userProposals[i].amount;
                    break;
                }
            }

            if (proposalPrice === false) {
                Notifier.notify({
                    msg: 'No finded needed data for accepting. Try again',
                    id: 'nofindedneededdata',
                    isNegative: true,
                });
            } else {
                this.removeProposal({user, type})
                    .then((res) => {
                        if (res) {
                            this.riseUpBalance(proposalPrice);
                        }
                        else {
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
