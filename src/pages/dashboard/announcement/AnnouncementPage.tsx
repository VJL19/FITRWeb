import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRoute } from "src/reducers/route";
import { AppDispatch } from "store/store";
const AnnouncementPage = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setRoute("Announcements"));
  }, []);

  return <div>AnnouncementPage</div>;
};

export default AnnouncementPage;
