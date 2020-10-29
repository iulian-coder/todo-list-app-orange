export default function formatDate(date) {
  let date_format = new Date(date);
  let date_month = date_format.getMonth() + 1;
  return (
    "Date " +
    date_format.getDate() +
    "/" +
    date_month +
    "/" +
    date_format.getFullYear() +
    " Time " +
    date_format.getHours() +
    ":" +
    date_format.getMinutes()
  );
}

export function timeRemainingBetweenTwoDates(date) {
  let today = new Date();
  let expiry = new Date(date);
  let oneDay = 1000 * 60 * 60 * 24;
  let differenceInTime = expiry.getTime() - today.getTime();
  let differncesInDays = differenceInTime / oneDay;
  return Math.round(differncesInDays);
}
