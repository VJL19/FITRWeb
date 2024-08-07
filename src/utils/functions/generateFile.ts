import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import {
  getTotalUsersAttendanceByDate,
  getTotalSessionUsersAttendanceByDate,
  getTotalMonthlyUsersAttendanceByDate,
} from "./reports";
import { IAttendanceState } from "src/reducers/attendance";

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
  data?.result?.map((user, index) => {
    workSheet.addRow({
      FullName: `${user.FirstName} ${user.LastName}`,
      SubscriptionType: user.SubscriptionType,
      TimeIn: user.TimeIn,
      TimeOut: user.TimeOut,
      DateTapped: user.DateTapped,
    });
  });
  const lastRow = workSheet.getRow(data?.result?.length! + 1);

  lastRow.values = [
    `*Summary* Total Session - ${totalSessionUsers} Total Monthly - ${totalMonthlyUsers} Total Users - ${totalUsers}`,
  ];

  workBook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "ATTENDANCE_REPORT.xlsx");
  });
};

export { generateExcelAttendanceReport };
