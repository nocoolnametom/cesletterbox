/* @flow */
import displayShoutbox from './displayShoutbox';

export default function refreshTimeSb() {
  // Refresh rate in milli seconds
  setTimeout(displayShoutbox, 10 * 1000);
}
