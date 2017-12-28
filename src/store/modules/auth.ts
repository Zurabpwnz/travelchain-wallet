import store from '../../../node_modules/store';
import { MutationTree } from 'vuex';
import { LoginState } from '../../types';

const state: LoginState = {
  username: '',
  isLoggedIn: false,
  userBalance: 0,
  userContacts: [],
  userProposals: [],
};

const mutations: MutationTree<LoginState> = {
  login (state, username: string) {
    state.isLoggedIn = true;
    state.username = username;
  },


  contactAdd (state, contact: Object) {
    state.userContacts.push(contact);

    // TODO bind and save by backend
    store.set('account.contacts', state.userContacts);
  },


  proposalAdd (state, proposal: Object) {
    state.userProposals.push(proposal);

    // TODO bind and save by backend
    store.set('account.proposals', state.userProposals);
  },


  balanceSet (state, amount: number) {
    state.userBalance = Number(amount);
    if ( state.userBalance < 0 ) state.userBalance = 0;

    // TODO bind and save by backend
    store.set('account.balance', state.userBalance);
  },

  balanceUp (state, amount: number) {
    mutations.balanceSet(state, state.userBalance + Number(amount));
  },

  balanceDown (state, amount: number) {
    mutations.balanceSet(state, state.userBalance - Number(amount));
  }
};

export const auth = {
  state,
  mutations
};