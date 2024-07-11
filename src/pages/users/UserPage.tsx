import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRoute } from "src/reducers/route";
import { AppDispatch } from "src/store/store";

const UserPage = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoute("Users"));
  }, []);
  return <div>UserPage</div>;
};

export default UserPage;
