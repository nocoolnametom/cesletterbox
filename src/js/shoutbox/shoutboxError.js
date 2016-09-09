/* @flow */
import setHtml from '../utils/setHtml';

export default function shoutboxError() {
  setHtml(document.querySelector('div#shoutbox'), 'Triggered ajaxError handler on shoutbox');
}
