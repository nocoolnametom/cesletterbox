/* @flow */
import addEvent from '../utils/addEvent';
import getAjax from '../utils/getAjax';
import postShoutbox from './postShoutbox';
import displayShoutbox from './displayShoutbox';

export default function initializeShoutbox() {
  addEvent(document.querySelector('#sb_form'), 'submit', event => {
    event.preventDefault();
    postShoutbox();
  });

  const shoutbox = document.querySelector('div#shoutbox');

  if (shoutbox) {
    getAjax('/config.json', json => {
      let data;
      try {
        data = JSON.parse(json);
      } catch (e) {
        data = {};
      }
      const showbox = data.librarybox.module.shoutbox.status;

      if (showbox) {
        displayShoutbox();
      } else {
        const chatcontainer = document.getElementById('chatcontainer');
        if (chatcontainer) {
          chatcontainer.style.display = 'none';
        }
      }
    });
  }
}
