import logo from "src/assets/logo_1.png";
const dynamicHtml = ({
  title,
  COLUMNS,
  data,
}: {
  title: string;
  COLUMNS: String[];
  data: string[] | undefined;
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
