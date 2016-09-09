/* @flow */
import getAjax from '../utils/getAjax';
import setHtml from '../utils/setHtml';
import shoutboxError from './shoutboxError';

/*
example of chat_content.html

<html>
  <head>
    <meta http-equiv='cache-control' content='no-cache'>
    <meta name='GENERATOR' content='PyShoutOut'>
    <title>Shout-Out Data</title>
  <body>
    <div class='message'>
      <date>00:06:09</date>
      <name>Name Three:</name>
      <data class='def'>Another one.</data>
    </div>
      <div class='message'>
      <date>00:05:58</date>
      <name>Anonymous:</name>
      <data class='def'>This is a second message!</data>
    </div>
      <div class='message'>
      <date>00:00:00</date>
      <name>LibraryBox:</name>
      <data class='def'>Chat and share files anonymously!</data>
    </div>
  </body>
</html>

*/

export default function refreshShoutbox() {
  const shoutbox = document.querySelector('div#shoutbox');

  if (shoutbox) {
    getAjax('/chat_content.html', data => {
      setHtml(shoutbox, data);
    }, shoutboxError);
  }
}
