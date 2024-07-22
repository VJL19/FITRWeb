import React from "react";
import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer";
import logo from "src/assets/logo_1.png";
import Html from "react-pdf-html";
import dynamicHtml from "./htmlPdf/htmlPage";
import ISubscriptions from "src/utils/types/subscription.types";

const FinancialReportPdfFile = ({
  data,
}: {
  data: ISubscriptions[] | undefined;
}) => {
  const COLUMNS = ["Full Name", "Type", "Amount", "Status", "Entry Date"];
  const html = dynamicHtml({
    title: `MJESHTER FINANCIAL REPORT`,
    COLUMNS: COLUMNS,
    data: data
      ?.map(
        (user: ISubscriptions) => `
  <tr>
    <td colspan="2">${user.FirstName} ${user.LastName}</td>
    <td colspan="2">${user.SubscriptionType}</td>
    <td colspan="2">${user.SubscriptionAmount} PHP</td>
    <td colspan="2">${user.SubscriptionStatus}</td>
    <td colspan="2">${new Date(
      user.SubscriptionEntryDate
    ).toDateString()}, ${new Date(
          user.SubscriptionEntryDate
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

export default FinancialReportPdfFile;
