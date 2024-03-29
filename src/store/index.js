import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);
const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
}) 

export default store;
