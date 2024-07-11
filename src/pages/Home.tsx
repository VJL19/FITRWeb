import React, { useEffect } from "react";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { setRoute } from "../reducers/route";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoute("Home"));
  }, []);

  return <div style={{ backgroundColor: "bisque", height: "150vh" }}>Home</div>;
};

export default Home;
