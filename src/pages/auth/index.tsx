import * as React from "react";
import {
  AuthPage as MUIAuthPage,
  AuthProps,
  Box,
  Typography,
} from "@pankod/refine-mui";
import SailingIcon from "@mui/icons-material/Sailing";

const authWrapperProps = {
  style: {
    background:
      "radial-gradient(50% 50% at 50% 50%,rgba(255, 255, 255, 0) 0%,rgba(0, 0, 0, 0.5) 100%),url('images/login-bg.jpg')",
    backgroundSize: "cover",
  },
};

const renderAuthContent = (content: React.ReactNode) => {
  return (
    <div
      style={{
        margin: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexdirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SailingIcon sx={{ height: "100%" }} />{" "}
        <Typography align="center" fontSize={38} fontWeight={600}>
          Ladoga Rent
        </Typography>
      </Box>
      {content}
    </div>
  );
};

export const AuthPage: React.FC<AuthProps> = ({ type, formProps }) => {
  return (
    <MUIAuthPage
      type={type}
      wrapperProps={authWrapperProps}
      renderContent={renderAuthContent}
      formProps={formProps}
    />
  );
};
