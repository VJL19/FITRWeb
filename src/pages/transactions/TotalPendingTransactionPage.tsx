import React from "react";
import { Box } from "@mui/material";
import LoadingIndicator from "src/components/LoadingIndicator";
import { useGetAllPendingTransactionsQuery } from "src/reducers/transaction";
import PendingIcon from "@mui/icons-material/Pending";
const TotalPendingTransactionPage = () => {
  const {
    data: totalPendingTransactions,
    isFetching,
    isUninitialized,
  } = useGetAllPendingTransactionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }

  return (
    <Box
      sx={{
        width: 300,
        height: "100%",
        textAlign: "center",
        boxShadow: "1px 3px 34px -15px rgba(0,0,0,0.75);",
        backgroundColor: "lightyellow",
        position: "relative",
      }}
    >
      <PendingIcon
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
        <h2>PENDING</h2>
      </div>
      <div>
        <h1 style={{ fontSize: 40 }}>
          {totalPendingTransactions?.result[0].TotalPending} /{" "}
          {totalPendingTransactions?.result[0].TotalPending}
        </h1>
      </div>
    </Box>
  );
};

export default TotalPendingTransactionPage;
