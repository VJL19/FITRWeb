const getCurrentDate = () => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const getTime = new Date().toLocaleString().slice(10, 30);
  return `${todayDate} ${getTime}`;
};
export default getCurrentDate;
