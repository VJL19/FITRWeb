import React from "react";
import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer";
import logo from "src/assets/logo_1.png";
import Html from "react-pdf-html";
import IAttendance from "src/utils/types/attendance.types";
import dynamicHtml from "./htmlPdf/htmlPage";
import { REPORT_TYPE } from "src/utils/enums/REPORT.ts";

const AttendanceReportPdfFile = ({
  data,
  totalUsers,
  totalSessionUsers,
  totalMonthlyUsers,
}: {
  data: IAttendance[] | undefined;
  totalUsers: number | undefined;
  totalSessionUsers: number | undefined;
  totalMonthlyUsers: number | undefined;
}) => {
  const COLUMNS = ["Full Name", "Type", "Time In", "Time Out", "Date Tapped"];
  const html = dynamicHtml({
    title: REPORT_TYPE.ATTENDANCE,
    totalUsers: totalUsers,
    totalSessionUsers: totalSessionUsers,
    totalMonthlyUsers: totalMonthlyUsers,
    COLUMNS: COLUMNS,
    data: data
      ?.map(
        (user: IAttendance) => `
  <tr>
    <td colspan="2">${user.FirstName} ${user.LastName}</td>
    <td colspan="2">${user.SubscriptionType}</td>
    <td colspan="2">${user.TimeIn}</td>
    <td colspan="2">${user.TimeOut}</td>
    <td colspan="2">${new Date(user.DateTapped).toDateString()}, ${new Date(
          user.DateTapped
        ).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}</td>
  </tr>
`
      )
      .join(" "),
  });

  return (
    <Document>
      <Page size="A4" wrap>
        <Html>{html}</Html>
      </Page>
    </Document>
  );
};

export default AttendanceReportPdfFile;
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  page: {},
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});
