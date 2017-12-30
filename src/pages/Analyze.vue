<template lang="pug">
    q-layout
        template(v-for="section in analyzedData")
            q-card
                q-card-title
                    | {{ section.name }}
                q-card-main
                    q-data-table(:columns="section.cols" :data="section.data")
</template>

<script lang="ts">
    import Vue from 'vue';
    import axios from 'axios';
    import Component from 'vue-class-component';
    import { State, Mutation } from 'vuex-class';
    import {
        QLayout,
        QCard,
        QCardMain,
        QCardTitle,
        QCardSeparator,
        QDataTable,
        QBtn,
    } from 'quasar';

    @Component({
        name: 'Analyze',
        components: {
            QLayout,
            QCard,
            QCardMain,
            QCardTitle,
            QCardSeparator,
            QDataTable,
            QBtn,
        }
    })
    export default class Analyse extends Vue
    {
        public myCommonWords = [
            {
                rang: "100",
                word: "ico",
                likes: "1",
                comments: "2",
                pubs: "2",
                mentions: "26",
            },
            {
                rang: "70",
                word: "ethereum",
                likes: "6",
                comments: "1",
                pubs: "1",
                mentions: "16",
            },
            {
                rang: "64",
                word: "wiki",
                likes: "2",
                comments: "2",
                pubs: "0",
                mentions: "8",
            },
        ];



        public myFriendByPeriod = [
            {
                period: "2017.12.23 - 2017.12.30",
                karma: "0",
                likes: "8",
                comments: "17",
                friends: "Michael, Jekins, Tommy",
            },
            {
                period: "2017.12.16 - 2017.12.22",
                karma: "40",
                likes: "20",
                comments: "23",
                friends: "Terry, Melisa, Jack",
            },
        ];



        public myWordsByPeriod = [
            {
                period: "2017.12.23 - 2017.12.30",
                karma: "16",
                likes: "4",
                comments: "5",
                words: "Desk, testing Vue",
            },
            {
                period: "2017.12.16 - 2017.12.22",
                karma: "27",
                likes: "20",
                comments: "36",
                words: "Games, Minecraft, Tokens",
            },
        ];



        public myAuthorities = [
            {
                rang: "100",
                friend: "Aime Egeynst",
                likes: "1",
                comments: "6",
            },
        ];



        public analyzedData = [
            {
                name: "My common words",
                cols: [
                    { label: 'Rang', field: 'rang' },
                    { label: 'Word', field: 'word' },
                    { label: 'Likes', field: 'likes' },
                    { label: 'Comments', field: 'comments' },
                    { label: 'Publications', field: 'pubs' },
                    { label: 'Mentions', field: 'mentions' },
                ],
                data: this.myCommonWords
            },
            {
                name: "My friend by period",
                cols: [
                    { label: 'Period', field: 'period' },
                    { label: 'Karma', field: 'karma' },
                    { label: 'Likes', field: 'likes' },
                    { label: 'Comments', field: 'comments' },
                    { label: 'Friends', field: 'friends' },
                ],
                data: this.myFriendByPeriod
            },
            {
                name: "My words by period",
                cols: [
                    { label: 'Period', field: 'period' },
                    { label: 'Karma', field: 'karma' },
                    { label: 'Likes', field: 'likes' },
                    { label: 'Comments', field: 'comments' },
                    { label: 'Words', field: 'word' },
                ],
                data: this.myWordsByPeriod
            },
            {
                name: "My authorities",
                cols: [
                    { label: 'Rang', field: 'rang' },
                    { label: 'Friend', field: 'friend' },
                    { label: 'Likes', field: 'likes' },
                    { label: 'Comments', field: 'comments' },
                ],
                data: this.myAuthorities
            },
        ];
    }
</script>