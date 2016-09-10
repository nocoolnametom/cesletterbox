/* @flow */
import postAjax from '../utils/postAjax';
import serialize from '../utils/serialize';
import refreshShoutbox from './refreshShoutbox';
import shoutboxError from './shoutboxError';

/* POST
sends
{
  color: "def",
  name: "Anonymous",
  data: "Message Text",
}

returns

<html><body>ok</body></html>
*/

export default function postShoutbox() {
  postAjax(
    '/cgi-bin/psowrte.py',
    serialize(document.querySelector('#sb_form')),
    refreshShoutbox,
    shoutboxError
  );
  const messageInput: Element = document.querySelector('#shoutbox-input .messageInput');
  if (messageInput && messageInput instanceof HTMLInputElement) {
    messageInput.value = '';
  }
}
