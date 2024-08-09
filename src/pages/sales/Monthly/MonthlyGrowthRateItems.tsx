import React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { Box } from "@mui/material";

const MonthlyGrowthRateItems = ({
  Months,
  GrowthRate,
}: {
  Months: string;
  GrowthRate: number;
}) => {
  return (
    <React.Fragment key={Months}>
      <Box component="div" sx={{ display: "flex", gap: 2.5 }}>
        <Box
          sx={{
            marginTop: 2.5,
            width: "100%",
            height: "100%",
            textAlign: "center",
            boxShadow: "1px 3px 34px -15px rgba(0,0,0,0.75);",
            backgroundColor: GrowthRate <= 0 ? "lightpink" : "lightgreen",
            position: "relative",
          }}
        >
          {GrowthRate <= 0 ? (
            <TrendingDownIcon
              style={{
                position: "absolute",
                left: "15%",
                width: "100%",
                height: "100%",
                zIndex: 2,
              }}
              htmlColor="rgba(0,0,0, 0.15)"
            />
          ) : (
            <TrendingUpIcon
              style={{
                position: "absolute",
                left: "15%",
                width: "100%",
                height: "100%",
                zIndex: 2,
              }}
              htmlColor="rgba(0,0,0, 0.15)"
            />
          )}

          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              height: 100,
            }}
          >
            <h1>{Months}</h1>
            <h2>{GrowthRate} %</h2>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default MonthlyGrowthRateItems;
