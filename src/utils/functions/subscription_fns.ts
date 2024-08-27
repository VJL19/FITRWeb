export const advanceMonthlyEnd = () => {
  let date = new Date();
  date.setMonth(date.getMonth() + 1);
  const todayDate = date.toISOString().slice(0, 10);
  const getTime = new Date().toLocaleString().slice(10, 30);
  return `${todayDate} ${getTime}`;
};
