import React from "react";
import { Box } from "@mui/material";
import LoadingIndicator from "src/components/LoadingIndicator";
import { useGetAllFulfillTransactionsQuery } from "src/reducers/transaction";
import CheckIcon from "@mui/icons-material/Check";
const TotalFulfilledTransactionPage = () => {
  const {
    data: totalFulfillTransactions,
    isFetching,
    isUninitialized,
  } = useGetAllFulfillTransactionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }

  return (
    <Box
      sx={{
        backgroundColor: "lightgreen",
        width: 300,
        height: "100%",
        textAlign: "center",
        boxShadow: "1px 3px 34px -15px rgba(0,0,0,0.75);",
        position: "relative",
      }}
    >
      <CheckIcon
        style={{
          position: "absolute",
          left: "15%",
          width: "100%",
          height: "100%",
          zIndex: 2,
        }}
        htmlColor="rgba(0,0,0, 0.15)"
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <h2>FULFILLED</h2>
      </div>
      <div>
        <h1 style={{ fontSize: 40 }}>
          {totalFulfillTransactions?.result[0].TotalFulfill} /{" "}
          {totalFulfillTransactions?.result[0].TotalFulfill}
        </h1>
      </div>
    </Box>
  );
};

export default TotalFulfilledTransactionPage;
