export const SET_APPLICATIONS = 'SET_APPLICATIONS';

export const CORE = {
    [SET_APPLICATIONS](state, list) {
        state.applications = list;
    }
};