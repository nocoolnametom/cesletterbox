/* @flow */
export default function removeEvent(
  el: Element,
  type: string,
  handler: Function // eslint-disable-line flowtype/no-weak-types
) {
  if (el) {
    if (el.detachEvent) {
      el.detachEvent(`on${type}`, handler);
    } else {
      el.removeEventListener(type, handler);
    }
  }
}
