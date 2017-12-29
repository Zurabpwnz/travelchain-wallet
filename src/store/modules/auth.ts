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
    login (state, username: string) {
        state.isLoggedIn = true;
        state.username = username;
    },


    addContact (state, contact: Object) {
        state.userContacts.push(contact);

        // TODO bind and save by backend
        store.set('account.contacts', state.userContacts);
    },


    addProposal (state, proposal: Object) {
        state.userProposals.push(proposal);

        // TODO bind and save by backend
        store.set('account.proposals', state.userProposals);
    },

    removeProposal (state, index: number) {
        state.userProposals.splice(index, 1);

        // TODO bind and save by backend
        store.set('account.proposals', state.userProposals);
    },


    addBuyableData (state, data: Object) {
        state.buyableData.push(data);

        // TODO bind and save by backend
        store.set('account.buyabledata', state.buyableData);
    },

    changeStateBuyableData (state, index: number): boolean {
        if ( !( state.buyableData[index] as any ).requested )
            ( state.buyableData[index] as any ).requested = true;
        else
            state.buyableData.splice(index, 1);

        // TODO bind and save by backend
        store.set('account.buyabledata', state.buyableData);
        return false;
    },


    setBalance (state, amount: number) {
        state.userBalance = Number(amount);
        if (state.userBalance < 0) state.userBalance = 0;

        // TODO bind and save by backend
        store.set('account.balance', state.userBalance);
    },

    riseUpBalance (state, amount: number) {
        mutations.setBalance(state, state.userBalance + Number(amount));
    },

    riseDownBalance (state, amount: number) {
        mutations.setBalance(state, state.userBalance - Number(amount));
    }
};

const actions: ActionTree<LoginState, MutationTree<LoginState>> = {
    removeProposal (context, data: Object): boolean {
        let desiredData = data as any;
        for (let i in state.userProposals) {
            let proposal = state.userProposals[i] as any;
            if (proposal.username === desiredData.user && proposal.type === desiredData.type) {
                context.commit('removeProposal', i);
                return true;
            }
        }
        return false;
    },

    changeStateBuyableData (context, data: Object): boolean {
        let desiredData = data as any;
        for (let i in state.buyableData) {
            let data = state.buyableData[i] as any;
            if (data.username === desiredData.user && data.type === desiredData.type) {
                context.commit('changeStateBuyableData', i);
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