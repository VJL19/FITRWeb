import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import {
  getTotalUsersAttendanceByDate,
  getTotalSessionUsersAttendanceByDate,
  getTotalMonthlyUsersAttendanceByDate,
  getAverageMonthlySalesByDate,
  getAverageSalesByDate,
  getAverageSessionSalesByDate,
  getTotalUserMonthlySalesByDate,
  getTotalUserSalesByDate,
  getTotalUserSessionSalesByDate,
} from "./reports";
import { IAttendanceState } from "src/reducers/attendance";
import { ITransactionApiState } from "src/reducers/transaction";

const generateExcelAttendanceReport = ({
  data,
}: {
  data: IAttendanceState | undefined;
}) => {
  const workBook = new Workbook();
  const workSheet = workBook.addWorksheet(
    `MJesther Attendance Report ${new Date().toDateString()}`
  );

  //generate reports - attendance
  const totalUsers = getTotalUsersAttendanceByDate(data);
  const totalSessionUsers = getTotalSessionUsersAttendanceByDate(data);
  const totalMonthlyUsers = getTotalMonthlyUsersAttendanceByDate(data);
  workSheet.columns = [
    { header: "Full Name", key: "FullName", width: 20 },
    { header: "Subscription Type", key: "SubscriptionType", width: 20 },
    { header: "Time In", key: "TimeIn", width: 20 },
    { header: "Time Out", key: "TimeOut", width: 20 },
    { header: "Date Tapped", key: "DateTapped", width: 20 },
  ];

  workSheet.getRow(1).font = {
    size: 16,
    bold: true,
  };

  data?.result?.map((user, index) => {
    workSheet.addRow({
      FullName: `${user.FirstName} ${user.LastName}`,
      SubscriptionType: user.SubscriptionType,
      TimeIn: user.TimeIn,
      TimeOut: user.TimeOut,
      DateTapped: `${new Date(user.DateTapped).toDateString()}, ${new Date(
        user.DateTapped
      ).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}`,
    });
  });
  const lastRowTitle = workSheet.getRow(data?.result?.length! + 2);
  const lastRow = workSheet.getRow(data?.result?.length! + 3);
  const addRow = workSheet.getRow(data?.result?.length! + 4);
  const addRow2 = workSheet.getRow(data?.result?.length! + 5);
  workSheet.getRow(data?.result?.length! + 2).font = {
    size: 16,
    bold: true,
  };
  lastRowTitle.values = ["*Summary Attendance Report*"];
  lastRow.values = [`Total Session - ${totalSessionUsers}`];
  addRow.values = [`Total Monthly - ${totalMonthlyUsers}`];
  addRow2.values = [`Total Users - ${totalUsers}`];
  workBook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "ATTENDANCE_REPORT.xlsx");
  });
};
const generateExcelFinancialReport = ({
  data,
}: {
  data: ITransactionApiState | undefined;
}) => {
  const workBook = new Workbook();
  const workSheet = workBook.addWorksheet(
    `MJesther Attendance Report ${new Date().toDateString()}`
  );

  ///generate reports - financial
  const totalUserSalesByDate = getTotalUserSalesByDate(data).toFixed(2);
  const totalSessionUserSalesByDate =
    getTotalUserSessionSalesByDate(data).toFixed(2);
  const totalMonthlyUserSalesByDate =
    getTotalUserMonthlySalesByDate(data).toFixed(2);

  const averageSalesByDate = getAverageSalesByDate(data).toFixed(2);
  const averageSessionSalesByDate =
    getAverageSessionSalesByDate(data).toFixed(2);
  const averageMonthlySalesByDate =
    getAverageMonthlySalesByDate(data).toFixed(2);

  workSheet.columns = [
    { header: "Full Name", key: "FullName", width: 20 },
    { header: "Subscription Type", key: "SubscriptionType", width: 20 },
    { header: "Amount", key: "amount", width: 20 },
    { header: "Status", key: "status", width: 20 },
    { header: "Entry Date", key: "entryDate", width: 20 },
  ];

  workSheet.getRow(1).font = {
    size: 16,
    bold: true,
  };

  data?.result?.map((user, index) => {
    workSheet.addRow({
      FullName: `${
        user.FirstName === null || user.LastName === undefined
          ? user.SubscriptionBy
          : `${user.FirstName} ${user.LastName}`
      }`,
      SubscriptionType: user.SubscriptionType,
      amount: `${user.SubscriptionAmount} PHP`,
      status: user.SubscriptionStatus,
      entryDate: `${new Date(
        user.SubscriptionEntryDate
      ).toDateString()}, ${new Date(
        user.SubscriptionEntryDate
      ).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}`,
    });
  });
  const lastRowTitle = workSheet.getRow(data?.result?.length! + 2);
  const lastRow = workSheet.getRow(data?.result?.length! + 3);
  const addRow = workSheet.getRow(data?.result?.length! + 4);
  const addRow2 = workSheet.getRow(data?.result?.length! + 5);
  const addRow3 = workSheet.getRow(data?.result?.length! + 6);
  const addRow4 = workSheet.getRow(data?.result?.length! + 7);
  const addRow5 = workSheet.getRow(data?.result?.length! + 8);
  workSheet.getRow(data?.result?.length! + 2).font = {
    size: 16,
    bold: true,
  };
  lastRowTitle.values = ["*Summary Financial Report*"];
  lastRow.values = [
    `Total Session Users Sales - ${
      totalSessionUserSalesByDate !== null ? totalSessionUserSalesByDate : 0
    } PHP`,
  ];
  addRow.values = [
    `Average Session Sales - ${
      averageSessionSalesByDate !== null ? averageSessionSalesByDate : 0
    } PHP`,
  ];
  addRow2.values = [
    `Total Monthly Users Sales - ${
      totalMonthlyUserSalesByDate !== null ? totalMonthlyUserSalesByDate : 0
    } PHP`,
  ];
  addRow3.values = [
    `Average Monthly Sales - ${
      averageMonthlySalesByDate !== null ? averageMonthlySalesByDate : 0
    } PHP`,
  ];
  addRow4.values = [
    `Total Sales - ${
      totalUserSalesByDate !== null ? totalUserSalesByDate : 0
    } PHP`,
  ];
  addRow5.values = [
    `Average Sales For this Day - ${
      averageSalesByDate !== null ? averageSalesByDate : 0
    } PHP`,
  ];
  workBook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "FINANCIAL_REPORT.xlsx");
  });
};

export { generateExcelAttendanceReport, generateExcelFinancialReport };
