/* @flow */
/* eslint no-param-reassign:0 */
export default function setHtml(el: Element, contents: string) {
  if (el && typeof el.innerHTML !== 'undefined') {
    el.innerHTML = contents;
  }
}
