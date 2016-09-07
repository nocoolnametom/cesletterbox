/* @flow */
export default function addEvent(el: Element, type: string, handler: Function) {
  if (el) {
    if (el.attachEvent) {
      el.attachEvent(`on${type}`, handler);
    } else {
      el.addEventListener(type, handler);
    }
  }
}
