/* @flow */
export default function serialize(form: Element) {
  let field;
  let formLength;
  const output = [];

  if (typeof form === 'object' && form.nodeName === 'FORM') {
    const len = form.elements.length;
    for (let i = 0; i < len; i++) {
      field = form.elements[i];
      if (
        field.name
        && !field.disabled
        && field.type !== 'file'
        && field.type !== 'reset'
        && field.type !== 'submit'
        && field.type !== 'button'
      ) {
        if (field.type === 'select-multiple') {
          formLength = form.elements[i].options.length;
          for (let j = 0; j < formLength; j++) {
            if (field.options[j].selected) {
              output[output.length] =
                `${encodeURIComponent(field.name)}=${encodeURIComponent(field.options[j].value)}`;
            }
          }
        } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
          output[output.length] =
            `${encodeURIComponent(field.name)}=${encodeURIComponent(field.value)}`;
        }
      }
    }
  }
  return output.join('&').replace(/%20/g, '+');
}
