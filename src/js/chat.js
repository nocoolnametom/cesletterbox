/* @flow */
import './utils/liveReload';
import initializeShoutbox from './shoutbox/initializeShoutbox';

document.addEventListener('DOMContentLoaded', () => {
  // initialize shoutbox
  initializeShoutbox();
});
