export function formatDate (input, b = 'yyyy-MM-dd hh:mm:ss') {
  if (!input) return '-';
  const date = new Date(Number(input) || (input.indexOf('T') !== -1 ? input : input.replace(/-/gi, '/')));
  const c = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  if (/(y+)/.test(b)) {
    b = b.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  Object.keys(c).forEach((key) => {
    if (new RegExp(`(${key})`).test(b)) {
      b = b.replace(RegExp.$1, RegExp.$1.length === 1 ? c[key] : (`00${c[key]}`).substr((`${c[key]}`).length));
    }
  });
  return b;
}

export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
