<template lang="pug">
    q-layout
        q-card-title
            h3.page-title {{ $t('menu.purchase.name', i18n.locale) }}
            h4.page-subtitle {{ $t('menu.purchase.title', i18n.locale) }}

            p.page-desc {{ $t('menu.purchase.desc[0]', i18n.locale) }}

        q-card-main
            q-data-table(:data="auth.userBoughtData" :columns="tableColumns" :config="tableConfig")
                template(slot="col-action" slot-scope="cell")
                    template(v-if="!cell.row.requested")
                        q-btn(color="blue" @click="openDecodedDataModal(cell.row)")
                            | Show
                    template(v-else) Waiting for confirmation...



        q-card-title
            p.page-desc {{ $t('menu.purchase.desc[1]', i18n.locale) }}

        q-card-main
            q-data-table(:data="auth.buyableData" :columns="tableColumns" :config="tableConfig")
                template(slot="col-action" slot-scope="cell")
                    q-btn(color="pink" @click="openPurchasingModal(cell.row.username, cell.row.type)")
                        | {{ $t('action.buy', i18n.locale) }}




        q-modal(ref="purchasingData" v-model="isOpenPurchasingModal" minimized)
            h5
                | Purchase Data

            q-input(
            v-model="requestedPrice"
            placeholder="0.0"
            type="number"
            suffix="TT"
            )

            br

            q-btn(@click="closePurchasingModal" color="red")
                | Decline

            q-btn(@click="buyData" color="green")
                | Send request data



        q-modal(ref="decodedData" v-model="isOpenDecodedDataModal" minimized)
            h5
                | View purchased decoded Data

            q-input(
            type="textarea"
            v-model="decodedUserData"
            float-label="Decoded data"
            style="width: 600px; max-width: 100%"
            )

            br

            q-btn(@click="isOpenDecodedDataModal = false" color="blue")
                | Close
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
        QCardSeparator,
        QDataTable,
        QModal,
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
            QCardSeparator,
            QDataTable,
            QModal,
            QIcon,
            QBtn,
        }
    })
    export default class Purchase extends Vue {
        @State auth;
        @State i18n;
        @Mutation riseDownBalance;
        @Action changeStateBuyableData;

        public isOpenDecodedDataModal = false;
        public isOpenPurchasingModal = false;
        public requestedPrice = 0;
        public sellerUser = "";
        public sellerType = "";
        public decodedUserData = "";

        public tableColumns = new Array();
        public tableConfig = {};

        created() {
            this.tableColumns = [
                {label: this.$t('table.username', this.i18n.locale), field: 'username', filter: true},
                {label: this.$t('table.type', this.i18n.locale), field: 'type', filter: true},
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

        openDecodedDataModal(data) {
            this.decodedUserData = JSON.stringify(data, null, 4);
            this.isOpenDecodedDataModal = true;
        }

        openPurchasingModal(user, type) {
            this.sellerUser = user;
            this.sellerType = type;
            this.isOpenPurchasingModal = true;
        }

        closePurchasingModal() {
            this.sellerUser = "";
            this.sellerType = "";
            this.isOpenPurchasingModal = false;
        }

        buyData() {
            if (!this.requestedPrice || this.requestedPrice == 0) {
                Notifier.notify({
                    msg: 'Offered price must been more of null',
                    id: 'offeredpurchaseprice',
                    isNegative: true,
                });
            }
            else if (this.requestedPrice > this.auth.userBalance) {
                Notifier.notify({
                    msg: 'Your haven\'t the required number of TT',
                    id: 'offeredpurchasepricehavent',
                    isNegative: true,
                });
            } else {
                this.changeStateBuyableData({user: this.sellerUser, type: this.sellerType})
                    .then((res) => {
                        if (res) {
                            this.riseDownBalance(this.requestedPrice);
                            this.closePurchasingModal();
                        } else {
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
