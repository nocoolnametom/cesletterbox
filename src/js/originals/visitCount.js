/* @flow */
/* eslint no-console:0 */
import getAjax from '../utils/getAjax';
import setHtml from '../utils/setHtml';

const visitCount = document.querySelector('p#visitors-top-statspage');

if (visitCount) {
  getAjax('/vc_display.php?sortBy=day&output_type=json&top_max=10', data => {
    let tblBody = '<ul style="list-style: none; -webkit-padding-start:0px;">';
    data.forEach(item => {
      let tblRow = '';
      tblRow += `<span class="sp-visitors-date">${item.day} → </span>`;
      tblRow += `<span class="sp-visitors-count">${item.counter}</span>`;
      tblBody += `<li>${tblRow}</li>`;
    });
    tblBody += '</ul>';
    setHtml(visitCount, tblBody);
  });
}
