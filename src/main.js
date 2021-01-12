import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import App from './App.vue';
import router from './router';
import store from './store';
import XUI from './components';
import './assets/style/element-variables.scss';
import './assets/style/index.less'; // global css

const app = createApp(App);

app.use(XUI);
app.use(ElementPlus, { locale, size: 'small' });
app.use(router);
app.use(store);
app.mount('#app');
