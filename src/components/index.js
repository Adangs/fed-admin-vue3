// 自定义全局组件
import XEmpty from './x-empty';
import XPagination from './x-pagination';

const XUI = {
  XEmpty,
  XPagination,
};

export default {
  install: (app) => {
    Object.keys(XUI).forEach((key) => {
      app.component(key, XUI[key]);
    });
  },
};
