/* @flow */
/* eslint no-console:0 */
import getAjax from '../utils/getAjax';
import setHtml from '../utils/setHtml';
/*
example of vc_counter

["7ae63834b24b31fa72b24e324330464281433324","2016-09-09"]

*/

const unixTimestamp = Math.round(new Date().getTime() / 1000);

const visitCount = document.querySelector('span#vc_count');

if (visitCount) {
  getAjax(`/vc_counter.php?client_date=${unixTimestamp}`, data => {
    console.log(data);
    const vcBody = '';
    setHtml(visitCount, vcBody);
  });
}
