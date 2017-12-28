<template lang="pug">
    div
        template(v-for="notify in notifies")
            q-alert(
                :ref="notify.id"
                :id="'ai-notify-'+ notify.id"
                :color="notify.color"
                :icon="notify.icon"
                :enter="notify.enter"
                :leave="notify.leave"
                position="top-right"
                dismissible
                appear
                @dismiss="onDismiss(notify.id)"
            )
                span(v-html="notify.msg")
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import NotifierManager from '../modules/Notifier';
    import { QAlert } from 'quasar';

    @Component({
        name: 'Notifier',
        components: {
            QAlert
        }
    })
    export default class Notifier extends Vue
    {
        public notifies = NotifierManager.notifies;

        created()
        {
            NotifierManager.listen(this);
        }

        onDismiss(id)
        {
            setTimeout(() => NotifierManager.remove(id), 600)
        }
    }
</script>