const newDate = function (fullDate, count) {
  let startDate = new Date(new Date(fullDate) - count * 24 * 60 * 60 * 1000);
  const date = startDate.getUTCDate();
  const month = startDate.getUTCMonth() + 1;
  const year = startDate.getUTCFullYear();
  return `${year}-${month}-${date}`;
};

export default newDate;
