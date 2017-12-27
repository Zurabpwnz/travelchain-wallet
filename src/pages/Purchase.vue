<template lang="pug">
    q-layout

            q-card-title
                q-icon.head-icon(name="vertical_align_bottom")
                | Purchased Data - check purchased information
            q-card-main
                q-data-table(:data="table" :columns="columns")
                    template(slot="col-action" scope="cell")
                        q-btn(color="blue")
                            | {{ cell.data }}

            q-card-separator
            q-card-title
                q-icon.head-icon(name="search")
                | Data Search - find and buy information with TT
            q-card-main
                q-data-table(:data="table" :columns="columns")
                    template(slot="col-action" scope="cell")
                        q-btn(color="blue")
                            | {{ cell.data }}

            
</template>

<script lang="ts">
    import Vue from 'vue'
    import store from 'store'
    import {Google, VK, Facebook} from '../modules/Social'
    import Component from 'vue-class-component'
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
    export default class Purchase extends Vue {

        public columns = [
            {
                label: 'Username',
                field: 'username'
            },
            {
                label: 'Type',
                field: 'type'
            },
            {
                label: 'Action',
                field: 'action'
            }
        ];

        public table = [
            {
                "username": "TheDeveloperTom",
                "type": "Type",
                "action": "Buy",
            },
            {
                "username": "TheDeveloperTom",
                "type": "Type",
                "action": "Buy",
            },
            {
                "username": "TheDeveloperTom",
                "type": "Type",
                "action": "Buy",
            },
        ];
    }
</script>