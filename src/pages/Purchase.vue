<template lang="pug">
    q-layout
        q-card-title
            q-icon.head-icon(name="vertical_align_bottom")
            | Purchased Data - check purchased information
        q-card-main
            q-data-table(:data="tablePurchasedData" :columns="tableColumns")
                template(slot="col-action" slot-scope="cell")
                    q-btn(color="blue" @click="openDecodedDataModal(cell.row)")
                        | Show



        q-card-separator
        q-card-title
            q-icon.head-icon(name="search")
            | Data Search - find and buy information with TT
        q-card-main
            q-data-table(:data="tableOfferedData" :columns="tableColumns")
                template(slot="col-action" slot-scope="cell")
                    q-btn(color="blue" @click="openPurchasingModal(cell.row.username, cell.row.type)")
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
    import { State, Mutation } from 'vuex-class';
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
        @Mutation balanceDown

        public isOpenDecodedDataModal = false
        public isOpenPurchasingModal = false
        public requestedPrice = 0
        public watchBuyingFromUser = ""
        public watchBuyingFromType = ""
        public decodedUserData = ""

        public tableColumns = [
            { label: 'Username', field: 'username' },
            { label: 'Type', field: 'type' },
            { label: 'Action', field: 'action' }
        ];

        public tablePurchasedData = [
            {
                "username": "TheDevTom",
                "type": "Google",
            },
            {
                "username": "TheDevTom",
                "type": "VK",
            },
            {
                "username": "TheDevTom",
                "type": "Facebook",
            },
        ];

        public tableOfferedData = [
            {
                "username": "DrGmes",
                "type": "Google",
            },
        ];

        openDecodedDataModal (data)
        {
            this.decodedUserData = JSON.stringify(data, null, 4);
            this.isOpenDecodedDataModal = true;
        }

        openPurchasingModal (user, type)
        {
            this.watchBuyingFromUser = user;
            this.watchBuyingFromType = type;
            this.isOpenPurchasingModal = true;
        }

        closePurchasingModal ()
        {
            this.watchBuyingFromUser = "";
            this.watchBuyingFromType = "";
            this.isOpenPurchasingModal = false;
        }

        buyData ()
        {
            if ( !this.requestedPrice || this.requestedPrice == 0 )
            {
                Notifier.notify({
                    msg: 'Offered price must been more of null',
                    id: 'offeredpurchaseprice',
                    isNegative: true,
                });
            }
            else if ( this.requestedPrice > this.auth.userBalance )
            {
                Notifier.notify({
                    msg: 'Your haven\'t the required number of TT',
                    id: 'offeredpurchasepricehavent',
                    isNegative: true,
                });
            }
            else
            {
                let isFindedNeedData = false;
                for ( let i in this.tableOfferedData )
                {
                    if ( this.tableOfferedData[i].username == this.watchBuyingFromUser
                        && this.tableOfferedData[i].type == this.watchBuyingFromType )
                    {
                        this.tableOfferedData.splice(Number(i), 1);
                        isFindedNeedData = true;
                        // TODO save status 'Requested' by backend
                        break;
                    }
                }

                if ( !isFindedNeedData )
                {
                    Notifier.notify({
                        msg: 'No finded needed data for purchasing. Try again',
                        id: 'nofindedneededdata',
                        isNegative: true,
                    });
                }
                else
                {
                    this.balanceDown(this.requestedPrice);
                    this.closePurchasingModal();
                }
            }
        }
    }
</script>