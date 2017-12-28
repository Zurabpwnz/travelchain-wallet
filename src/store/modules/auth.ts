import { MutationTree } from 'vuex';
import { LoginState } from '../../types';

const state: LoginState = {
  username: '',
  isLoggedIn: false
};

const mutations: MutationTree<LoginState> = {
  login (state, username: string) {
    state.isLoggedIn = true;
    state.username = username;
  }
};

export const auth = {
  state,
  mutations
}