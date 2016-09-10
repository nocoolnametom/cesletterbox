/* @flow */

export default function addEvent(
  el: Element,
  type: string,
  handler: Function // eslint-disable-line flowtype/no-weak-types
) {
  if (el) {
    if (el.attachEvent) {
      el.attachEvent(`on${type}`, handler);
    } else {
      el.addEventListener(type, handler);
    }
  }
}
