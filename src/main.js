// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui';
ElementUI.Dialog.props.closeOnClickModal.default = false;
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/index.js'
import Qs from 'qs'
Vue.prototype.Qs = Qs
let storage = window.sessionStorage;
// axios.defaults.headers.common['token'] = storage.getItem('token');
import cookie from './utils/cookie'
Vue.prototype.cookie = cookie
// import 'jquery/lib/node-jquery'
import api from './api/api'
Vue.prototype.$api = api
Vue.use(ElementUI);
import echarts from 'echarts'
Vue.prototype.$echart = echarts
import axios from 'axios'
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios
Vue.config.productionTip = false
// import api from './api/api'
// Vue.prototype.API1url=api;
import '../node_modules/less'
/* eslint-disable no-new */
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './assets/icon/iconfont.css'
import './assets/css/reset.css'
// import axiosRequire from './utils/axiosRequire';
// Vue.use(axiosRequire);
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'zh', 
    messages: {
      'zh': require('./assets/languages/zh'),  
      'en': require('./assets/languages/en')
    }
});
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-flash'
Vue.use(VideoPlayer)
import { parseTime, resetForm, addDateRange, selectDictLabel, download, handleTree } from "../src/utils/ruoyi";
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree
Vue.use(VueQuillEditor)
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>',
})