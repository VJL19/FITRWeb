const getCurrentDate = () => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const getTime = new Date().toLocaleString().slice(10, 30);
  return `${todayDate} ${getTime}`;
};

const dateFormattingOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "2-digit",
};

export function renderDate(checkTimeAndDate: any) {
  if (!checkTimeAndDate) {
    return "";
  }
  return new Date(checkTimeAndDate).toLocaleDateString(
    "en-US",
    dateFormattingOptions
  );
}
export default getCurrentDate;
