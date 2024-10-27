import React, { useState } from "react";
import "src/styles/TopBar.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useGetAccessWebTokenQuery } from "src/reducers/login";
import { replaceCharWithAsterisk } from "src/utils/functions/text_fns";
import DropdownMenu from "./DropdownMenu";
const TopBar = () => {
  const { data } = useGetAccessWebTokenQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [open, setOpen] = useState(false);

  let tempEmail =
    data?.user?.Email !== undefined
      ? replaceCharWithAsterisk(data?.user?.Email)
      : data?.user?.Email;
  return (
    <div
      className="top--bar--container"
      onMouseOver={() => {
        const input = document.querySelector("#rfidInput");
        input?.setAttribute("disabled", "true");
      }}
      onMouseOut={() => {
        const input = document.querySelector("#rfidInput");
        input?.removeAttribute("disabled");
      }}
    >
      <div></div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          color: "white",
        }}
      >
        <div style={{ display: "flex", paddingRight: 75, height: 50 }}>
          <p style={{ paddingRight: 25 }}>{tempEmail}</p>
          <DropdownMenu />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
