import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import App from './App';
import Store from './vuex/store';

Vue.use(Vuex);
Vue.use(ElementUI);

let store = new Vuex.Store(Store);
new Vue({
    store,
    el: '#app',
    render: h => h(App)
});