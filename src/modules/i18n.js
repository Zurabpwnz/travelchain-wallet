import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default (store) => {
    return new VueI18n({
        locale: store.state.i18n.locale,
        fallbackLocale: 'en',
        messages: {
            'en': require('../locales/en.json'),
            'ru': require('../locales/ru.json'),
        }
    });
}