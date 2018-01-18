import store from '../../../node_modules/store';
import {ActionTree, MutationTree} from 'vuex';
import {I18NState} from '../../types';

const state: I18NState = {
    locales: ['en', 'ru'],
    locale: 'en',
};

const mutations: MutationTree<I18NState> = {
    setLang (state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
            state.locale = locale;
            store.set('app.lang', locale);
        }
    },
};

export const i18n = {
    state,
    mutations,
};
export default i18n;