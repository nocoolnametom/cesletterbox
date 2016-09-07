/* @flow */
export default function parseDate(dateParam: string) {
  const date = new Date();
  const parts = String(dateParam).split(/[- :]/);

  date.setFullYear(parseInt(parts[0], 10));
  date.setMonth(parseInt(parts[1], 10) - 1);
  date.setDate(parseInt(parts[2], 10));
  date.setHours(parseInt(parts[3], 10));
  date.setMinutes(parseInt(parts[4], 10));
  date.setSeconds(parseInt(parts[5], 10));
  date.setMilliseconds(0);

  return date;
}
