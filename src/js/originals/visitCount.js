/* @flow */
/* eslint no-console:0 */
import getAjax from '../utils/getAjax';
import setHtml from '../utils/setHtml';

type DayType = {
  day: string,
  counter: number
};

const visitCount = document.querySelector('p#visitors-top-statspage');

if (visitCount) {
  getAjax('/vc_display.php?sortBy=day&output_type=json&top_max=10', (data: Array<DayType>) => {
    let tblBody = '<ul class="noDot">';
    data.forEach((item: DayType) => {
      let tblRow = '';
      tblRow += `<span class="sp-visitors-date">${item.day} → </span>`;
      tblRow += `<span class="sp-visitors-count">${item.counter}</span>`;
      tblBody += `<li>${tblRow}</li>`;
    });
    tblBody += '</ul>';
    setHtml(visitCount, tblBody);
  });
}
