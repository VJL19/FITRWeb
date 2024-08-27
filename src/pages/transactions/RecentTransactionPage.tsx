import React from "react";
import { useGetAllUserRecentTransactionsQuery } from "src/reducers/transaction";
import { Box, Button, Container } from "@mui/material";
import LoadingIndicator from "src/components/LoadingIndicator";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
const RecentTransactionPage = () => {
  const {
    data: recentTransactions,
    isFetching,
    isUninitialized,
  } = useGetAllUserRecentTransactionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard/transactions");
    window.scrollTo(0, 0);
  };
  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }
  return (
    <Box
      sx={{
        width: 500,
        height: 450,
        maxHeight: 450,
        overflowY: "scroll",
        textAlign: "center",
        boxShadow: "1px 3px 34px -15px rgba(0,0,0,0.75);",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <h2>Recent Transactions</h2>
        <div>
          <Button
            variant="contained"
            size="large"
            color="warning"
            onClick={handleClick}
            endIcon={<ArrowForwardIcon htmlColor="#f5f5f5" fontSize="large" />}
          >
            SEE ALL
          </Button>
        </div>
      </div>
      {recentTransactions?.result?.map((recentUser) => (
        <React.Fragment key={recentUser.SubscriptionID}>
          <Container
            sx={{
              borderBottomWidth: 3,
              borderBottomColor: "gray",
              display: "flex",
              alignItems: "center",
              justfiyContent: "center",
              gap: 3,
            }}
          >
            <h5>{recentUser.SubscriptionBy}</h5>

            <h4>{recentUser.SubscriptionAmount} PHP</h4>
            <h4>{recentUser.SubscriptionStatus}</h4>
            <p>{new Date(recentUser.SubscriptionEntryDate).toLocaleString()}</p>
          </Container>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default RecentTransactionPage;
