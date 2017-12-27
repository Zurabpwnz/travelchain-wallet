
import Vue from 'vue';
import NotifierVue from '../components/Notifier.vue';

Vue.component('ai-notifier', NotifierVue);

export default class Notifier {
    private static notifiesList = new Array();
    private static listener: Vue;
    private static prev;

    static get notifies() {
        return this.notifiesList;
    }

    static notify(params) {
        let data = {
            id: this.notifiesList.length + 1 + Math.random().toString().slice(2),
            msg: 'NO MESSAGE',
            color: !params.isNegative ? 'teal-5' : '',
            icon: !params.isNegative ? 'done' : '',
            enter: 'bounceInRight',
            leave: 'bounceOutRight',
            isNegative: false,
            autohide: !params.isNegative,
        };
        Object.assign(data, params);

        let consoleMsg = data.msg.replace('<br>', '\n');
        if( data.isNegative ) console.error( consoleMsg );
        else console.log( consoleMsg );

        if ( params.id ) this.remove(params.id, true);
        this.notifiesList.push(data);
        this.refresh();

        if ( data.autohide )
            setTimeout(() => {
                this.apply((el, comp, index, ref) => {
                    if ( data.id === ref ) this.remove(comp);
                });
                this.refresh();
            },
            8000);
    }

    static listen(listener) {
        this.listener = listener;
    }

    static remove(idOrComp, sendEvent = false) {
        if ( idOrComp instanceof Vue ) idOrComp.dismiss();
        else for ( let index in this.notifiesList ) {
            if ( this.notifiesList[index].id === idOrComp ) {
                if ( sendEvent && this.listener.$refs[idOrComp] )
                    this.listener.$refs[idOrComp][0].$el.remove();
                delete this.listener.$refs[idOrComp];
            }
        }

        this.refresh();
    }

    private static refresh() {
        this.listener.$set({}, 'notifies', this.notifiesList);

        setTimeout(() => {
            this.prev = null;
            this.apply((el) => {
                if ( this.prev ) el.style.marginTop = this.prev.clientHeight + this.prev.offsetTop + 5 + 'px';
                else el.style.marginTop = 0;
                this.prev = el;
            });
        },
        0);
    }

    private static apply(func) {
        let index = 0;
        let refs = Object.keys(this.listener.$refs).reverse();
        for ( let ref of refs ) {
            let comp = this.listener.$refs[ ref ][0];
            if ( comp && comp.$el ) func(comp.$el, comp, index, ref);
            index++;
        }
    }
}