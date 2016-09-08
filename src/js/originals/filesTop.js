/* @flow */
import getAjax from '../utils/getAjax';
import setHtml from '../utils/setHtml';

const filesTop = document.querySelector('p#files-top-statspage');

if (filesTop) {
  getAjax(
    '/dl_statistics_display.php?'
      + 'sortBy=counter&sortOrder=DESC&list_type=top&top-max=10&output_type=json',
    json => {
      const data = JSON.parse(json);
      let tblBody = '<ul style="list-style: none; -webkit-padding-start:0px;">';
      data.forEach(item => {
        let tblRow = '<span class="sp-tops-title">';
        tblRow += `<a href="/dl_statistics_counter.php?DL_URL=${item.url_encoded}">`;
        tblRow += decodeURIComponent(item.filename_encoded);
        tblRow += '</a>';
        tblRow += '</span>';
        tblRow += '<br />';
        tblRow += `<span class="sp-tops-count">&nbsp;&nbsp;${item.counter} download(s)</span>`;
        tblBody += `<li>${tblRow}</li>`;
      });
      tblBody += '</ul>';
      setHtml(filesTop, tblBody);
    }
  );
}
