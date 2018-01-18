<template lang="pug">
    q-layout
        q-card-title
            h3.page-title {{ $t('menu.proposals.name', i18n.locale) }}
            h4.page-subtitle {{ $t('menu.proposals.title', i18n.locale) }}

            p.page-desc {{ $t('menu.proposals.desc[0]', i18n.locale) }}

        q-card-main
            q-data-table(:data="auth.userProposals" :columns="tableProposalsColumns" :config="tableConfig")
                template(slot="col-action" slot-scope="cell")
                    q-btn(color="red" @click="declineProposal(cell.row.username, cell.row.type)")
                        | {{ $t('action.decline', i18n.locale) }}
                    q-btn(color="green" @click="acceptProposal(cell.row.username, cell.row.type)")
                        | {{ $t('action.accept', i18n.locale) }}
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
                {label: this.$t('table.username', this.i18n.locale), field: 'username'},
                {label: this.$t('table.type', this.i18n.locale), field: 'type'},
                {label: this.$t('table.amount', this.i18n.locale), field: 'amount'},
                {label: this.$t('table.action', this.i18n.locale), field: 'action'}
            ];

            this.tableConfig = {
                messages: {
                    noData: '<i class="material-icons">warning</i> ' + this.$t('table.no-data', this.i18n.locale),
                    noDataAfterFiltering: '<i class="material-icons">warning</i> ' + this.$t('table.no-results', this.i18n.locale)
                },
                labels: {
                    columns: this.$t('table.columns', this.i18n.locale),
                    allCols: this.$t('table.allCols', this.i18n.locale),
                    rows: this.$t('table.rows', this.i18n.locale),
                    selected: {
                        singular: this.$t('table.selected.singular', this.i18n.locale),
                        plural: this.$t('table.selected.plural', this.i18n.locale)
                    },
                    clear: this.$t('table.clear', this.i18n.locale),
                    search: this.$t('table.search', this.i18n.locale),
                    all: this.$t('table.all', this.i18n.locale)
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
