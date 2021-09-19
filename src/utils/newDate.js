const newDate = function (fullDate, count) {
  let startDate = new Date(new Date(fullDate) - count * 24 * 60 * 60 * 1000);
  const date = startDate.getDate();
  const month = startDate.getMonth() + 1;
  const year = startDate.getFullYear();
  return `${year}-${month}-${date}`;
};

export default newDate;
