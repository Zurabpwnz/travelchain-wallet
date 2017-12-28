import Vue from 'vue';
import Component from 'vue-class-component';
import store from '../../node_modules/store';
import VueClipboard from 'vue-clipboard2';
import '../modules/class-component-hooks';
import { State, Mutation } from 'vuex-class';
import {
    QLayout,
    QInput,
    QCard,
    QCardMain,
    QCardTitle,
    QCardActions,
    QCardSeparator,
    QIcon,
    QBtn,
} from 'quasar';

Vue.use(VueClipboard);

@Component({
    name: 'welcome',
    components: {
        QLayout,
        QInput,
        QCard,
        QCardMain,
        QCardTitle,
        QCardActions,
        QCardSeparator,
        QIcon,
        QBtn,
    }
})
export default class Index extends Vue {
    @State auth;

    copySucceeded1: boolean = false;

    get username () {
        return this.$store.state.auth.username || 'Username';
    }

    get copyButtonText () {
        return this.copySucceeded1 ? 'Copied!' : 'Copy';
    }

    get copy () {
        return `https://data.travelchain.io/?r=${this.username}`;
    }
}