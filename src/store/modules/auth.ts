import store from '../../../node_modules/store';
import {ActionTree, MutationTree} from 'vuex';
import {LoginState} from '../../types';

const state: LoginState = {
    username: '',
    isLoggedIn: false,
    userBalance: 10,
    userContacts: [],
    userProposals: [],
    buyableData: [],
};

const mutations: MutationTree<LoginState> = {
    login(state, username: string) {
        state.isLoggedIn = true;
        state.username = username;
    },


    contactAdd(state, contact: Object) {
        state.userContacts.push(contact);

        // TODO bind and save by backend
        store.set('account.contacts', state.userContacts);
    },


    proposalAdd(state, proposal: Object) {
        state.userProposals.push(proposal);

        // TODO bind and save by backend
        store.set('account.proposals', state.userProposals);
    },

    proposalRemove(state, index: number) {
        state.userProposals.splice(index, 1);

        // TODO bind and save by backend
        store.set('account.proposals', state.userProposals);
    },


    buyableDataAdd(state, data: Object) {
        state.buyableData.push(data);

        // TODO bind and save by backend
        store.set('account.buyabledata', state.buyableData);
    },

    buyableDataChangeState(state, index: number): boolean {
        if ( !( state.buyableData[index] as any ).requested )
            ( state.buyableData[index] as any ).requested = true;
        else
            state.buyableData.splice(index, 1);

        // TODO bind and save by backend
        store.set('account.buyabledata', state.buyableData);
        return false;
    },


    balanceSet(state, amount: number) {
        state.userBalance = Number(amount);
        if (state.userBalance < 0) state.userBalance = 0;

        // TODO bind and save by backend
        store.set('account.balance', state.userBalance);
    },

    balanceUp(state, amount: number) {
        mutations.balanceSet(state, state.userBalance + Number(amount));
    },

    balanceDown(state, amount: number) {
        mutations.balanceSet(state, state.userBalance - Number(amount));
    }
};

const actions: ActionTree<LoginState, MutationTree<LoginState>> = {
    proposalRemove(context, data: Object): boolean {
        let finddata = data as any;
        for (let i in state.userProposals) {
            let proposal = state.userProposals[i] as any;
            if (proposal.username === finddata.user && proposal.type === finddata.type) {
                context.commit('proposalRemove', i);
                return true;
            }
        }
        return false;
    },

    buyableDataChangeState(context, data: Object): boolean {
        let finddata = data as any;
        for (let i in state.buyableData) {
            let data = state.buyableData[i] as any;
            if (data.username === finddata.user && data.type === finddata.type) {
                context.commit('buyableDataChangeState', i);
                return true;
            }
        }
        return false;
    },
};

export const auth = {
    state,
    mutations,
    actions,
};