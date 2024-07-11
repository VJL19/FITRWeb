import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRoute } from "src/reducers/route";
import { AppDispatch } from "src/store/store";

const ReportPage = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoute("Reports"));
  }, []);
  return <div>ReportPage</div>;
};

export default ReportPage;
