/* @flow */
/* eslint no-console:0 */
import getAjax from '../utils/getAjax';
import setHtml from '../utils/setHtml';

const unixTimestamp = Math.round(new Date().getTime() / 1000);

getAjax(`/vc_counter.php?client_date=${unixTimestamp}`, data => {
  console.log(data);
  const visitCount = document.querySelector('span#vc_count');
  const vcBody = '';
  setHtml(visitCount, vcBody);
});
