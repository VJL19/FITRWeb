import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRoute } from "src/reducers/route";
import { AppDispatch } from "src/store/store";

const TransactionPage = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoute("Transactions"));
  }, []);
  return <div>TransactionPage</div>;
};

export default TransactionPage;
