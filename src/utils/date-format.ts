export const makeDateFormat = (date: number) => {
  const timeFormat = new Date(date * 1000);
  const displayDate = `${timeFormat.getDate()}.${
    timeFormat.getMonth() + 1
  }.${timeFormat.getFullYear()}`;
  return displayDate;
};
