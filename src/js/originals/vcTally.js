/* @flow */
/* eslint no-console:0 */
import getAjax from '../utils/getAjax';
import setHtml from '../utils/setHtml';

const unixTimestamp = Math.round(new Date().getTime() / 1000);

const visitCount = document.querySelector('span#vc_count');

if (visitCount) {
  getAjax(`/vc_counter.php?client_date=${unixTimestamp}`, data => {
    console.log(data);
    const vcBody = '';
    setHtml(visitCount, vcBody);
  });
}
