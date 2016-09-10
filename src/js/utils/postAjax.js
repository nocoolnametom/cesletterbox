/* @flow */
declare class ActiveXObject{
  open: Function, // eslint-disable-line flowtype/no-weak-types
  onreadystatechange?: Function, // eslint-disable-line flowtype/no-weak-types
  setRequestHeader: Function, // eslint-disable-line flowtype/no-weak-types
  send: Function, // eslint-disable-line flowtype/no-weak-types
  readyState: number,
  status: number,
  responseText: string
}

export default function postAjax(
  url: string,
  data: string | {},
  successParam?: Function, // eslint-disable-line flowtype/no-weak-types
  failureParam?: Function // eslint-disable-line flowtype/no-weak-types
): XMLHttpRequest | ActiveXObject {
  const success = typeof successParam === 'function' ? successParam : () => {};
  const failure = typeof failureParam === 'function' ? failureParam : () => {};
  let params: string;
  if (typeof data === 'string') {
    params = data;
  } else {
    params =
      Object.keys(data).map((k): string => { // eslint-disable-line flowtype/require-parameter-type
        const keyName = k;
        const keyValue = typeof data[k] !== 'undefined' ? data[k] : '';
        return `${encodeURIComponent(keyName)}=${encodeURIComponent(keyValue)}`;
      }).join('&');
  }

  const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

  function handleResponse(): mixed | null {
    if (xhr.readyState > 3) {
      if (xhr.status === 200) {
        return success(xhr.responseText);
      }
      return failure(xhr.responseText);
    }
    return null;
  }

  xhr.open('POST', url);
  xhr.onreadystatechange = handleResponse;
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);
  return xhr;
}
