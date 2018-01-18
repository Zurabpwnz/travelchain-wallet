require(`quasar/dist/quasar.${__THEME}.css`);
require(`quasar/dist/quasar.ie`);
require(`quasar/dist/quasar.ie.${__THEME}.css`);
require(`./assets/stylesheets/app.styl`);

import Vue, {Component} from 'vue';
import router from './router';
import Quasar from 'quasar';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(Quasar); // Install Quasar Framework

if (__THEME === 'mat') {
    require('quasar-extras/roboto-font');
}
import 'quasar-extras/material-icons';
// import 'quasar-extras/ionicons'
import 'quasar-extras/fontawesome';
import 'quasar-extras/animate';

import './modules/class-component-hooks';

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import AiPhone from './components/PhoneInput.vue';
Vue.component('ai-phone', AiPhone);

import I18n from './modules/i18n';
import {store} from './store';

Quasar.start(() => {
    /* eslint-disable no-new */
    let app = new Vue({
        el: '#q-app',
        store,
        router,
        i18n: I18n(store),
        render: h => h(App as Component)
    });
});
