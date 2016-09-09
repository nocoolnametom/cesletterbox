/* @flow */
import getAjax from '../utils/getAjax';
import setHtml from '../utils/setHtml';
import shoutboxError from './shoutboxError';

export default function refreshShoutbox() {
  const shoutbox = document.querySelector('div#shoutbox');

  if (shoutbox) {
    getAjax('/chat_content.html', data => {
      setHtml(shoutbox, data);
    }, shoutboxError);
  }
}
