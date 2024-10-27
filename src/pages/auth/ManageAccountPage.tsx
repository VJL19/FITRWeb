import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetAccessWebTokenQuery } from "src/reducers/login";
import { setRoute } from "src/reducers/route";
import { AppDispatch } from "src/store/store";
import SendIcon from "@mui/icons-material/Send";
import { Avatar, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { replaceCharWithAsterisk } from "src/utils/functions/text_fns";
import {
  setAdminAccountData,
  setAdminOTPToken,
  useSendEmailChangeAccountMutation,
} from "src/reducers/users";
import LoadingIndicator from "src/components/LoadingIndicator";
const ManageAccountPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();
  const [
    sendOTPEmail,
    { data: emailCode, status: emailStat, isLoading, error: emailErr },
  ] = useSendEmailChangeAccountMutation();

  const { data } = useGetAccessWebTokenQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    dispatch(setRoute("My_Account"));
    dispatch(
      setAdminAccountData({
        LastName: data?.user?.LastName!,
        FirstName: data?.user?.FirstName!,
        UserID: data?.user?.UserID!,
        Username: data?.user?.Username!,
        Email: data?.user?.Email!,
        ContactNumber: data?.user?.ContactNumber!,
        MiddleName: "",
        Birthday: "",
        Age: "",
        Address: "",
        Height: "",
        Weight: "",
        Password: "",
        ConfirmPassword: "",
        SubscriptionType: "",
        Gender: "",
      })
    );
  }, []);

  useEffect(() => {
    if (emailStat === "fulfilled") {
      dispatch(setAdminOTPToken(emailCode?.code));

      navigate("/dashboard/manage_account/confirmation_email", {
        replace: true,
      });
    }
  }, [emailStat]);

  const handleClick = () => {
    sendOTPEmail({ Email: data?.user?.Email! });
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }
  return (
    <div>
      <Container maxWidth="md">
        <h1>MY ACCOUNT PAGE</h1>
        <Avatar src={data?.user?.ProfilePic} sx={{ height: 130, width: 130 }} />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h3>LastName:</h3>
            <p>{replaceCharWithAsterisk(data?.user?.LastName!)}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h3>FirstName:</h3>
            <p>{replaceCharWithAsterisk(data?.user?.FirstName!)}</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h3>Username:</h3>
            <p>{replaceCharWithAsterisk(data?.user?.Username!)}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h3>Email:</h3>
            <p>{replaceCharWithAsterisk(data?.user?.Email!)}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h3>Contact Number:</h3>
            <p>{replaceCharWithAsterisk(data?.user?.ContactNumber!)}</p>
          </div>
        </div>
        <Button
          endIcon={<SendIcon fontSize="medium" htmlColor={"#f5f5f5"} />}
          variant="contained"
          color="primary"
          size="large"
          style={{ width: "100%" }}
          onClick={handleClick}
        >
          CHANGE ACCOUNT
        </Button>
      </Container>
    </div>
  );
};

export default ManageAccountPage;
