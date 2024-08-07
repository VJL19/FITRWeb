import logo from "src/assets/logo_1.png";
import { REPORT_TYPE } from "src/utils/enums/REPORT.ts";
const dynamicHtml = ({
  title,
  totalUsers,
  totalSales,
  averageSales,
  averageSessionSales,
  averageMonthlySales,
  totalSessionSales,
  totalMonthlySales,
  totalSessionUsers,
  totalMonthlyUsers,
  COLUMNS,
  data,
}: {
  title: string;
  COLUMNS: String[];
  data: string[] | undefined;
  totalUsers?: number;
  totalSales?: number;
  averageSales?: number;
  averageSessionSales?: number;
  averageMonthlySales?: number;
  totalSessionSales?: number;
  totalMonthlySales?: number;
  totalSessionUsers?: number;
  totalMonthlyUsers?: number;
}) => {
  return `<html>
  <body>
    <style>
      .my-heading4 {
        background: darkgreen;
        color: white;
      }

      table, th, td {
        border: 1px solid black;
        text-align: center;
      }
      th {
        font-size: 15px;
        text-transform: uppercase;
      }
      td {
        font-size: 12px;
      }
      img {
        height: 130px;
        width: 60%;
        display: block;
        margin: auto;
      }
      h3 {
        text-align: center;
      }
    </style>
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
      <img src="${logo}"/>
      <p>MJESHTER FITNESS GYM CENTER</p>
      <p><a type="_blank" href="https://www.facebook.com/mjeshter.fg">https://www.facebook.com/mjeshter.fg</a></p>
      <h3>${title}</h3>
      ${
        title === REPORT_TYPE.ATTENDANCE
          ? `<div style="display: flex; width: 100%, flex-direction: row">
              <p>Total Session Users - ${totalSessionUsers}</p>
              <p>Total Monthly Users - ${totalMonthlyUsers}</p>
              <p>Total Users - ${totalUsers}</p>
            </div>`
          : `<div style="display: flex; width: 100%, flex-direction: row">
          <p>Total Session Users Sales - ${
            totalSessionSales !== null ? totalSessionSales : 0
          } PHP</p>
          <p>Total Average Session Sales - ${
            averageSessionSales !== null ? averageSessionSales : 0
          } PHP </p>
          <p>Total Monthly Users Sales - ${
            totalMonthlySales !== null ? totalMonthlySales : 0
          } PHP</p>
          <p>Total Average Monthly Sales - ${
            averageMonthlySales !== null ? averageMonthlySales : 0
          } PHP </p>
          <p>Total Sales - ${totalSales !== null ? totalSales : 0} PHP </p>
          <p>Total Average Sales - ${
            averageSales !== null ? averageSales : 0
          } PHP </p>
        </div>`
      }
    </div>
    <hr />
    <table>
      <thead>
        <tr>
          ${COLUMNS.map((column) => `<th><b>${column}</b></th>`).join(" ")}
        </tr>
      </thead>
      <tbody>
        ${data}
         
      </tbody>
    </table>`;
};
export default dynamicHtml;
