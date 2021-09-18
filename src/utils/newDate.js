const newDate = function (date, count) {
  let startDate = new Date(new Date(date) - count * 24 * 60 * 60 * 1000)
    .toLocaleDateString()
    .split("/");
  startDate.unshift(startDate.pop());
  startDate = startDate.join("-");
  return startDate;
};

export default newDate;
