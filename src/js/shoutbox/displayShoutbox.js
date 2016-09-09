/* @flow */
import refreshShoutbox from './refreshShoutbox';
import refreshTimeSb from './refreshTimeSb';

export default function displayShoutbox() {
  refreshShoutbox();
  refreshTimeSb();
}
