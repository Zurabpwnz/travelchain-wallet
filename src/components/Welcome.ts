import Vue from 'vue';
import Component from 'vue-class-component';
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

}