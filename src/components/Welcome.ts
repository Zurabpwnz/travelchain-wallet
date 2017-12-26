import Vue from 'vue';
import Component from 'vue-class-component';
import store from 'store'
import '../modules/class-component-hooks';
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

  get username () {
    return store.get('account').name
  }


  beforeRouteEnter (to, from, next) {
    if (from.name === 'login') {
      location.reload()
      next()
    }
    next()
  }

}