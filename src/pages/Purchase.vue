<template lang="pug">
    q-layout
        q-card-title
          h3.page-title Buy data
          h4.page-subtitle Perchase data from the blockchain

          p.page-desc Purchased data - check purchased information.

        q-card-main
            q-data-table(:data="auth.userBoughtData" :columns="tableColumns")
                template(slot="col-action" slot-scope="cell")
                    template(v-if="!cell.row.requested")
                        q-btn(color="blue" @click="openDecodedDataModal(cell.row)")
                            | Show
                    template(v-else) Waiting for confirmation...



        q-card-separator
        q-card-title
            q-icon.head-icon(name="search")
            | Data Search - find and buy information with TT
        q-card-main
            q-data-table(:data="auth.buyableData" :columns="tableColumns")
                template(slot="col-action" slot-scope="cell")
                    q-btn(color="pink" @click="openPurchasingModal(cell.row.username, cell.row.type)")
                        | Buy




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
    import { State, Mutation, Action } from 'vuex-class';
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
    export default class Purchase extends Vue
    {
        @State auth
        @Mutation riseDownBalance
        @Action changeStateBuyableData

        public isOpenDecodedDataModal = false
        public isOpenPurchasingModal = false
        public requestedPrice = 0
        public sellerUser = ""
        public sellerType = ""
        public decodedUserData = ""

        public tableColumns = [
            { label: 'Username', field: 'username', filter: true, },
            { label: 'Type', field: 'type', filter: true, },
            { label: 'Action', field: 'action', }
        ];

        openDecodedDataModal (data)
        {
            this.decodedUserData = JSON.stringify(data, null, 4);
            this.isOpenDecodedDataModal = true;
        }

        openPurchasingModal (user, type)
        {
            this.sellerUser = user;
            this.sellerType = type;
            this.isOpenPurchasingModal = true;
        }

        closePurchasingModal ()
        {
            this.sellerUser = "";
            this.sellerType = "";
            this.isOpenPurchasingModal = false;
        }

        buyData ()
        {
            if ( !this.requestedPrice || this.requestedPrice == 0 ) {
                Notifier.notify({
                    msg: 'Offered price must been more of null',
                    id: 'offeredpurchaseprice',
                    isNegative: true,
                });
            }
            else if ( this.requestedPrice > this.auth.userBalance ) {
                Notifier.notify({
                    msg: 'Your haven\'t the required number of TT',
                    id: 'offeredpurchasepricehavent',
                    isNegative: true,
                });
            } else {
                this.changeStateBuyableData({ user: this.sellerUser, type: this.sellerType })
                .then((res) =>
                {
                    if ( res ) {
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
