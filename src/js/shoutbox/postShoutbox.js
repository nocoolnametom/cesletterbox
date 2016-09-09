/* @flow */
import postAjax from '../utils/postAjax';
import serialize from '../utils/serialize';
import refreshShoutbox from './refreshShoutbox';
import shoutboxError from './shoutboxError';

export default function postShoutbox() {
  postAjax('/cgi-bin/psowrte.py', serialize(document.querySelector('#sb_form')), () => {
    refreshShoutbox();
  }, shoutboxError);
  const messageInput: Element = document.querySelector('#shoutbox-input .message');
  if (messageInput && messageInput instanceof HTMLInputElement) {
    messageInput.value = '';
  }
}
