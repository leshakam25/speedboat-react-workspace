import React from "react";
import { Box, Avatar, Typography } from "@pankod/refine-mui";

type IsActiveProps = {
  text: string;
  icon?: React.ReactNode;
  value?: boolean;
};

export const IsActive: React.FC<IsActiveProps> = ({ text, icon, value }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        minWidth: "240px",
        borderRadius: "8px",
        color: "white",
        padding: "10px 12px",
        backgroundColor: "primary.main",
        maxHeight: "100px",
      }}
    >
      <Avatar
        sx={{
          bgcolor: "transparent",
          color: "white",
        }}
      >
        {icon}
      </Avatar>
      <Box>
        <Typography variant="body1" fontWeight={700}>
          {text}
        </Typography>
        <Typography>{value && value ? "Активна" : "Не активна"}</Typography>
      </Box>
      {/* <Avatar
        sx={{
          bgcolor: "transparent",
          color: "white",
        }}
      >
        {icon}
      </Avatar>
      <Box>
        <Typography variant="body1" fontWeight={700}>
          {status == true ? "Активна" : "Не активна"}
        </Typography>
      </Box> */}
    </Box>
  );
};
