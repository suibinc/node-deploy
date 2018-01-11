import * as mutations from './mutations';

export const UPDATE_APPLICATIONS = 'UPDATE_APPLICATIONS';

export const CORE = {
    [UPDATE_APPLICATIONS]({commit}, payload) {
        commit(mutations.SET_APPLICATIONS, payload.list);
    }
};
