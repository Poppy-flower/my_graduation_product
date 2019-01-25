import Vue from 'vue';
import vueRouter from 'vue-router';
import Vuex from 'vuex';

import '../../public/javascripts/rem.js';
import './css/index.css';

import vuex from './vuex&vueRouter/vuex.js';
import vuerouter from './vuex&vueRouter/vueRouter.js';
import "./css/element.css"
import ElementUI from 'element-ui'
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(vueRouter);

const router = new vueRouter(vuerouter);
router.afterEach((to,from)=>{
    console.log(from);
    console.log(to);
});
const store = new Vuex.Store(vuex);

new Vue({
   router,
   store
}).$mount(".app");