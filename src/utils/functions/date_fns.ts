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
export const formatTime = (time: Date) => {
  return time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export function formatDate(date) {
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  date = yyyy + "-" + mm + "-" + dd;
  return date;
}

export default getCurrentDate;
