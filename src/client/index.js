import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import App from './App';
import Store from './vuex/store';

import IndexView from './views/app-list';
import ScriptView from './views/script-list';
import QueueView from './views/build-queue';
import BuildView from './views/build-info';
import OptionView from './views/settings';

Vue.use(Vuex);
Vue.use(Router);
Vue.use(ElementUI);
let router = new Router({
    routes: [
        {
            path: '/index',
            name: 'index',
            component: IndexView
        },
        {
            path: '/script',
            name: 'script',
            component: ScriptView
        },
        {
            path: '/queue',
            name: 'queue',
            component: QueueView
        },
        {
            path: '/build',
            name: 'build',
            component: BuildView
        },
        {
            path: '/option',
            name: 'option',
            component: OptionView
        }
    ]
});

let store = new Vuex.Store(Store);
new Vue({
    store,
    router,
    el: '#app',
    render: h => h(App)
});