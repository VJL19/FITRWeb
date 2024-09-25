import React from "react";

const RFIDRemover = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{ height: 500 }}
      onMouseOver={() => {
        const input = document.querySelector("#rfidInput");
        input?.setAttribute("disabled", "true");
      }}
      onMouseOut={() => {
        const input = document.querySelector("#rfidInput");
        input?.removeAttribute("disabled");
      }}
    >
      {children}
    </div>
  );
};

export default RFIDRemover;
