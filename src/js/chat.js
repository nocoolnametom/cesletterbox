/* @flow */
import './utils/liveReload';
import './originals/vcTally.js';
import initializeShoutbox from './shoutbox/initializeShoutbox';

document.addEventListener('DOMContentLoaded', () => {
  // initialize shoutbox
  initializeShoutbox();
});
