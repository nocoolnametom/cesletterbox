/* @flow */
export default function removeEvent(el: Element, type: string, handler: Function) {
  if (el) {
    if (el.detachEvent) {
      el.detachEvent(`on${type}`, handler);
    } else {
      el.removeEventListener(type, handler);
    }
  }
}
