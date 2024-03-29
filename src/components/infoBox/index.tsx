import React from "react";
import { Box, Avatar, Typography } from "@pankod/refine-mui";

type CourierInfoBoxProps = {
  text: string;
  icon?: React.ReactNode;
  value?: string;
};

export const InfoBox: React.FC<CourierInfoBoxProps> = ({
  text,
  icon,
  value,
}) => {
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
        // my: 1,
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
        <Typography>{value}</Typography>
      </Box>
    </Box>
  );
};
