import store from '../../../node_modules/store';
import { MutationTree } from 'vuex';
import { LoginState } from '../../types';

const state: LoginState = {
  username: '',
  isLoggedIn: false,
  userBalance: 0,
};

const mutations: MutationTree<LoginState> = {
  login (state, username: string) {
    state.isLoggedIn = true;
    state.username = username;
  },

  balanceSet (state, amount: number) {
    state.userBalance = amount;
  },

  balanceUp (state, amount: number) {
    state.userBalance += amount;

    // TODO bind and save by backend
    store.set('account.balance', state.userBalance);
  },

  balanceDown (state, amount: number) {
    state.userBalance -= amount;
  }
};

export const auth = {
  state,
  mutations
}