export default function formatDate(date: Date) {
  const formattedDay = (`0${date.getDate()}`).slice(-2);
  const formattedMonth = (`0${date.getMonth() + 1}`).slice(-2);
  const formattedYear = date.getFullYear();

  return `${formattedYear}-${formattedMonth}-${formattedDay}`;
}
