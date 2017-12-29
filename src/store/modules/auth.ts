import store from '../../../node_modules/store';
import {MutationTree} from 'vuex';
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

    proposalRemove(state, data: Object) {
        let finddata = data as any;
        for (let i in state.userProposals) {
            let proposal = state.userProposals[i] as any;
            if (proposal.username === finddata.user && proposal.type === finddata.type) {
                state.userProposals.splice(Number(i), 1);
                break;
            }
        }

        // TODO bind and save by backend
        store.set('account.proposals', state.userProposals);
    },


    buyableDataAdd(state, data: Object) {
        state.buyableData.push(data);

        // TODO bind and save by backend
        store.set('account.buyabledata', state.buyableData);
    },

    buyableDataChangeState(state, data: Object) {
        let finddata = data as any;
        for (let i in state.buyableData) {
            let data = state.buyableData[i] as any;
            if (data.username === finddata.user && data.type === finddata.type) {
                if ( !( state.buyableData[i] as any ).requested )
                    ( state.buyableData[i] as any ).requested = true;
                else
                    state.buyableData.splice(Number(i), 1);

                break;
            }
        }

        // TODO bind and save by backend
        store.set('account.buyabledata', state.buyableData);
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

export const auth = {
    state,
    mutations
};