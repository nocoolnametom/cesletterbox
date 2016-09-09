/* @flow */
import getAjax from '../utils/getAjax';
import setHtml from '../utils/setHtml';

document.addEventListener('DOMContentLoaded', () => {
  // get forban
  const forbanLink = document.querySelector('div#forban_link');
  if (forbanLink) {
    getAjax('/forban_link.html', data => {
      setHtml(forbanLink, data);
    });
  }

  // get station counter
  const stationCount = document.querySelector('div#station');
  if (stationCount) {
    getAjax('/station_cnt.txt', data => {
      setHtml(stationCount, data);
    });
  }
});


