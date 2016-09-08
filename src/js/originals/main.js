/* @flow */
/* eslint no-use-before-define:0 no-console:0 */
import addEvent from '../utils/addEvent';
import getAjax from '../utils/getAjax';
import postAjax from '../utils/postAjax';
import serialize from '../utils/serialize';
import setHtml from '../utils/setHtml';

function shoutboxError() {
  setHtml(document.querySelector('div#shoutbox'), 'Triggered ajaxError handler on shoutbox');
}

function refreshShoutbox() {
  const shoutbox = document.querySelector('div#shoutbox');

  if (shoutbox) {
    getAjax('/chat_content.html', data => {
      setHtml(shoutbox, data);
    }, shoutboxError);
  }
}

function refreshTimeSb() {
  // Refresh rate in milli seconds
  setTimeout(displayShoutbox, 10 * 1000);
}

function displayShoutbox() {
  refreshShoutbox();
  refreshTimeSb();
}

function postShoutbox() {
  postAjax('/cgi-bin/psowrte.py', serialize(document.querySelector('#sb_form')), () => {
    refreshShoutbox();
  }, shoutboxError);
  const messageInput: Element = document.querySelector('#shoutbox-input .message');
  if (messageInput && messageInput instanceof HTMLInputElement) {
    messageInput.value = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // toggle nav on-click
  addEvent(document.querySelector('#menu-icon'), 'click', () => {
    // $j('#top-nav ul').slideToggle(500);
    console.log('clicked menu icon');
  });

  // get forban
  const forbanLink = document.querySelector('div#forban_link');
  if (forbanLink) {
    getAjax('/forban_link.html', data => {
      setHtml(forbanLink, data);
    });
  }

  // get station counter
  const stationCount = document.querySelector('div#station');
  if (stationCount) {
    getAjax('/station_cnt.txt', data => {
      setHtml(stationCount, data);
    });
  }

  // submits new text to ShoutBox
  addEvent(document.querySelector('#sb_form'), 'submit', event => {
    event.preventDefault();
    postShoutbox();
  });

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
});
