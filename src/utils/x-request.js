import axios from 'axios';
import { ElMessageBox, ElMessage } from 'element-plus';
import store from '@/store';
import router from '@/router';

// 创建一个axios实例
const service = axios.create({
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000, // request timeout
});
const { CancelToken } = axios;
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    console.log(config.url);
    if (config.ifCancelToken !== false) {
      // 请求取消机制
      store.dispatch('app/removePending', {
        url: config.url,
        cancel: true,
      });
      config.cancelToken = new CancelToken((cancel) => {
        // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
        store.dispatch('app/pushPending', {
          url: config.url,
          cancel,
        });
      });
    }

    // do something before request is sent
    if (store.getters.token) {
      const token = localStorage.getItem('token');
      if (store.getters.token === token) {
        config.headers.accessToken = token;
      } else {
        return ElMessageBox.alert('当前用户信息发生了变化，请刷新页面后重试。', '提示', {
          confirmButtonText: '刷新重试',
          type: 'warning',
          callback: () => {
            window.location.reload();
          },
        });
      }
    }

    store.dispatch('app/setLoading', true);
    return config;
  },
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// 相响应拦截器
service.interceptors.response.use(
  (response) => {
    const { config, data, status } = response;

    if (config.ifCancelToken !== false) {
      // 请求取消机制
      store.dispatch('app/removePending', {
        url: config.url,
      });
    }
    store.dispatch('app/setLoading', false);
    if (status === 200) {
      if (data.code === 200) {
        return Promise.resolve(data);
      }

      // 文件流数据
      if (Object.prototype.toString.call(data) === '[object Blob]') {
        return Promise.resolve(data);
      } if (/excel|image/gi.test(response.headers['content-type'])) {
        return Promise.resolve(new Blob([data]));
      }

      const message = data.msg || `抱歉，请求出错（${config.url}）`;
      if (config.errType !== 'none') {
        ElMessage({
          message,
          type: 'error',
          duration: 5 * 1000,
        });
      }
      return Promise.reject(data);
    }
    console.log('response', status);
    return Promise.reject(status);
  },
  (error) => {
    const { request, response } = error;
    store.dispatch('app/setLoading', false);
    // console.log('error', error.code, error.message, error.response) // for debug
    let message = '连接服务器超时，请重试!';
    if (request || response) {
      const { status } = response;
      switch (status) {
        case 400: message = '请求错误'; break;
        case 401: message = '未授权，请重新登录'; break;
        case 403: message = '拒绝访问'; break;
        case 404: message = '请求的资源不存在'; break;
        case 408: message = '请求超时'; break;
        case 500: message = '服务器错误'; break;
        case 501: message = '服务未实现'; break;
        case 502: message = '网络错误'; break;
        case 503: message = '服务不可用'; break;
        case 504: message = '网络超时'; break;
        case 505: message = 'HTTP版本不受支持'; break;
        default: message = '服务器连接出错';
      }
      message += ` #${status}`;
      ElMessage({
        message,
        type: 'error',
        duration: 5 * 1000,
      });
    } else {
      // 如cancel等特殊情况走这边
      // console.log('err---> ', error)
      return Promise.reject(error);
    }
    return Promise.reject(message);
  },
);

export default service;
