/* @flow */
import addEvent from '../utils/addEvent';
import getAjax from '../utils/getAjax';
import postShoutbox from './postShoutbox';
import displayShoutbox from './displayShoutbox';

/*
example of config.json:


{ "librarybox" : { "module" : {
   "upload" : { "status" : false , "file" : "modules/upload.html"  }
,  "shoutbox" : { "status" : true , "file" : "modules/chat.html" }
 }  } }

*/

export default function initializeShoutbox() {
  addEvent(document.querySelector('#sb_form'), 'submit', (event: Event) => {
    event.preventDefault();
    const nInput = document.querySelector('#nicknameInput');
    const mInput = document.querySelector('#messageInput');
    const nickname = nInput.value || '';
    const message = mInput.value || '';
    if (nickname && message) {
      postShoutbox();
    }
  });

  const shoutbox = document.querySelector('div#shoutbox');

  if (shoutbox) {
    getAjax('/config.json', (json: string) => {
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
