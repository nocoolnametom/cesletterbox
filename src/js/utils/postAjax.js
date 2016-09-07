/* @flow */
declare class ActiveXObject{
  open: Function,
  onreadystatechange?: Function,
  setRequestHeader: Function,
  send: Function,
  readyState: number,
  status: number,
  responseText: string,
}

export default function postAjax(
  url: string,
  data: string | {},
  successParam?: Function,
  failureParam?: Function
) {
  const success = typeof successParam === 'function' ? successParam : () => {};
  const failure = typeof failureParam === 'function' ? failureParam : () => {};
  let params: string;
  if (typeof data === 'string') {
    params = data;
  } else {
    params =
      Object.keys(data).map(k => {
        const keyName = k;
        const keyValue = typeof data[k] !== 'undefined' ? data[k] : '';
        return `${encodeURIComponent(keyName)}=${encodeURIComponent(keyValue)}`;
      }).join('&');
  }

  const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('POST', url);
  xhr.onreadystatechange = () => {
    if (xhr.readyState > 3) {
      if (xhr.status === 200) {
        return success(xhr.responseText);
      }
      return failure(xhr.responseText);
    }
    return null;
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);
  return xhr;
}
