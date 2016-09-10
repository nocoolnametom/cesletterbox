/* @flow */
import getAjax from '../utils/getAjax';
import setHtml from '../utils/setHtml';

/* example of dl_statistics_display

[]
*/

type StatsType = {
  url_encoded: string,
  filename_encoded: string,
  counter: number
};

const filesTop = document.querySelector('p#files-top-statspage');

if (filesTop) {
  getAjax(
    '/dl_statistics_display.php?'
      + 'sortBy=counter&sortOrder=DESC&list_type=top&top-max=10&output_type=json',
    (json: string) => {
      const data = JSON.parse(json);
      let tblBody = '<ul class="noDot">';
      data.forEach((item: StatsType) => {
        let tblRow = '<span class="sp-tops-title">';
        tblRow += `<a href="/dl_statistics_counter.php?DL_URL=${item.url_encoded}">`;
        tblRow += decodeURIComponent(item.filename_encoded);
        tblRow += '</a>';
        tblRow += '</span>';
        tblRow += '<br>';
        tblRow += `<span class="sp-tops-count">&nbsp;&nbsp;${item.counter} `;
        tblRow += `download${parseInt(item.counter, 10) === 1 ? '' : 's'}</span>`;
        tblBody += `<li>${tblRow}</li>`;
      });
      tblBody += '</ul>';
      setHtml(filesTop, tblBody);
    }
  );
}
