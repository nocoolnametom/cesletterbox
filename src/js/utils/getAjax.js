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

export default function getAjax(
  url: string,
  successParam?: Function,
  failureParam?: Function
) {
  const success = typeof successParam === 'function' ? successParam : () => {};
  const failure = typeof failureParam === 'function' ? failureParam : () => {};
  const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('GET', url);
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
  xhr.send();
  return xhr;
}
