import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import i18n from './modules/i18n';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        auth,
        i18n
    }
});